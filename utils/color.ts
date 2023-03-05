import {
  HSLValue,
  RGBValue,
  LABValue,
  ColorCalcuteOption,
  ColorCalcute,
  getHexColorCode,
  CMYKValue,
  YIQValue,
  YUVValue,
  YCbCrValue,
} from "./type";
import { convertNumToHex, rangeElseDefault } from "./utils";

export function hsl2rgb({ H: h, S: s, L: l }: HSLValue): RGBValue {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60.0;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  const m = l - c * 0.5;

  let rgb1 = [0, 0, 0];
  if (isNaN(h)) {
    rgb1 = [0, 0, 0];
  } else if (hp <= 1) {
    rgb1 = [c, x, 0];
  } else if (hp <= 2) {
    rgb1 = [x, c, 0];
  } else if (hp <= 3) {
    rgb1 = [0, c, x];
  } else if (hp <= 4) {
    rgb1 = [0, x, c];
  } else if (hp <= 5) {
    rgb1 = [x, 0, c];
  } else if (hp <= 6) {
    rgb1 = [c, 0, x];
  }
  return {
    R: 255 * (rgb1[0] + m),
    G: 255 * (rgb1[1] + m),
    B: 255 * (rgb1[2] + m),
  };
}

export function hsl2hex({ H, S, L }: HSLValue, option?: ColorCalcuteOption): string {
  const rgb = hsl2rgb({ H, S, L });
  return rgb2hex(rgb, option);
}

export function rgb2hsl({ R, G, B }: RGBValue): HSLValue {
  R /= 255;
  G /= 255;
  B /= 255;
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const d = max - min;
  let h = 0;
  if (max === R) {
    h = ((G - B) / d) % 6;
  } else if (max === G) {
    h = (B - R) / d + 2;
  } else if (max === B) {
    h = (R - G) / d + 4;
  }
  const L = (min + max) / 2;
  const S = d === 0 ? 0 : d / (1 - Math.abs(2 * L - 1));
  return { H: h * 60, S, L };
}

export function hex2rgb(hex: string): RGBValue | undefined {
  const code = getHexColorCode(hex);
  if (!code) return undefined;
  const bigint = parseInt(code, 16);
  const R = (bigint >> 16) & 255;
  const G = (bigint >> 8) & 255;
  const B = bigint & 255;

  return { R, G, B };
}

export function lab2rgb({ L, A, B }: LABValue): RGBValue {
  let y = (L + 16) / 116;
  let x = A / 500 + y;
  let z = y - B / 200;

  x = 0.95047 * (x * x * x > 0.008856 ? x * x * x : (x - 16 / 116) / 7.787);
  y = 1.0 * (y * y * y > 0.008856 ? y * y * y : (y - 16 / 116) / 7.787);
  z = 1.08883 * (z * z * z > 0.008856 ? z * z * z : (z - 16 / 116) / 7.787);

  let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  let b = x * 0.0557 + y * -0.204 + z * 1.057;

  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
  b = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;

  return {
    R: rangeElseDefault(0, 1, r) * 255,
    G: rangeElseDefault(0, 1, g) * 255,
    B: rangeElseDefault(0, 1, b) * 255,
  };
}

export function rgb2lab({ R, G, B }: RGBValue): LABValue {
  let r = R / 255;
  let g = G / 255;
  let b = B / 255;

  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  let y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0;
  let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

  return { L: 116 * y - 16, A: 500 * (x - y), B: 200 * (y - z) };
}

export function rgb2hex({ R, G, B }: RGBValue, option?: ColorCalcuteOption): string {
  return `#${convertNumToHex(ColorCalcute(option)(R))}${convertNumToHex(ColorCalcute(option)(G))}${convertNumToHex(
    ColorCalcute(option)(B)
  )}`;
}

export function rgb2cmyk({ R, G, B }: RGBValue): CMYKValue {
  R = R / 255;
  G = G / 255;
  B = B / 255;
  const K = 1 - Math.max(R, G, B);
  const C = (1 - R - K) / (1 - K);
  const M = (1 - G - K) / (1 - K);
  const Y = (1 - B - K) / (1 - K);
  return { C, M, Y, K };
}

export function cmyk2rgb({ C, M, Y, K }: CMYKValue): RGBValue {
  const R = (1 - C) * (1 - K) * 255;
  const G = (1 - M) * (1 - K) * 255;
  const B = (1 - Y) * (1 - K) * 255;
  return { R, G, B };
}

export function rgb2yiq({ R, G, B }: RGBValue): YIQValue {
  const Y = 0.299 * R + 0.587 * G + 0.114 * B;
  const I = 0.596 * R - 0.274 * G - 0.322 * B;
  const Q = 0.211 * R - 0.523 * G + 0.312 * B;
  return { Y, I, Q };
}

export function yiq2rgb({ Y, I, Q }: YIQValue): RGBValue {
  const R = 1.0 * Y + 0.956 * I + 0.621 * Q;
  const G = 1.0 * Y - 0.273 * I - 0.647 * Q;
  const B = 1.0 * Y - 1.104 * I + 1.701 * Q;
  return { R, G, B };
}

export function rgb2yuv({ R, G, B }: RGBValue): YUVValue {
  const Y = 0.257 * R + 0.504 * G + 0.098 * B + 16;
  const U = -1 * (0.148 * R) - 0.291 * G + 0.439 * B + 128;
  const V = 0.439 * R - 0.368 * G - 0.071 * B + 128;
  return { Y, U, V };
}

export function yuv2rgb({ Y, U, V }: YUVValue): RGBValue {
  const R = 1.164 * (Y - 16) + 1.596 * (V - 128);
  const G = 1.164 * (Y - 16) - 0.813 * (V - 128) - 0.391 * (U - 128);
  const B = 1.164 * (Y - 16) + 2.018 * (U - 128);
  return { R, G, B };
}

export function rgb2ycbcr({ R, G, B }: RGBValue): YCbCrValue {
  const Y = 0.299 * R + 0.587 * G + 0.114 * B;
  const Cb = -1 * 0.16874 * R - 0.33126 * G + 0.5 * B;
  const Cr = 0.5 * R - 0.41869 * G - 0.0813 * B;
  return { Y, Cb, Cr };
}

export function ycbcr2rgb({ Y, Cb, Cr }: YCbCrValue): RGBValue {
  const R = 1.0 * Y + 1.402 * Cr;
  const G = 1.0 * Y - 0.34424 * Cb - 0.71414 * Cr;
  const B = 1.0 * Y + 1.772 * Cb;
  return { R, G, B };
}
