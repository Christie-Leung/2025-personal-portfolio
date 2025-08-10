import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function stringToPastelColor(input: string): string {
  return stringToHexColor(input, {
    satRange: [35, 55],
    lightRange: [70, 90]
  })
}

export function stringToHexColor(
  input: string,
  opts?: {
    // Saturation and lightness ranges (in %, inclusive)
    satRange?: [min: number, max: number];
    lightRange?: [min: number, max: number];
  }
): string {
  const satRange = opts?.satRange ?? [55, 75];   // pleasant saturation
  const lightRange = opts?.lightRange ?? [45, 60]; // readable lightness

  const h = fnv1a(input) % 360;
  const s = rangeFromHash(fnv1a(input + "::s"), satRange);
  const l = rangeFromHash(fnv1a(input + "::l"), lightRange);

  return hslToHex(h, s, l);
}

/** FNV-1a 32-bit hash (unsigned) */
function fnv1a(str: string): number {
  let h = 0x811c9dc5; // offset basis
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193); // FNV prime
  }
  return h >>> 0; // unsigned
}

function rangeFromHash(hash: number, [min, max]: [number, number]): number {
  if (max <= min) return min;
  const span = max - min;
  return min + (hash % (span + 1));
}

/** Convert HSL (0-360, 0-100, 0-100) to #RRGGBB */
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const k = (h / 60) % 6;
  const x = c * (1 - Math.abs((k % 2) - 1));
  let r = 0, g = 0, b = 0;

  if (0 <= k && k < 1) [r, g, b] = [c, x, 0];
  else if (1 <= k && k < 2) [r, g, b] = [x, c, 0];
  else if (2 <= k && k < 3) [r, g, b] = [0, c, x];
  else if (3 <= k && k < 4) [r, g, b] = [0, x, c];
  else if (4 <= k && k < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const m = l - c / 2;
  const to255 = (v: number) => Math.round((v + m) * 255);
  const hex = (n: number) => n.toString(16).padStart(2, "0");

  return `#${hex(to255(r))}${hex(to255(g))}${hex(to255(b))}`;
}

export const getDarkerShade = (hex: string, percent: number = 20) => {
    const sanitized = hex.replace("#", "");
    const num = parseInt(sanitized, 16);
    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;

    const amt = Math.round(2.55 * percent);
    r = Math.max(r - amt, 0);
    g = Math.max(g - amt, 0);
    b = Math.max(b - amt, 0);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)}`;
  };