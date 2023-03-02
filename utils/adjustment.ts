import { hex2rgb, hsl2hex, rgb2hsl } from "./color";
import { ColorCalcute, ColorCalcuteOption, getHexColorCode } from "./type";
import { convertNumToHex, isRange } from "./utils";
/**
 * @param rgb hex code like `#cdcdcd` or `cdcdcd`
 * @param alpha `0 ~ 1`
 * @param option (optional) select mode in calculate alpha value 'floor' | 'ceil' | 'round'
 *
 *  - default `floor`
 *
 * @returns rgba format `#cdcdcd00`
 */
const opacity = (rgb: string, alpha: number, option?: ColorCalcuteOption): string | undefined => {
  const hex = getHexColorCode(rgb);
  if (!hex) return undefined;
  if (!isRange(0, 1, alpha)) return undefined;

  return `#${hex}${convertNumToHex(ColorCalcute(option)(alpha * 255))}`;
};

/**
 * @param rgb hex code like `#cdcdcd` or `cdcdcd`
 * @param range `-1 ~ 1`
 * @param option (optional) select mode in calculate alpha value 'floor' | 'ceil' | 'round'
 *
 *  - default `floor`
 *
 * @returns rgb format `#cdcdcd`
 */
function brightness(rgb: string, range: number, option?: ColorCalcuteOption): string | undefined {
  const hex = hex2rgb(rgb);
  if (!hex) return undefined;
  if (!isRange(-1, 1, range)) return undefined;

  const hsl = rgb2hsl(hex);
  hsl.L = range;
  return hsl2hex(hsl, option);
}

/**
 * @param colorA hex code like `#cdcdcd` or `cdcdcd`
 * @param colorB hex code like `#cdcdcd` or `cdcdcd`
 * @param percent mixing percent `0 ~ 1`
 * @param option (optional) select mode in calculate alpha value 'floor' | 'ceil' | 'round'
 *
 *  - default `floor`
 *
 * @returns rgb format `#cdcdcd`
 */
function blendColors(colorA: string, colorB: string, percent: number, option?: ColorCalcuteOption): string | undefined {
  if (!isRange(0, 1, percent)) return undefined;
  const rgbA = hex2rgb(colorA);
  const rgbB = hex2rgb(colorB);
  if (!rgbA || !rgbB) return undefined;

  const R = ColorCalcute(option)(rgbA.R + (rgbB.R - rgbA.R) * percent);
  const G = ColorCalcute(option)(rgbA.G + (rgbB.G - rgbA.G) * percent);
  const B = ColorCalcute(option)(rgbA.B + (rgbB.B - rgbA.B) * percent);

  return `#${convertNumToHex(R)}${convertNumToHex(G)}${convertNumToHex(B)}`;
}

export { brightness, blendColors, opacity };
