import { hex2rgb } from "./color";

/**
 *
 * @param rgb hex code like `#cdcdcd` or `cdcdcd`
 * @returns return color brightness
 *
 * - notice: use `YUV` color model
 */
export const brightness = (code: string) => {
  const rgb = hex2rgb(code);
  if (!rgb) return undefined;

  return (rgb.R / 255.0) * 0.3 + (rgb.G / 255.0) * 0.59 + (rgb.B / 255.0) * 0.11;
};
