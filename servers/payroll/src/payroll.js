import { money } from './_shared.js';

export function calculatePayroll({ hours, hourly_rate, tax_rate = 22 }) {
  const basePay = money(hours * hourly_rate);
  const overtimePremium = hours > 40
    ? money(0.5 * hourly_rate * (hours - 40))
    : 0;
  const gross = money(basePay + overtimePremium);
  const tax = money(gross * tax_rate / 100);
  const net = money(gross - tax);

  return { gross, overtimePremium, tax, net };
}
