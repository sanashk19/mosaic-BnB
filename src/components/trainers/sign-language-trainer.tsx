"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Script from "next/script";

interface SignLanguageTrainerProps {
  targetSign?: string;
  onSuccess?: () => void;
  title?: string;
  subtitle?: string;
}

interface WindowWithMediaPipe {
  Hands?: new (options: { locateFile: (file: string) => string }) => {
    setOptions: (options: Record<string, unknown>) => void;
    onResults: (callback: (results: MediaPipeResults) => void) => void;
    send: (input: { image: HTMLVideoElement }) => Promise<void>;
  };
  Camera?: new (
    videoElement: HTMLVideoElement,
    options: { onFrame: () => Promise<void>; width: number; height: number }
  ) => { start: () => Promise<void>; stop: () => void };
  drawConnectors?: (
    ctx: CanvasRenderingContext2D,
    landmarks: Array<{ x: number; y: number; z: number }>,
    connections: unknown,
    options: { color: string; lineWidth: number }
  ) => void;
  drawLandmarks?: (
    ctx: CanvasRenderingContext2D,
    landmarks: Array<{ x: number; y: number; z: number }>,
    options: { color: string; lineWidth: number; radius: number }
  ) => void;
  HAND_CONNECTIONS?: unknown;
}

interface MediaPipeResults {
  multiHandLandmarks?: Array<Array<{ x: number; y: number; z: number }>>;
}

