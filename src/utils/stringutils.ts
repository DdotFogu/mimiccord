export const truncate = (str: string, max: number) =>
  str.length > max ? str.slice(0, max).trimEnd() + "…" : str;

export const getEventPfpUrl = (
  e: React.ChangeEvent<HTMLInputElement>,
): string | undefined => {
  const file = (e as React.ChangeEvent<HTMLInputElement>).target.files?.[0];
  if (!file) return;

  return URL.createObjectURL(file);
};
