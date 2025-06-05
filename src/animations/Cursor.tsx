// Cursor.tsx (or Cursor.jsx)
import { useEffect } from "react";

import gsap from "gsap";

export default function Cursor() {
  useEffect(() => {
    gsap.set(".cursor", { xPercent: -50, yPercent: -50 });
    const xSetter = gsap.quickSetter(".cursor", "x", "px");
    const ySetter = gsap.quickSetter(".cursor", "y", "px");

    const handleMouseMove = (e: MouseEvent) => {
      xSetter(e.clientX);
      ySetter(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="cursor animation" />
    </>
  );
}
