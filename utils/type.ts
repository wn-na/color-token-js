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
export type ColorPaletteKeys<T extends string> = ColorCode<T, ElementType<ColorPercent>> | T;
