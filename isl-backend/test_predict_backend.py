import requests
import numpy as np
import json

# Load classes
classes = np.load('isl-backend/class_names.npy', allow_pickle=True).tolist()
print(f"Total classes in class_names.npy: {len(classes)}")

# Generate a 30x126 sequence
dummy_seq = np.zeros((30, 126))
# Add some realistic coordinates for one hand
for t in range(30):
    for i in range(21):
        dummy_seq[t, i*3] = 0.5 + 0.05 * np.cos(i + t*0.1)
        dummy_seq[t, i*3+1] = 0.5 + 0.05 * np.sin(i + t*0.1)
        dummy_seq[t, i*3+2] = 0.01 * np.cos(i)

payload = {"data": dummy_seq.tolist()}

resp = requests.post("http://127.0.0.1:8000/predict", json=payload)
print(f"Status Code: {resp.status_code}")
resp_json = resp.json()
print("Exact JSON response:")
print(json.dumps(resp_json, indent=2))

pred = resp_json.get("prediction")
conf = resp_json.get("confidence")

print(f"\nPrediction: '{pred}', Confidence: {conf}")
print(f"Is prediction in 51 classes? {pred in classes}")
if pred in classes:
    print(f"Index of '{pred}' in class_names.npy: {classes.index(pred)}")

# Verify all 51 classes
print("\n--- 51 Model Classes ---")
for idx, c in enumerate(classes):
    print(f"[{idx:02d}] {c}")
