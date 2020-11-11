export const getDateWithBackdays = (backdays = 30) => {
  const today = new Date();
  const priorDate = new Date().setDate(today.getDate() - backdays);

  return new Date(priorDate);
};

export const getFormattedDate = (date, options = {}) => {
  const { separator = '-', inverted = false } = options;
  const result = [];
  const localDate = new Date(date);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(
    localDate
  );
  const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(
    localDate
  );
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(
    localDate
  );

  result.push(year, month, day);

  return (inverted ? result.reverse() : result).join(separator);
};
