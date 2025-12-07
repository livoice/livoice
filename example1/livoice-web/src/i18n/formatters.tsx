function qualifiedLngFor(lng: string): string {
  switch (lng) {
    case 'ar':
      return 'ar-EG';
    case 'en':
      return 'en-GB';
    default:
      return lng;
  }
}

const formatPresets: Record<string, Intl.DateTimeFormatOptions> = {
  short: { dateStyle: 'short' },
  medium: { dateStyle: 'medium' },
  long: { dateStyle: 'long' }
};

export function datetime(value: Date | number | string | null | undefined, format?: string, lng?: string): string {
  if (value === null || value === undefined || value === '') return '—';

  const normalizedValue = value instanceof Date ? value : typeof value === 'number' ? new Date(value) : new Date(value);
  if (Number.isNaN(normalizedValue.getTime())) return '—';

  const normalizedLocale = lng ?? 'en';
  const normalizedFormat = format?.toLowerCase() ?? 'medium';
  const formatOptions = formatPresets[normalizedFormat] ?? formatPresets.medium;
  return new Intl.DateTimeFormat(qualifiedLngFor(normalizedLocale), formatOptions).format(normalizedValue);
}
