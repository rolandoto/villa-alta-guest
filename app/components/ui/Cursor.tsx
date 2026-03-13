"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cx = 0, cy = 0, rx = 0, ry = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => { cx = e.clientX; cy = e.clientY; };
    const onDown = () => ringRef.current?.classList.add("clicking");
    const onUp = () => ringRef.current?.classList.remove("clicking");

    const animate = () => {
      rx += (cx - rx) * 0.1;
      ry += (cy - ry) * 0.1;
      if (dotRef.current) dotRef.current.style.transform = `translate(${cx}px,${cy}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    const addHover = () => {
      document.querySelectorAll("a,button,[data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", () => ringRef.current?.classList.add("hovered"));
        el.addEventListener("mouseleave", () => ringRef.current?.classList.remove("hovered"));
      });
    };

    raf = requestAnimationFrame(animate);
    addHover();

    const observer = new MutationObserver(addHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ transform: "translate(-50%,-50%)" }} />
      <div ref={ringRef} className="cursor-ring" style={{ transform: "translate(-50%,-50%)" }} />
    </>
  );
}
