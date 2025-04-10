function formatCurrency(value) {
  if (value === null || value === undefined || value === 0) return "$0";

  const absValue = Math.abs(value);
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 1,
  });

  if (absValue >= 1_000_000_000) {
    return formatter.format(value / 1_000_000_000) + "B";
  } else if (absValue >= 1_000_000) {
    return formatter.format(value / 1_000_000) + "M";
  } else if (absValue >= 1_000) {
    return formatter.format(value / 1_000) + "K";
  } else {
    return formatter.format(value);
  }
}

export default formatCurrency;
