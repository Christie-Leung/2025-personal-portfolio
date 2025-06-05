const normalize = (value: number, min: number, max: number): number => {
  return (value - min) / (max - min);
}

const interpolate = (normValue: number, min: number, max: number): number => {
  return min + (max - min) * normValue;
}

const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => {
  // clamp
  let v = value;
  if (v < inMin) v = inMin;
  if (v > inMax) v = inMax;
  const norm = normalize(v, inMin, inMax);
  return interpolate(norm, outMin, outMax);
}

export { normalize, interpolate, mapRange };