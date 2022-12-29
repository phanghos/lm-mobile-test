import numbro from 'numbro';
import { Hotel } from 'types';

export const formatCurrency = (amount: number) =>
  numbro(amount).formatCurrency({
    currencyPosition: 'prefix',
  });

export const formatAddress = ({ address, city }: Hotel['location']) =>
  `${address}, ${city}`;
