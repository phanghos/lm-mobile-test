import { Hotel } from 'types';

const currencyMap: Record<string, string> = {
  EUR: '€',
};

type FormatPriceParams = {
  amount: number;
  currency: string;
};

export const formatPrice = ({ amount, currency }: FormatPriceParams) =>
  `${currencyMap[currency] ?? ''}${amount}`;

export const formatAddress = ({ address, city }: Hotel['location']) =>
  `${address}, ${city}`;
