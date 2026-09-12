import os
os.environ['TF_USE_LEGACY_KERAS'] = '1'

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
import logging
import boto3
import json
from fastapi import Response
import base64
from dotenv import load_dotenv

# Load environment variables from .env file if it exists
load_dotenv()

logging.basicConfig(level=logging.INFO)

app = FastAPI()

# Enable CORS (important for Amplify frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------- GLOBALS --------
model = None

# -------- AWS CLIENTS --------
bedrock = boto3.client(
    service_name="bedrock-runtime",
    region_name=os.getenv("AWS_DEFAULT_REGION", "ap-south-1"),
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")
)

polly = boto3.client(
    service_name="polly",
    region_name=os.getenv("AWS_DEFAULT_REGION", "ap-south-1"),
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")
)

# Directory resolution for model assets
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
class_names_path = os.path.join(BASE_DIR, "class_names.npy")
model_path = os.path.join(BASE_DIR, "isl_modelv3.h5")

# Alphabet labels (A-z) and Numerical (0-9)
labels = np.load(class_names_path, allow_pickle=True).tolist()

class PredictionInput(BaseModel):
    data: list

class TextInput(BaseModel):
    text: str

class SpeechInput(BaseModel):
    text: str

class STTInput(BaseModel):
    audio_data: str  # base64 encoded audio
    target_lang: str = "hi"

# -------- STARTUP --------

@app.on_event("startup")
def load_model():
    global model, labels

    logging.info(f"Loading ML model from {model_path}...")
    model = tf.keras.models.load_model(model_path)

    logging.info(f"Loading class names from {class_names_path}...")
    labels = np.load(class_names_path, allow_pickle=True).tolist()

    if model.output_shape[-1] != len(labels):
        raise ValueError(
            f"Model output classes ({model.output_shape[-1]}) "
            f"do not match label count ({len(labels)})"
        )
    
    logging.info("Model loaded successfully.")


# -------- ROUTES --------
@app.get("/")
def root():
    return {"message": "SanketSetu ISL Recognition API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy", "model_loaded": model is not None}


@app.post("/predict")
def predict(input_data: PredictionInput):
    try:
        global model

        data = np.array(input_data.data)
        data = data.reshape(1, 30, 126)

        prediction = model.predict(data)

        predicted_index = int(np.argmax(prediction))
        predicted_label = labels[predicted_index]
        confidence = float(np.max(prediction))

        return {
            "prediction": predicted_label,
            "confidence": confidence
        }

    except Exception as e:
        return {"error": str(e)}


@app.get("/predict-demo")
def predict_demo():
    try:
        dummy_input = np.zeros((1, 30, 126))
        prediction = model.predict(dummy_input)

        predicted_index = int(np.argmax(prediction))
        predicted_label = labels[predicted_index]

        return {
            "prediction": predicted_label,
            "confidence": float(np.max(prediction))
        }

    except Exception as e:
        return {"error": str(e)}

