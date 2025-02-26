export function getDiscountPercentage(originalPrice: string, currentPrice: string): number | null {
  const regex = /<del.*?>.*?<bdi>([\d,۰-۹,]+).*?<\/bdi>/;
  const match: RegExpMatchArray | null = originalPrice.match(regex);
  if (match) {
    const matchSplit = match[1].split(',').join('');
    const originalNumber = Number(matchSplit.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString()));
    const currentNumber = Number(currentPrice.replace(/,/g, '').replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString()));
    return Math.round(((originalNumber - currentNumber) / originalNumber) * 100);
  }
  return null;
}
