import { hex2rgb, lab2rgb, rgb2hex, rgb2lab } from "./color";
import { ColorPaletteKeys, TonalPalettes, generateTonalPaletteCodeKey, ColorCalcuteOption, RGBValue } from "./type";
import { rangeElseDefault } from "./utils";

type TonesOption = "LINER_LIGHTNESS" | "CUBIC_LIGHTNESS";
export const createTonalPalettes = <T extends string>(
  name: T,
  colorCode: string,
  option?: {
    reverse?: boolean;
    calcute?: ColorCalcuteOption;
    tones?: TonesOption;
  }
): Record<ColorPaletteKeys<T>, string> => {
  const rgb = hex2rgb(colorCode);
  if (!rgb) {
    throw new Error(`Color code is not vaild: ${colorCode}`);
  }

  const convertFunc = (value: number): RGBValue => {
    const tones = option?.tones || "LINER_LIGHTNESS";
    switch (tones) {
      case "LINER_LIGHTNESS":
        return lab2rgb({ L: rangeElseDefault(0, 100, L + (option?.reverse ? -1 : 1) * L * (1 - 2 * (value / 1000))), A, B });
      case "CUBIC_LIGHTNESS":
        const midValue = 1 - 2 * (value / 1000);
        return lab2rgb({ L: rangeElseDefault(0, 100, L + (option?.reverse ? -1 : 1) * L * midValue * midValue * midValue), A, B });
    }
  };

  const { R, G, B: b } = rgb;
  const { L, A, B } = rgb2lab({ R, G, B: b });
  return TonalPalettes.reduce(
    (acc, cur) => ({
      ...acc,
      [generateTonalPaletteCodeKey(name, cur)]: rgb2hex(convertFunc(cur), option?.calcute),
    }),
    {
      [name]: rgb2hex(rgb),
    } as unknown as Record<ColorPaletteKeys<T>, string>
  );
};

/** @deprecated use `createTonalPalettes` instand */
export const generateColorPalette = createTonalPalettes;
