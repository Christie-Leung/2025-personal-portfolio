import React, { ElementType, useEffect, useMemo, useRef, useState } from "react";
import Heading from "./Heading";

type TypewriterProps = {
  text: string;
  as?: ElementType;                  // e.g., "span" | "p" | "li" | "code"
  className?: string;
  speed?: number;                    // chars per second
  startDelayMs?: number;             // optional stagger
  preserveWhitespace?: boolean;      // for code blocks
  disabled?: boolean;
  onDone?: () => void;
};

export default function Typewriter({
  text,
  as: Tag = "span",
  className,
  speed = 32,
  startDelayMs = 0,
  preserveWhitespace = false,
  disabled = false,
  onDone,
}: TypewriterProps) {
  // Split by Unicode code points (keeps emojis/accents intact)
  const chars = useMemo(() => Array.from(text ?? ""), [text]);

  const [visible, setVisible] = useState(disabled ? chars.length : 0);
  const rafRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  // Reset on text change
  useEffect(() => {
    if (disabled) return;

    setVisible(0);
    startedRef.current = false;
  }, [text, speed, startDelayMs]);

  useEffect(() => {
    let startAt: number | null = null;
    const total = chars.length;

    const step = (t: number) => {
      if (startAt === null) {
        startAt = t + startDelayMs;
      }
      const elapsed = t - startAt;

      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      // advance by cps
      const cps = speed;
      const next = Math.min(total, Math.floor((elapsed / 1000) * cps));
      setVisible((prev) => (next > prev ? next : prev));

      if (next < total) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        onDone?.();
      }
    };

    // avoid hydration mismatch: start empty on client, let server HTML be ignored
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [chars, speed, startDelayMs, onDone]);

  return (
    <Tag
      className={`${preserveWhitespace ? "whitespace-pre-wrap" : ""} ${className ?? ""}`}
      suppressHydrationWarning
      aria-live="polite"
    >
      {disabled ? text : chars.slice(0, visible).join("")}
    </Tag>
  );
}
