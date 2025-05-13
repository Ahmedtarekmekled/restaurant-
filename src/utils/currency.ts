/**
 * Format a number as Egyptian Pounds
 * @param value - The numeric value to format
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export function formatEGP(
  value: number,
  options: {
    decimals?: number;
    useSymbol?: boolean;
    showZeroDecimals?: boolean;
  } = {}
): string {
  const { decimals = 2, useSymbol = true, showZeroDecimals = true } = options;

  // Format the number
  let formatted = value.toFixed(decimals);

  // Remove trailing zeros if not showing zero decimals
  if (!showZeroDecimals && formatted.endsWith(".00")) {
    formatted = formatted.replace(".00", "");
  }

  // Add the currency symbol (Egyptian Pound - ج.م)
  if (useSymbol) {
    formatted = `${formatted} ج.م`;
  }

  return formatted;
}
