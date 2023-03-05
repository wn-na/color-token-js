import { hex2rgb, rgb2hsl, rgb2yiq, rgb2yuv } from "./color";

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

  return rgb2yuv(rgb).Y;
};

/**
 *
 * @param rgb hex code like `#cdcdcd` or `cdcdcd`
 * @returns return color luminance
 *
 * - notice: use `YIQ` color model
 */
export const luminance = (code: string) => {
  const rgb = hex2rgb(code);
  if (!rgb) return undefined;

  return rgb2yiq(rgb).Y;
};

export const saturation = (code: string) => {
  const rgb = hex2rgb(code);
  if (!rgb) return undefined;

  return rgb2hsl(rgb).S;
};
