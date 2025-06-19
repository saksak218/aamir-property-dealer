// utils/formatToLakhCrore.js
export const formatToLakhCrore = (amount: number, includeCurrency = true) => {
  if (isNaN(amount) || amount === null) return "Invalid Amount";

  const absAmount = Math.abs(amount);
  let formatted = "";
  const prefix = includeCurrency ? "Rs " : "";

  if (absAmount >= 10000000) {
    // Crores (1 Cr = 10000000)
    const crores = absAmount / 10000000;
    formatted = `${crores % 1 === 0 ? crores : crores.toFixed(1)} Cr`;
  } else if (absAmount >= 100000) {
    // Lakhs (1 Lakh = 100000)
    const lakhs = absAmount / 100000;
    formatted = `${lakhs % 1 === 0 ? lakhs : lakhs.toFixed(1)} Lakh`;
  } else {
    // Below 1 Lakh, use standard formatting
    formatted = new Intl.NumberFormat("en-PK").format(absAmount);
  }

  return `${amount < 0 ? "-" : ""}${prefix}${formatted}`;
};
