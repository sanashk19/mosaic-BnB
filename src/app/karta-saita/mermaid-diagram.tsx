"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import styles from "./page.module.css";

type MermaidApi = {
  initialize: (config: Record<string, unknown>) => void;
  render: (id: string, chart: string) => Promise<{ svg: string }>;
};

type MermaidDiagramProps = {
  chart: string;
  title: string;
};

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  scrollLeft: number;
  scrollTop: number;
};

declare global {
  interface Window {
    mermaid?: MermaidApi;
    __uquvliMermaidLoading?: Promise<MermaidApi>;
  }
}

function loadMermaid() {
  if (window.mermaid) {
    return Promise.resolve(window.mermaid);
  }

  if (window.__uquvliMermaidLoading) {
    return window.__uquvliMermaidLoading;
  }

  window.__uquvliMermaidLoading = new Promise<MermaidApi>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-uquvli-mermaid="true"]',
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => {
        if (window.mermaid) resolve(window.mermaid);
        else reject(new Error("Mermaid загрузился, но API не найден."));
      });
      existingScript.addEventListener("error", () => {
        reject(new Error("Не удалось загрузить Mermaid."));
      });
      return;
    }

    const script = document.createElement("script");
    script.src = "/vendor/mermaid.min.js";
    script.async = true;
    script.dataset.uquvliMermaid = "true";
    script.addEventListener("load", () => {
      if (window.mermaid) resolve(window.mermaid);
      else reject(new Error("Mermaid загрузился, но API не найден."));
    });
    script.addEventListener("error", () => {
      reject(new Error("Не удалось загрузить Mermaid."));
    });
    document.head.appendChild(script);
  });

  return window.__uquvliMermaidLoading;
}

function keepSvgReadable(svgMarkup: string) {
  const parser = new DOMParser();
  const document = parser.parseFromString(svgMarkup, "image/svg+xml");
  const svg = document.documentElement;
  const viewBox = svg.getAttribute("viewBox")?.split(/\s+/).map(Number);

  if (!viewBox || viewBox.length !== 4 || viewBox.some(Number.isNaN)) {
    return svgMarkup;
  }

  const [, , viewBoxWidth, viewBoxHeight] = viewBox;
  const width = Math.max(Math.ceil(viewBoxWidth), 1400);
  const height = Math.ceil((width / viewBoxWidth) * viewBoxHeight);

  svg.setAttribute("width", String(width));
  svg.setAttribute("height", String(height));

  return new XMLSerializer().serializeToString(svg);
}

export function MermaidDiagram({ chart, title }: MermaidDiagramProps) {
  const reactId = useId();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const [svg, setSvg] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      try {
        setError(null);
        const mermaid = await loadMermaid();

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: "base",
          themeVariables: {
            background: "#ffffff",
            primaryColor: "#ffffff",
            primaryTextColor: "#10213b",
            primaryBorderColor: "#0d50cf",
            lineColor: "#64748b",
            fontFamily:
              "Segoe UI, Noto Sans, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: "16px",
          },
          flowchart: {
            curve: "basis",
            htmlLabels: true,
            nodeSpacing: 38,
            rankSpacing: 48,
          },
        });

        const diagramId = `uquvli-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
        const result = await mermaid.render(diagramId, chart);

        if (!cancelled) {
          setSvg(keepSvgReadable(result.svg));
        }
      } catch (renderError) {
        if (!cancelled) {
          setSvg("");
          setError(
            renderError instanceof Error
              ? renderError.message
              : "Не удалось отрисовать схему.",
          );
        }
      }
    }

    void renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [chart, reactId]);

  function changeScale(delta: number) {
    setScale((current) => Math.min(1.6, Math.max(0.5, Number((current + delta).toFixed(2)))));
  }

  function resetView() {
    setScale(1);
    scrollerRef.current?.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) {
      return;
    }

    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: scroller.scrollLeft,
      scrollTop: scroller.scrollTop,
    };
    scroller.setPointerCapture(event.pointerId);
    setIsDragging(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const dragState = dragStateRef.current;
    const scroller = scrollerRef.current;

    if (!dragState || !scroller || dragState.pointerId !== event.pointerId) {
      return;
    }

    event.preventDefault();
    scroller.scrollLeft = dragState.scrollLeft - (event.clientX - dragState.startX);
    scroller.scrollTop = dragState.scrollTop - (event.clientY - dragState.startY);
  }

  function stopDragging(event: PointerEvent<HTMLDivElement>) {
    const dragState = dragStateRef.current;
    const scroller = scrollerRef.current;

    if (
      dragState
      && scroller
      && dragState.pointerId === event.pointerId
      && scroller.hasPointerCapture(event.pointerId)
    ) {
      scroller.releasePointerCapture(event.pointerId);
    }

    dragStateRef.current = null;
    setIsDragging(false);
  }

  return (
    <div className={styles.diagramFrame} aria-label={title}>
      <div className={styles.diagramToolbar}>
        <span>Mermaid SVG</span>
        <div className={styles.diagramControls}>
          <span>Зажмите мышкой и двигайте схему</span>
          <button type="button" onClick={() => changeScale(-0.1)} aria-label="Уменьшить схему">
            −
          </button>
          <strong>{Math.round(scale * 100)}%</strong>
          <button type="button" onClick={() => changeScale(0.1)} aria-label="Увеличить схему">
            +
          </button>
          <button type="button" onClick={resetView}>
            Сброс
          </button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        className={`${styles.diagramScroller} ${isDragging ? styles.diagramScrollerDragging : ""}`}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onPointerLeave={(event) => {
          if (dragStateRef.current) {
            stopDragging(event);
          }
        }}
      >
        <div
          className={styles.diagramCanvas}
          style={{ "--diagram-scale": String(scale) } as CSSProperties}
        >
          {error ? (
            <pre className={styles.diagramError}>{error}</pre>
          ) : svg ? (
            <div dangerouslySetInnerHTML={{ __html: svg }} />
          ) : (
            <div className={styles.diagramLoading}>Схема загружается...</div>
          )}
        </div>
      </div>
    </div>
  );
}
