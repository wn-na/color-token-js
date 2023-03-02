import { hex2rgb, lab2rgb, rgb2hex, rgb2lab } from "./color";
import { ColorPaletteKeys, ColorPercent, generateColorCodeKey } from "./type";

export const generateColorPalette = <T extends string>(
  name: T,
  colorCode: string,
  reverse?: boolean
): Record<ColorPaletteKeys<T>, string> => {
  const rgb = hex2rgb(colorCode);
  if (!rgb) {
    throw new Error(`Color code is not vaild: ${colorCode}`);
  }

  const { R, G, B: b } = rgb;
  const { L, A, B } = rgb2lab({ R, G, B: b });
  return ColorPercent.reduce(
    (acc, cur) => ({
      ...acc,
      [generateColorCodeKey(name, cur)]: rgb2hex(lab2rgb({ L: L + (reverse ? -1 : 1) * L * (1 - 2 * (cur / 1000)), A, B })),
    }),
    {
      [name]: rgb2hex(rgb),
    } as unknown as Record<ColorPaletteKeys<T>, string>
  );
};
