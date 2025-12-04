export const datetime = (value: unknown, format?: string) => {
  if (!value) return '';
  const date = new Date(value as string | number);
  if (Number.isNaN(date.getTime())) return '';
  if (format === 'short') {
    return date.toLocaleDateString();
  }
  return date.toLocaleString();
};
