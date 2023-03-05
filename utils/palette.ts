import { hex2rgb, lab2rgb, rgb2hex, rgb2lab } from "./color";
import { ColorPaletteKeys, TonalPalettes, generateTonalPaletteCodeKey, ColorCalcuteOption } from "./type";

export const generateColorPalette = <T extends string>(
  name: T,
  colorCode: string,
  option: {
    reverse?: boolean;
    calcute?: ColorCalcuteOption;
  }
): Record<ColorPaletteKeys<T>, string> => {
  const rgb = hex2rgb(colorCode);
  if (!rgb) {
    throw new Error(`Color code is not vaild: ${colorCode}`);
  }

  const { R, G, B: b } = rgb;
  const { L, A, B } = rgb2lab({ R, G, B: b });
  return TonalPalettes.reduce(
    (acc, cur) => ({
      ...acc,
      [generateTonalPaletteCodeKey(name, cur)]: rgb2hex(
        lab2rgb({ L: L + (option?.reverse ? -1 : 1) * L * (1 - 2 * (cur / 1000)), A, B }),
        option?.calcute
      ),
    }),
    {
      [name]: rgb2hex(rgb),
    } as unknown as Record<ColorPaletteKeys<T>, string>
  );
};
