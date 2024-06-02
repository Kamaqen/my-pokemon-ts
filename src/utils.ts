export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function capitalize(str: string): string {
  str = str.toLowerCase();
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}
