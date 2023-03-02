export const convertNumToHex = (num: number) => num?.toString(16).padStart(2, "0");
export function rangeElseDefault(from: number, to: number, value: number) {
  if (value > to) {
    return to;
  }
  if (from > value) {
    return from;
  }
  return value;
}

export const isRange = (from: number, to: number, value: number) => from <= value && value <= to;