@app.post("/format")
def format_sentence(input_data: TextInput):

    try:
        response = bedrock.converse(
            modelId="arn:aws:bedrock:ap-south-1:140023403920:application-inference-profile/47s54r86t1vu",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "text": f"""
        You are an expert system that converts Indian Sign Language (ISL) gloss into simple English sentences.

        ISL gloss is a sequence of tokens separated by spaces that represent recognized signs.

        Important context:
        - ISL grammar often follows SUBJECT OBJECT VERB order.
        - English uses SUBJECT VERB OBJECT order.
        - The gloss may contain spelling mistakes or recognition noise because it comes from an AI sign recognition model.

        Your task is to convert the gloss into a natural, short English sentence.

        Rules:
        1. Preserve the meaning of the gloss.
        2. Do not invent new concepts not implied by the gloss.
        3. Correct obvious spelling mistakes if the intended word is clear.
        4. Ignore meaningless tokens or recognition noise.
        5. Keep numbers if they appear in the gloss.
        6. Produce a short and natural English sentence.
        7. Return only the final sentence.
        8. Do not explain anything.
        9. Do not include the word "Sentence:" in the output.

        Examples:

        Gloss: HELLO
        Sentence: Hello.

        Gloss: THANK YOU
        Sentence: Thank you.

        Gloss: I WATER WANT
        Sentence: I want water.

        Gloss: TODAY HOME GO
        Sentence: I go home today.

        Gloss: YOU HELP
        Sentence: You help me.

        Gloss: NAMASTE
        Sentence: Namaste.

        Gloss: HELO WATER
        Sentence: Hello, I want water.

        Gloss: DAOUI WATER
        Sentence: I want water.

        Gloss: XQZ WATER
        Sentence: I want water.

        Gloss: WARNING
        Sentence: Warning.

        Gloss: STOP
        Sentence: Stop.

        Now convert the following gloss:

        Gloss: {input_data.text}
        Sentence: """
                        }
                    ]
                }
            ],
            inferenceConfig={
                "maxTokens": 60,
                "temperature": 0.1,
                "topP": 0.9
            }
        )

        sentence = response["output"]["message"]["content"][0]["text"]

        return {"sentence": sentence.strip()}

    except Exception as e:
        # Fallback for local testing without AWS credentials
        logging.warning(f"AWS Bedrock error: {e}. Using fallback sentence formation.")
        
        # Simple fallback: Convert gloss to basic sentence
        gloss = input_data.text.strip()
        
        # Basic word mapping for common ISL tokens
        word_map = {
            "HELLO": "Hello",
            "THANK": "Thank you",
            "YOU": "you",
            "I": "I",
            "WATER": "water",
            "WANT": "want",
            "HELP": "help",
            "PLEASE": "please",
            "NAMASTE": "Namaste",
            "STOP": "Stop",
            "GO": "go",
            "HOME": "home",
            "TODAY": "today",
            "LOVE": "love",
            "FRIEND": "friend",
            "FAMILY": "family",
            "GOOD": "good",
            "BAD": "bad",
            "YES": "yes",
            "NO": "no"
        }
        
        # Simple sentence construction
        words = gloss.split()
        sentence_words = []
        
        for word in words:
            if word in word_map:
                sentence_words.append(word_map[word])
            elif len(word) == 1:  # Single letters
                sentence_words.append(word)
            else:
                sentence_words.append(word.lower())
        
        # Very basic grammar: if "I" and "want" and "water" are present
        if "I" in words and "WANT" in words:
            if any(w in words for w in ["WATER", "FOOD", "HELP"]):
                sentence = "I want " + " ".join([w.lower() for w in words if w not in ["I", "WANT"]])
            else:
                sentence = "I want something."
        elif len(sentence_words) == 1:
            sentence = sentence_words[0] + "."
        else:
            sentence = " ".join(sentence_words) + "."
        
        return {"sentence": sentence}
   

@app.post("/speak")
def speak_text(input_data: SpeechInput):

    try:
        response = polly.synthesize_speech(
            Text=input_data.text,
            OutputFormat="mp3",
            VoiceId="Joanna"  # You can change later
        )

        audio_stream = response["AudioStream"].read()
        encoded_audio = base64.b64encode(audio_stream).decode("utf-8")

        return {"audio": encoded_audio}

    except Exception as e:
        # Fallback for local testing without AWS credentials
        logging.warning(f"AWS Polly error: {e}. Using browser speech synthesis fallback.")
        
        # Return a special flag to indicate client should use browser TTS
        return {
            "error": "AWS Polly unavailable",
            "use_browser_tts": True,
            "text": input_data.text
        }

@app.post("/stt")
def speech_to_text(input_data: STTInput):
    """
    Local speech-to-text endpoint.
    Since we don't have AWS Transcribe locally, this returns a message
    indicating that the client should use browser's built-in speech recognition.
    """
    try:
        # For local demo, we'll return a message to use browser STT
        return {
            "error": "AWS Transcribe unavailable locally",
            "use_browser_stt": True,
            "message": "Please use browser's built-in speech recognition for local testing"
        }
    except Exception as e:
        return {"error": str(e)}
