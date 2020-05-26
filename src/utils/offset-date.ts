export default function offsetDate(opts = {}, date = new Date()): Date {
  const options = Object.assign({ minutes: 0, hours: 0, days: 1 }, opts);
  const timestamp = date.getTime();
  const minutesOffset = options.minutes * 60 * 1000;
  const hoursOffset = options.hours * 60 * 60 * 1000;
  const daysOffset = options.days * 24 * 60 * 60 * 1000;

  return new Date(timestamp + (minutesOffset + hoursOffset + daysOffset));
};
