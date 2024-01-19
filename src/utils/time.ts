/* convert 1500s to '25:00' */
export function timeToString(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m >= 10 ? m : `0${m}`}:${s >= 10 ? s : `0${s}`}`;
}
