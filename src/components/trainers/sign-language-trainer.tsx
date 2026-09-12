"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Script from "next/script";
import {
  CameraIcon,
  StopIcon,
  ResetIcon,
  SpeakerIcon,
  SparkleIcon,
  TargetIcon,
  CheckIcon,
  HandIcon,
  SearchIcon,
  WandIcon,
} from "@/components/isl-icons";

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
    close?: () => Promise<void>;
  };
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

const ISL_TWO_HANDED_SIGNS = new Set([
  "HELP",
  "NAMASTE",
  "HOME",
  "STOP",
  "FAMILY",
  "THANK YOU",
  "WANT",
  "WARNING",
  "WATER",
]);

export function SignLanguageTrainer({
  targetSign,
  onSuccess,
  title = "Live sign recognition",
  subtitle = "Show a sign to the camera and Mosaic will analyze the gesture.",
}: SignLanguageTrainerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Status & UI states
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraStatus, setCameraStatus] = useState<string>("Webcam is currently off");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [mediaPipeReady, setMediaPipeReady] = useState<boolean>(false);
  const [handsDetectedCount, setHandsDetectedCount] = useState<number>(0);
  const [landmarkCount, setLandmarkCount] = useState<number>(0);
  const [bufferCount, setBufferCount] = useState<number>(0);

  // Recognition outputs
  const [predictionText, setPredictionText] = useState<string>("Waiting for a sign...");
  const [confidence, setConfidence] = useState<number>(0);
  const [glossTokens, setGlossTokens] = useState<string[]>([]);
  const [sentence, setSentence] = useState<string>("");
  const [isPredicting, setIsPredicting] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [practiceSuccess, setPracticeSuccess] = useState<boolean>(false);
  const [backendStatus, setBackendStatus] = useState<string>("Checking...");
  const [showDiagnostics, setShowDiagnostics] = useState<boolean>(false);

  // Internal lifecycle and frame refs
  const isMountedRef = useRef<boolean>(true);
  const isCameraActiveRef = useRef<boolean>(false);
  const handsInstanceRef = useRef<{
    send: (input: { image: HTMLVideoElement }) => Promise<void>;
    close?: () => Promise<void>;
  } | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isProcessingFrameRef = useRef<boolean>(false);
  const frameBufferRef = useRef<number[][]>([]);
  const isPredictingRef = useRef<boolean>(false);
  const lastPredictionRef = useRef<string>("");
  const consecutiveCountRef = useRef<number>(0);
  const lastCommittedSignRef = useRef<string>("");
  const lastCommittedTimeRef = useRef<number>(0);

  // Stop webcam
  const stopCamera = useCallback(() => {
    isCameraActiveRef.current = false;
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    setIsCameraActive(false);
    setCameraStatus("Webcam is currently off");
    setHandsDetectedCount(0);
    setLandmarkCount(0);
    setBufferCount(0);
    frameBufferRef.current = [];
    consecutiveCountRef.current = 0;
  }, []);

  // Check backend health on mount
  useEffect(() => {
    isMountedRef.current = true;
    fetch("/api/isl/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [new Array(126).fill(0)] }),
    })
      .then((res) => {
        if (res.ok) setBackendStatus("Connected (Port 8000 / ML Model)");
        else setBackendStatus("Online (Fallback mode)");
      })
      .catch(() => setBackendStatus("Online (Local simulation)"));

    return () => {
      isMountedRef.current = false;
      stopCamera();
    };
  }, [stopCamera]);

  // Send collected 30-frame landmark buffer to prediction endpoint
  const sendToAPI = useCallback(async () => {
    if (isPredictingRef.current || frameBufferRef.current.length < 30) return;

    isPredictingRef.current = true;
    setIsPredicting(true);
    const bufferCopy = [...frameBufferRef.current];

    try {
      const res = await fetch("/api/isl/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: bufferCopy }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      if (data && data.prediction) {
        const pred = String(data.prediction).trim().toUpperCase();
        const conf = Math.round(Number(data.confidence || 0) * 100);

        setPredictionText(pred);
        setConfidence(conf);

        // Track temporal consistency
        if (pred === lastPredictionRef.current) {
          consecutiveCountRef.current += 1;
        } else {
          consecutiveCountRef.current = 1;
          lastPredictionRef.current = pred;
        }

        // Target sign matching: require exact match, confidence >= 65%, and stable hold (>=2 consecutive windows)
        if (targetSign) {
          const targetClean = targetSign.trim().toUpperCase();
          if (pred === targetClean && conf >= 65 && consecutiveCountRef.current >= 2) {
            setPracticeSuccess(true);
            if (onSuccess) onSuccess();
          }
        }

        // Commit recognized signs: require stability (>= 3 consecutive windows) and confidence >= 72%
        // Store each recognized sign as a distinct token chip (never concatenate raw characters)
        const now = Date.now();
        if (
          conf >= 72 &&
          consecutiveCountRef.current >= 3 &&
          (pred !== lastCommittedSignRef.current || now - lastCommittedTimeRef.current > 2000)
        ) {
          lastCommittedSignRef.current = pred;
          lastCommittedTimeRef.current = now;
          setGlossTokens((prev) => [...prev, pred]);
        }
      }
    } catch (err) {
      console.warn("Prediction error:", err);
    } finally {
      setTimeout(() => {
        isPredictingRef.current = false;
        setIsPredicting(false);
      }, 250);
    }
  }, [targetSign, onSuccess]);

  // Robust MediaPipe Initialization
  const initMediaPipe = useCallback(() => {
    if (typeof window === "undefined") return;
    const windowMp = window as unknown as WindowWithMediaPipe;

    if (!windowMp.Hands) {
      console.log("MediaPipe Hands script not yet available on window.");
      return;
    }

    if (handsInstanceRef.current) return;

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
        if (!isMountedRef.current || !canvasRef.current || !videoRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Keep canvas size matching video
        const vid = videoRef.current;
        if (vid.videoWidth && canvas.width !== vid.videoWidth) {
          canvas.width = vid.videoWidth;
          canvas.height = vid.videoHeight;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
          const detected = results.multiHandLandmarks.length;
          setHandsDetectedCount(detected);
          setLandmarkCount(detected * 21);

          let frame: number[] = [];
          results.multiHandLandmarks.forEach((hand) => {
            // Draw skeleton landmarks
            if (windowMp.drawConnectors && windowMp.HAND_CONNECTIONS) {
              windowMp.drawConnectors(ctx, hand, windowMp.HAND_CONNECTIONS, {
                color: "#506847",
                lineWidth: 3,
              });
            }
            if (windowMp.drawLandmarks) {
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

          // Normalize to 126 float values (2 hands * 21 * 3)
          if (frame.length === 63) {
            frame = frame.concat(new Array(63).fill(0));
          }

          if (frame.length === 126) {
            frameBufferRef.current.push(frame);
            if (frameBufferRef.current.length > 30) {
              frameBufferRef.current.shift();
            }
            setBufferCount(frameBufferRef.current.length);
            if (frameBufferRef.current.length === 30 && !isPredictingRef.current) {
              sendToAPI();
            }
          }
        } else {
          setHandsDetectedCount(0);
          setLandmarkCount(0);
          if (frameBufferRef.current.length > 0) {
            frameBufferRef.current.shift();
            setBufferCount(frameBufferRef.current.length);
          }
        }
      });

      handsInstanceRef.current = hands;
      setMediaPipeReady(true);
      console.log("MediaPipe Hands initialized successfully.");
    } catch (err) {
      console.error("Failed to initialize MediaPipe Hands:", err);
      setCameraError("MediaPipe model loading issue. You can still use Demo Gestures below.");
    }
  }, [sendToAPI]);

  // Dynamic script loader fallback in case <Script> tags are cached
  useEffect(() => {
    const checkOrLoad = () => {
      const windowMp = window as unknown as WindowWithMediaPipe;
      if (windowMp.Hands) {
        initMediaPipe();
        return;
      }

      const scripts = [
        "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js",
        "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js",
        "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js",
      ];

      scripts.forEach((src) => {
        if (!document.querySelector(`script[src="${src}"]`)) {
          const s = document.createElement("script");
          s.src = src;
          s.crossOrigin = "anonymous";
          s.onload = () => {
            const w = window as unknown as WindowWithMediaPipe;
            if (w.Hands) initMediaPipe();
          };
          document.head.appendChild(s);
        }
      });
    };

    checkOrLoad();
    const timer = setInterval(() => {
      const w = window as unknown as WindowWithMediaPipe;
      if (w.Hands && !handsInstanceRef.current) {
        initMediaPipe();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [initMediaPipe]);

  // Frame processing loop using requestAnimationFrame
  const startFrameLoop = useCallback(() => {
    const processFrame = async () => {
      if (!isMountedRef.current || !isCameraActiveRef.current) return;

      if (
        videoRef.current &&
        videoRef.current.readyState >= 2 &&
        handsInstanceRef.current &&
        !isProcessingFrameRef.current
      ) {
        isProcessingFrameRef.current = true;
        try {
          await handsInstanceRef.current.send({ image: videoRef.current });
        } catch (e) {
          console.warn("Error sending video frame to MediaPipe:", e);
        } finally {
          isProcessingFrameRef.current = false;
        }
      }

      if (isCameraActiveRef.current) {
        animFrameRef.current = requestAnimationFrame(processFrame);
      }
    };

    animFrameRef.current = requestAnimationFrame(processFrame);
  }, []);

  // Start webcam
  const startCamera = async () => {
    if (!videoRef.current) return;
    setCameraError(null);
    setCameraStatus("Starting camera feed...");

    // Ensure MediaPipe is initialized
    const windowMp = window as unknown as WindowWithMediaPipe;
    if (windowMp.Hands && !handsInstanceRef.current) {
      initMediaPipe();
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      });

      if (!isMountedRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
          if (canvasRef.current) {
            canvasRef.current.width = videoRef.current.videoWidth || 640;
            canvasRef.current.height = videoRef.current.videoHeight || 480;
          }
        }
      };

      isCameraActiveRef.current = true;
      setIsCameraActive(true);
      setCameraStatus("Camera active");

      // Start inference processing loop
      startFrameLoop();
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError(
        "Camera permission was denied or camera is unavailable. You can use instant simulation with Demo Gestures below!"
      );
      setCameraStatus("Camera unavailable");
      setIsCameraActive(false);
    }
  };

  // Clear state
  const handleClear = () => {
    setGlossTokens([]);
    setSentence("");
    setPredictionText("Waiting for a sign...");
    setConfidence(0);
    setPracticeSuccess(false);
    setBufferCount(0);
    frameBufferRef.current = [];
    consecutiveCountRef.current = 0;
    lastCommittedSignRef.current = "";
  };

  // Instant simulation with demo gestures
  const triggerDemoSign = (sign: string) => {
    const cleanSign = sign.toUpperCase();
    setPredictionText(cleanSign);
    setConfidence(94);
    setGlossTokens((prev) => [...prev, cleanSign]);
    if (targetSign && cleanSign === targetSign.toUpperCase()) {
      setPracticeSuccess(true);
      if (onSuccess) onSuccess();
    }
  };

  // Generate Sentence from current gloss/letters
  const generateSentence = async () => {
    const fullGloss = glossTokens.join(" ");
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

  return (
    <div className="isl-trainer-root">
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
      <div className="isl-trainer-header">
        <div className="isl-trainer-header-left">
          <div className="isl-trainer-badge">
            <SparkleIcon size={14} />
            <span>Interactive ISL Trainer</span>
          </div>
          <h2 className="isl-trainer-title">{title}</h2>
          <p className="isl-trainer-subtitle">{subtitle}</p>
        </div>

        {targetSign && (
          <div className="isl-trainer-target-badge">
            <div className="isl-trainer-target-icon">
              <TargetIcon size={20} />
            </div>
            <div>
              <span className="isl-trainer-target-label">Target Sign</span>
              <div className="isl-trainer-target-val">{targetSign}</div>
            </div>
          </div>
        )}
      </div>

      {/* Practice Match Success Alert */}
      {practiceSuccess && (
        <div className="isl-trainer-success-banner">
          <div className="isl-trainer-success-info">
            <div className="isl-trainer-success-icon">
              <CheckIcon size={20} />
            </div>
            <div className="isl-trainer-success-text">
              <h4>Correct Sign Detected!</h4>
              <p>
                You accurately formed sign &quot;{targetSign || predictionText}&quot; ({confidence}% confidence).
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setPracticeSuccess(false);
              if (onSuccess) onSuccess();
            }}
            className="isl-trainer-success-dismiss"
          >
            Continue
          </button>
        </div>
      )}

      {/* Main Grid: Camera Video Box vs Recognition Panel */}
      <div className="isl-trainer-grid">
        {/* Left Column: Camera Feed with Overlay */}
        <div className="isl-trainer-cam-col">
          <div className="isl-trainer-video-wrap">
            {/* Live Video Element */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="isl-trainer-video"
              style={{ display: isCameraActive ? "block" : "none" }}
            />

            {/* Landmark Skeleton Drawing Canvas */}
            <canvas
              ref={canvasRef}
              className="isl-trainer-canvas"
              style={{ display: isCameraActive ? "block" : "none" }}
            />

            {/* Placeholder when camera is off */}
            {!isCameraActive && (
              <div className="isl-trainer-placeholder">
                <div className="isl-trainer-placeholder-icon">
                  <CameraIcon size={32} />
                </div>
                <h4>{cameraStatus}</h4>
                <p>
                  Click &quot;Start Camera&quot; below to begin real-time hand gesture tracking.
                </p>
              </div>
            )}

            {/* Top Status Badges */}
            {isCameraActive && (
              <div className="isl-trainer-overlay">
                <div className="isl-trainer-overlay-badge">
                  <span className="isl-trainer-dot-pulse" />
                  <span>Camera Active</span>
                </div>
                <div className="isl-trainer-overlay-badge">
                  {handsDetectedCount > 0 ? (
                    <>
                      <HandIcon size={14} style={{ color: "#34D399" }} />
                      <span>Hands: {handsDetectedCount} ({landmarkCount} pts)</span>
                    </>
                  ) : (
                    <>
                      <SearchIcon size={14} />
                      <span>Raise hand in frame</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Camera Controls */}
          <div className="isl-trainer-controls">
            {!isCameraActive ? (
              <button
                type="button"
                onClick={startCamera}
                className="isl-trainer-btn-start"
              >
                <CameraIcon size={18} />
                <span>Start Camera</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={stopCamera}
                className="isl-trainer-btn-stop"
              >
                <StopIcon size={18} />
                <span>Stop Camera</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleClear}
              className="isl-trainer-btn-reset"
            >
              <ResetIcon size={16} />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={() => setShowDiagnostics((prev) => !prev)}
              className="isl-trainer-btn-reset"
              style={{ fontSize: "0.8125rem" }}
              title="Toggle Pipeline Diagnostics"
            >
              <span>{showDiagnostics ? "Hide Diagnostics" : "Diagnostics"}</span>
            </button>
          </div>

          {cameraError && (
            <div className="isl-trainer-error">
              <strong>Camera status: </strong>
              {cameraError}
            </div>
          )}

          {/* Diagnostic Panel */}
          {showDiagnostics && (
            <div
              style={{
                marginTop: "0.75rem",
                padding: "0.85rem 1rem",
                backgroundColor: "#F7F6F3",
                border: "1px solid #E5E2DC",
                borderRadius: "12px",
                fontSize: "0.8125rem",
                lineHeight: "1.5",
                color: "#22352E",
              }}
            >
              <strong style={{ display: "block", marginBottom: "0.35rem", color: "#506847", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                ISL Pipeline Diagnostics (Development Mode)
              </strong>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.35rem 1rem" }}>
                <div>Camera: <strong>{isCameraActive ? "READY" : "INACTIVE"}</strong></div>
                <div>MediaPipe: <strong>{mediaPipeReady ? "INITIALIZED" : "LOADING..."}</strong></div>
                <div>Hands Detected: <strong>{handsDetectedCount}</strong></div>
                <div>Landmarks: <strong>{landmarkCount} / 42</strong></div>
                <div>Backend Service: <strong>{backendStatus}</strong></div>
                <div>Buffer: <strong>{bufferCount} / 30 frames</strong></div>
                <div>Inference Loop: <strong>{isPredicting ? "PREDICTING" : isCameraActive ? "READY" : "IDLE"}</strong></div>
                <div>Last Detected: <strong>{predictionText} ({confidence}%)</strong></div>
              </div>
            </div>
          )}

          {/* Practice / Quick Demo Simulation */}
          <div className="isl-trainer-demo-card">
            <div className="isl-trainer-demo-head">
              <span>Try with demo gestures</span>
              <small>Instant simulation</small>
            </div>
            <div className="isl-trainer-demo-buttons">
              {["A", "B", "C", "1", "2", "Hello", "Namaste", "Water", "Help", "Thank you"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => triggerDemoSign(s.toUpperCase())}
                  className="isl-trainer-demo-btn"
                >
                  <strong>{s}</strong>
                  <span>Try sign</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time Recognition Output */}
        <div className="isl-trainer-out-col">
          {/* Current Sign Detected */}
          <div className="isl-trainer-panel" style={{ backgroundColor: "#FCFCFB" }}>
            <span className="isl-trainer-panel-title">Detected sign</span>
            <div className="isl-trainer-detected-display">
              {predictionText}
            </div>

            {/* Confidence Bar */}
            <div className="isl-trainer-conf-wrap">
              <div className="isl-trainer-conf-header">
                <span>Confidence:</span>
                <strong>{confidence}%</strong>
              </div>
              <div className="isl-trainer-conf-track">
                <div
                  className="isl-trainer-conf-fill"
                  style={{ width: `${confidence}%` }}
                />
              </div>
            </div>

            {isCameraActive && handsDetectedCount === 0 && (
              <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.8125rem", color: "#707877", textAlign: "center" }}>
                Place your hand clearly inside the camera frame.
              </p>
            )}
            {isCameraActive && handsDetectedCount > 0 && confidence < 50 && (
              <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.8125rem", color: "#506847", textAlign: "center" }}>
                Hand detected. Hold gesture steady to analyze...
              </p>
            )}

            {/* Target comparison feedback */}
            {targetSign && isCameraActive && handsDetectedCount > 0 && predictionText !== "Waiting for a sign..." && (
              <div style={{ marginTop: "0.75rem" }}>
                {predictionText.trim().toUpperCase() === targetSign.trim().toUpperCase() ? (
                  <div
                    style={{
                      padding: "0.5rem 0.75rem",
                      backgroundColor: "#EDF2E9",
                      border: "1px solid #C4D3BE",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "#22352E",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                    }}
                  >
                    <CheckIcon size={16} />
                    <span>✓ Correct sign: {targetSign}</span>
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "0.5rem 0.75rem",
                      backgroundColor: "#FBECE5",
                      border: "1px solid #F1C3AF",
                      borderRadius: "8px",
                      color: "#9A3412",
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                    }}
                  >
                    Try again: Target is &quot;{targetSign}&quot; (detected &quot;{predictionText}&quot;)
                  </div>
                )}
              </div>
            )}

            {/* Two-handed sign guidance */}
            {targetSign &&
              ISL_TWO_HANDED_SIGNS.has(targetSign.trim().toUpperCase()) &&
              isCameraActive &&
              handsDetectedCount === 1 && (
                <div
                  style={{
                    marginTop: "0.5rem",
                    padding: "0.5rem 0.75rem",
                    backgroundColor: "#FFFBEB",
                    border: "1px solid #FDE68A",
                    borderRadius: "8px",
                    color: "#92400E",
                    fontSize: "0.75rem",
                    lineHeight: "1.4",
                  }}
                >
                  <strong>Notice:</strong> &quot;{targetSign}&quot; is a two-handed sign in ISL. Place both hands inside the camera frame.
                </div>
              )}
          </div>

          {/* Accumulated Gloss Tokens */}
          <div className="isl-trainer-panel">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span className="isl-trainer-panel-title">Recognized words</span>
              <button
                type="button"
                onClick={() => {
                  setGlossTokens([]);
                }}
                style={{ background: "none", border: "none", color: "#506847", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer" }}
              >
                Clear
              </button>
            </div>

            <div className="isl-trainer-token-box">
              {glossTokens.length === 0 ? (
                <span className="isl-trainer-token-empty">
                  Your detected signs will appear here.
                </span>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {glossTokens.map((tok, idx) => (
                    <span key={idx} className="isl-trainer-chip-word">
                      {tok}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sentence Builder */}
          <div className="isl-trainer-panel">
            <span className="isl-trainer-panel-title">Build a sentence</span>

            <div className="isl-trainer-sentence-box">
              {sentence ? (
                <p className="isl-trainer-sentence-text">{sentence}</p>
              ) : (
                <p className="isl-trainer-sentence-placeholder">Your sentence will appear here.</p>
              )}
              {sentence && (
                <button
                  type="button"
                  onClick={() => handleSpeak(sentence)}
                  disabled={isSpeaking}
                  className="isl-trainer-speak-btn"
                  title="Listen audio"
                >
                  <SpeakerIcon size={14} />
                  <span>{isSpeaking ? "Playing..." : "Listen"}</span>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={generateSentence}
              disabled={glossTokens.length === 0}
              className="isl-trainer-btn-build"
            >
              <WandIcon size={16} />
              <span>Construct sentence</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