export function SignLanguageTrainer({
  targetSign,
  onSuccess,
  title = "Real-Time Indian Sign Language Recognizer",
  subtitle = "Show your hand signs clearly to the camera to see live translation into text & audio.",
}: SignLanguageTrainerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [handsDetectedCount, setHandsDetectedCount] = useState<number>(0);

  const [predictionText, setPredictionText] = useState<string>("Waiting for signs...");
  const [confidence, setConfidence] = useState<number>(0);
  const [glossTokens, setGlossTokens] = useState<string[]>([]);
  const [currentLetters, setCurrentLetters] = useState<string>("");
  const [sentence, setSentence] = useState<string>("");
  const [isPredicting, setIsPredicting] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [practiceSuccess, setPracticeSuccess] = useState<boolean>(false);

  const frameBufferRef = useRef<number[][]>([]);
  const lastPredictionRef = useRef<string>("");
  const repeatCountRef = useRef<number>(0);
  const lastSignTimeRef = useRef<number>(0);
  const sentenceGeneratedRef = useRef<boolean>(false);
  const cameraInstanceRef = useRef<{ stop: () => void } | null>(null);
  const handsInstanceRef = useRef<{ send: (input: { image: HTMLVideoElement }) => Promise<void> } | null>(null);

  // Send collected 30-frame landmark buffer to backend
  const sendToAPI = useCallback(async () => {
    if (isPredicting || frameBufferRef.current.length < 30) return;

    setIsPredicting(true);
    const bufferCopy = [...frameBufferRef.current];

    try {
      const res = await fetch("/api/isl/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: bufferCopy }),
      });

      if (!res.ok) throw new Error("API response error");

      const data = await res.json();

      if (data.prediction && data.confidence >= 0.75) {
        const pred = data.prediction.toString().toUpperCase();
        setConfidence(Math.round(data.confidence * 100));

        if (pred === lastPredictionRef.current) {
          repeatCountRef.current += 1;
        } else {
          repeatCountRef.current = 1;
          lastPredictionRef.current = pred;
        }

        if (repeatCountRef.current >= 2) {
          setPredictionText(pred);
          lastSignTimeRef.current = Date.now();
          sentenceGeneratedRef.current = false;

          if (targetSign && pred === targetSign.toUpperCase()) {
            setPracticeSuccess(true);
            if (onSuccess) onSuccess();
          }

          if (pred.length === 1) {
            setCurrentLetters((prev) => {
              if (prev.endsWith(pred)) return prev;
              return prev + pred;
            });
          } else {
            setGlossTokens((prev) => {
              if (prev[prev.length - 1] === pred) return prev;
              return [...prev, pred];
            });
          }
        }
      }
    } catch (err) {
      console.error("Sign prediction error:", err);
    } finally {
      setTimeout(() => setIsPredicting(false), 200);
    }
  }, [isPredicting, targetSign, onSuccess]);

  // Initialize MediaPipe Hands after CDN scripts load
  const initMediaPipe = useCallback(() => {
    if (typeof window === "undefined") return;
    const windowMp = window as unknown as WindowWithMediaPipe;

    if (!windowMp.Hands || !windowMp.Camera) {
      console.log("MediaPipe scripts loading...");
      return;
    }

    try {
      const hands = new windowMp.Hands({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      hands.onResults((results: MediaPipeResults) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
          setHandsDetectedCount(results.multiHandLandmarks.length);

          let frame: number[] = [];
          results.multiHandLandmarks.forEach((hand) => {
            if (windowMp.drawConnectors && windowMp.drawLandmarks && windowMp.HAND_CONNECTIONS) {
              windowMp.drawConnectors(ctx, hand, windowMp.HAND_CONNECTIONS, {
                color: "#506847",
                lineWidth: 3,
              });
              windowMp.drawLandmarks(ctx, hand, {
                color: "#D8663F",
                lineWidth: 1,
                radius: 4,
              });
            }

            hand.forEach((lm) => {
              frame.push(lm.x, lm.y, lm.z);
            });
          });

          if (frame.length === 63) {
            frame = frame.concat(new Array(63).fill(0));
          }

          if (frame.length === 126) {
            frameBufferRef.current.push(frame);
            if (frameBufferRef.current.length > 30) {
              frameBufferRef.current.shift();
            }
            if (frameBufferRef.current.length === 30) {
              sendToAPI();
            }
          }
        } else {
          setHandsDetectedCount(0);
        }
      });

      handsInstanceRef.current = hands;
    } catch (err) {
      console.error("Failed to initialize MediaPipe Hands:", err);
    }
  }, [sendToAPI]);

  // Start webcam
  const startCamera = async () => {
    if (!videoRef.current) return;
    setCameraError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });
      videoRef.current.srcObject = stream;

      const windowMp = window as unknown as WindowWithMediaPipe;
      if (windowMp.Camera && handsInstanceRef.current) {
        const camera = new windowMp.Camera(videoRef.current, {
          onFrame: async () => {
            if (videoRef.current && handsInstanceRef.current) {
              await handsInstanceRef.current.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 480,
        });
        cameraInstanceRef.current = camera;
        await camera.start();
      }

      setIsCameraActive(true);
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError("Camera permission denied or camera unavailable. You can use Demo Mode below!");
    }
  };

  // Stop webcam
  const stopCamera = () => {
    if (cameraInstanceRef.current) {
      try {
        cameraInstanceRef.current.stop();
      } catch {
        /* ignore */
      }
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setHandsDetectedCount(0);
  };

  // Generate Sentence from current gloss/letters
  const generateSentence = async () => {
    const fullGloss = [...glossTokens, currentLetters].filter(Boolean).join(" ");
    if (!fullGloss) return;

    try {
      const res = await fetch("/api/isl/format", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: fullGloss }),
      });
      const data = await res.json();
      if (data.sentence) {
        setSentence(data.sentence);
        sentenceGeneratedRef.current = true;
      }
    } catch (err) {
      console.error("Format error:", err);
    }
  };

  // Text to Speech output
  const handleSpeak = async (textToSpeak: string) => {
    if (!textToSpeak) return;
    setIsSpeaking(true);

    try {
      const res = await fetch("/api/isl/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToSpeak }),
      });
      const data = await res.json();

      if (data.audio) {
        const audio = new Audio("data:audio/mp3;base64," + data.audio);
        audio.onended = () => setIsSpeaking(false);
        await audio.play();
      } else {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
    } catch {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Clear state
  const handleClear = () => {
    setGlossTokens([]);
    setCurrentLetters("");
    setSentence("");
    setPredictionText("Waiting for signs...");
    setConfidence(0);
    setPracticeSuccess(false);
    frameBufferRef.current = [];
  };

  // Demo simulation mode for testing without camera
  const triggerDemoSign = (sign: string) => {
    setPredictionText(sign);
    setConfidence(94);
    if (sign.length === 1) {
      setCurrentLetters((prev) => prev + sign);
    } else {
      setGlossTokens((prev) => [...prev, sign]);
    }
    if (targetSign && sign.toUpperCase() === targetSign.toUpperCase()) {
      setPracticeSuccess(true);
      if (onSuccess) onSuccess();
    }
  };

  useEffect(() => {
    lastSignTimeRef.current = Date.now();
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="isl-trainer w-full max-w-5xl mx-auto p-4 sm:p-6 bg-[#FCFCFB] rounded-3xl border border-[#E5E2DC] shadow-sm transition-all font-sans">
      {/* MediaPipe CDN Scripts */}
      <Script
        src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"
        onLoad={initMediaPipe}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js"
        onLoad={initMediaPipe}
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"
        onLoad={initMediaPipe}
      />

      {/* Header Banner */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#E5E2DC] pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EDF2E9] text-[#506847] rounded-full text-xs font-semibold uppercase tracking-wider mb-2 border border-[#E5E2DC]">
            <span>✨ Interactive ISL Trainer</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#22352E] tracking-tight">{title}</h2>
          <p className="text-sm text-[#707877] mt-1">{subtitle}</p>
        </div>

        {targetSign && (
          <div className="bg-[#FBECE5] border border-[#D8663F]/30 rounded-2xl px-4 py-3 flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <span className="text-xs uppercase font-extrabold text-[#D8663F] tracking-wider">Target Sign</span>
              <div className="text-xl font-black text-[#22352E]">{targetSign}</div>
            </div>
          </div>
        )}
      </div>

      {/* Practice Match Success Alert */}
      {practiceSuccess && (
        <div className="mb-6 p-4 bg-[#EDF2E9] border-2 border-[#506847] rounded-2xl flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#506847] text-white flex items-center justify-center font-bold text-xl">
              ✓
            </div>
            <div>
              <h4 className="font-bold text-[#22352E]">Excellent Sign Match!</h4>
              <p className="text-sm text-[#506847]">
                You accurately performed sign &quot;{targetSign || predictionText}&quot;.
              </p>
            </div>
          </div>
          <button
            onClick={() => setPracticeSuccess(false)}
            className="px-4 py-2 bg-[#506847] hover:bg-[#344934] text-white font-medium rounded-xl text-sm transition shadow-sm"
          >
            Continue
          </button>
        </div>
      )}

      {/* Main Grid: Camera Video Box vs Recognition Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Camera Feed with Overlay */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="relative w-full aspect-video bg-[#22352E] rounded-2xl overflow-hidden shadow-inner border border-[#344934] flex items-center justify-center">
            {/* Live Video Element */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover transform -scale-x-100 ${
                isCameraActive ? "block" : "hidden"
              }`}
              onLoadedMetadata={() => {
                if (canvasRef.current && videoRef.current) {
                  canvasRef.current.width = videoRef.current.videoWidth || 640;
                  canvasRef.current.height = videoRef.current.videoHeight || 480;
                }
              }}
            />

            {/* Landmark Skeleton Drawing Canvas */}
            <canvas
              ref={canvasRef}
              className={`absolute inset-0 w-full h-full object-cover transform -scale-x-100 pointer-events-none ${
                isCameraActive ? "block" : "hidden"
              }`}
            />

            {/* Placeholder when camera is off */}
            {!isCameraActive && (
              <div className="p-6 text-center text-[#EDF2E9] flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#344934] flex items-center justify-center text-3xl">
                  📹
                </div>
                <h4 className="text-[#FCFCFB] font-semibold">Webcam is currently off</h4>
                <p className="text-xs text-[#EDF2E9]/80 max-w-xs">
                  Click &quot;Start Camera&quot; below to begin real-time hand gesture tracking.
                </p>
              </div>
            )}

            {/* Top Status Badges */}
            {isCameraActive && (
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white text-xs font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Detection
                </div>
                <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white text-xs font-medium">
                  {handsDetectedCount > 0
                    ? `🖐️ Hands detected: ${handsDetectedCount}`
                    : "🔍 Raise hand in frame"}
                </div>
              </div>
            )}
          </div>

          {/* Camera Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            {!isCameraActive ? (
              <button
                onClick={startCamera}
                className="flex-1 px-5 py-3 bg-[#506847] hover:bg-[#344934] text-white font-semibold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-sm"
              >
                <span>📹</span> Start Camera
              </button>
            ) : (
              <button
                onClick={stopCamera}
                className="flex-1 px-5 py-3 bg-rose-700 hover:bg-rose-800 text-white font-semibold rounded-xl text-sm transition flex items-center justify-center gap-2"
              >
                <span>⏹️</span> Stop Camera
              </button>
            )}

            <button
              onClick={handleClear}
              className="px-4 py-3 bg-[#EDF2E9] hover:bg-[#E5E2DC] text-[#22352E] font-semibold rounded-xl text-sm transition flex items-center gap-2 border border-[#E5E2DC]"
            >
              <span>🗑️</span> Reset
            </button>
          </div>

          {cameraError && (
            <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs">
              {cameraError}
            </div>
          )}

          {/* Fallback Demo Shortcuts */}
          <div className="p-3 bg.EDF2E9/50 bg-[#EDF2E9]/40 border border-[#E5E2DC] rounded-2xl">
            <span className="text-xs font-semibold text-[#707877] uppercase tracking-wider block mb-2">
              Instant Demo Testing (Quick Sign Simulations)
            </span>
            <div className="flex flex-wrap gap-2">
              {["HELLO", "NAMASTE", "THANK YOU", "WATER", "A", "B", "C"].map((s) => (
                <button
                  key={s}
                  onClick={() => triggerDemoSign(s)}
                  className="px-2.5 py-1 bg-[#FCFCFB] hover:bg-[#EDF2E9] text-[#506847] border border-[#506847]/30 rounded-lg text-xs font-bold transition shadow-2xs"
                >
                  Sign &quot;{s}&quot;
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time Recognition Output */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Current Sign Detected */}
          <div className="p-5 bg-gradient-to-br from-[#EDF2E9] to-[#FCFCFB] border border-[#E5E2DC] rounded-2xl flex flex-col gap-2 shadow-2xs">
            <span className="text-xs font-extrabold text-[#506847] uppercase tracking-wider">
              Detected Sign / Gesture
            </span>
            <div className="text-3xl font-black text-[#22352E] tracking-wide min-h-[44px] flex items-center">
              {predictionText}
            </div>

            {/* Confidence Bar */}
            <div className="mt-2">
              <div className="flex justify-between text-xs text-[#707877] font-semibold mb-1">
                <span>Confidence Match</span>
                <span>{confidence}%</span>
              </div>
              <div className="w-full h-2.5 bg-[#E5E2DC] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#506847] transition-all duration-300"
                  style={{ width: `${confidence}%` }}
                />
              </div>
            </div>
          </div>

          {/* Accumulated Gloss Tokens */}
          <div className="p-5 bg-[#FCFCFB] border border-[#E5E2DC] rounded-2xl flex flex-col gap-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#707877] uppercase tracking-wider">
                Recognized Words (Gloss)
              </span>
              <button
                onClick={() => {
                  setGlossTokens([]);
                  setCurrentLetters("");
                }}
                className="text-xs text-[#506847] hover:text-[#344934] font-bold"
              >
                Clear
              </button>
            </div>

            <div className="min-h-[50px] p-3 bg-[#EDF2E9]/40 border border-[#E5E2DC] rounded-xl flex flex-wrap items-center gap-1.5 font-semibold text-[#22352E] text-sm">
              {glossTokens.length === 0 && !currentLetters ? (
                <span className="text-[#707877] font-normal italic text-xs">
                  Your signed words will appear here...
                </span>
              ) : (
                <>
                  {glossTokens.map((tok, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-[#506847] text-white rounded-lg text-xs font-bold"
                    >
                      {tok}
                    </span>
                  ))}
                  {currentLetters && (
                    <span className="px-2.5 py-1 bg-[#D8663F] text-white rounded-lg text-xs font-bold animate-pulse">
                      {currentLetters}
                    </span>
                  )}
                </>
              )}
            </div>

            <button
              onClick={generateSentence}
              disabled={glossTokens.length === 0 && !currentLetters}
              className="mt-1 w-full py-2.5 bg-[#506847] hover:bg-[#344934] disabled:bg-[#E5E2DC] disabled:text-[#707877] text-white font-bold rounded-xl text-xs transition shadow-sm"
            >
              Construct Sentence ✨
            </button>
          </div>

          {/* Formatted Sentence & Audio Output */}
          <div className="p-5 bg-[#FCFCFB] border border-[#E5E2DC] rounded-2xl shadow-sm flex flex-col gap-3">
            <span className="text-xs font-extrabold text-[#707877] uppercase tracking-wider">
              Translated English Sentence
            </span>

            <div className="min-h-[60px] p-3 bg-[#EDF2E9]/50 border border-[#E5E2DC] rounded-xl text-[#22352E] font-semibold text-base flex items-center justify-between">
              <span>{sentence || "Waiting to form sentence..."}</span>
              {sentence && (
                <button
                  onClick={() => handleSpeak(sentence)}
                  disabled={isSpeaking}
                  className="p-2 bg-[#EDF2E9] hover:bg-[#E5E2DC] text-[#506847] rounded-xl transition text-lg"
                  title="Listen Audio"
                >
                  {isSpeaking ? "🔊..." : "🔊"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
