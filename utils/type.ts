export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer U> ? U : never;

export type RGBValue = {
  R: number;
  G: number;
  B: number;
};

export type HSLValue = {
  H: number;
  S: number;
  L: number;
};

export type LABValue = {
  L: number;
  A: number;
  B: number;
};

export const ColorPercent = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export type ColorPercent = typeof ColorPercent;

export type ColorCode<T extends string, U extends string | number> = `${T}${U}`;
export const generateColorCodeKey = (key: string, value: ElementType<ColorPercent>) => `${key}${value}`;
export type ColorPaletteKeys<T extends string> = ColorCode<T, ElementType<ColorPercent>> | T;

export const HEX_CODE_REG = /^#?([A-Fa-f0-9]{6})$/;
export const getHexColorCode = (color: string): string | undefined => HEX_CODE_REG.exec(color)?.[1];
export type ColorCalcuteOption = "floor" | "ceil" | "round";
export const ColorCalcute = (option?: ColorCalcuteOption) => Math?.[option || "floor"];
