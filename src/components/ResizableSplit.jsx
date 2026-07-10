import { useRef, useState, useCallback, useEffect } from "react";

/**
 * Resizable split — direction="horizontal" gives left/right panes (e.g.
 * description vs editor); direction="vertical" gives top/bottom panes
 * (e.g. editor vs console). The split ratio persists to localStorage
 * under `storageKey` so it survives refresh/navigation, same as
 * LeetCode's adjustable layout.
 *
 * Usage:
 *   <ResizableSplit storageKey="project-split" left={<Description />} right={<EditorStack />} />
 *   <ResizableSplit direction="vertical" storageKey="editor-console" left={<Editor />} right={<Console />} />
 */
export default function ResizableSplit({
  left,
  right,
  storageKey = "resizable-split-size",
  direction = "horizontal",
  min = 25,
  max = 75,
  defaultSize = 45,
}) {
  const containerRef = useRef(null);
  const draggingRef = useRef(false);
  const isHorizontal = direction === "horizontal";

  const [firstSize, setFirstSize] = useState(() => {
    const saved = Number(localStorage.getItem(storageKey));
    return saved && saved >= min && saved <= max ? saved : defaultSize;
  });

  const handlePointerMove = useCallback(
    (e) => {
      if (!draggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const point = e.touches ? e.touches[0] : e;
      let pct = isHorizontal
        ? ((point.clientX - rect.left) / rect.width) * 100
        : ((point.clientY - rect.top) / rect.height) * 100;
      pct = Math.min(max, Math.max(min, pct));
      setFirstSize(pct);
    },
    [min, max, isHorizontal]
  );

  const stopDragging = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    setFirstSize((s) => {
      localStorage.setItem(storageKey, String(s));
      return s;
    });
  }, [storageKey]);

  const startDragging = useCallback(() => {
    draggingRef.current = true;
    document.body.style.cursor = isHorizontal ? "col-resize" : "row-resize";
    document.body.style.userSelect = "none";
  }, [isHorizontal]);

  useEffect(() => {
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchend", stopDragging);
    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
    };
  }, [handlePointerMove, stopDragging]);

  return (
    <div
      ref={containerRef}
      className={`flex w-full h-full min-h-0 ${isHorizontal ? "flex-row" : "flex-col"}`}
    >
      <div
        style={isHorizontal ? { width: `${firstSize}%` } : { height: `${firstSize}%` }}
        className="min-h-0 min-w-0 overflow-auto"
      >
        {left}
      </div>

      <div
        onMouseDown={startDragging}
        onTouchStart={startDragging}
        className={`relative shrink-0 group ${
          isHorizontal ? "w-1.5 cursor-col-resize" : "h-1.5 cursor-row-resize"
        }`}
      >
        <div
          className={`absolute bg-white/10 group-hover:bg-white/30 transition-colors ${
            isHorizontal
              ? "inset-y-0 left-1/2 -translate-x-1/2 w-px"
              : "inset-x-0 top-1/2 -translate-y-1/2 h-px"
          }`}
        />
      </div>

      <div
        style={
          isHorizontal
            ? { width: `${100 - firstSize}%` }
            : { height: `${100 - firstSize}%` }
        }
        className="min-h-0 min-w-0 overflow-hidden flex flex-col"
      >
        {right}
      </div>
    </div>
  );
}