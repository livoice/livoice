export const secondsFromDuration = (duration?: number | string | null) => {
  if (!duration) return null;
  if (typeof duration === 'number') return duration;
  const parsed = Number.parseInt(duration, 10);
  return Number.isNaN(parsed) ? null : parsed;
};
