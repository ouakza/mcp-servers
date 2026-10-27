#!/usr/bin/env node
import { serve, money } from './_shared.js';
import { calculatePayroll } from './payroll.js';

serve('mcp-payroll', '1.0.0', [
  {
    name: 'payroll_run',
    desc: 'Gross-to-net payroll estimate for hourly staff: hours worked, hourly rate, tax rate (%).',
    schema: { type: 'object', properties: { hours: { type: 'number' }, hourly_rate: { type: 'number' }, tax_rate: { type: 'number', description: 'Percent, e.g. 22' } }, required: ['hours', 'hourly_rate'] },
    handler: async ({ hours, hourly_rate, tax_rate = 22 }) => {
      const { gross, overtimePremium, tax, net } = calculatePayroll({
        hours,
        hourly_rate,
        tax_rate,
      });
      return { content: [{ type: 'text', text: `Gross: $${money(gross)}\nOvertime premium: $${overtimePremium}\nEst. tax (${tax_rate}%): $${money(tax)}\nNet pay: $${net}` }] };
    },
  },
  {
    name: 'payroll_invoice_total',
    desc: 'Total contractor payout for a list of {hours, rate} entries.',
    schema: { type: 'object', properties: { entries: { type: 'array', items: { type: 'object', properties: { hours: { type: 'number' }, rate: { type: 'number' } } } } }, required: ['entries'] },
    handler: async ({ entries }) => {
      const total = money(entries.reduce((s, e) => s + e.hours * e.rate, 0));
      return { content: [{ type: 'text', text: `Contractor total: $${total} across ${entries.length} entries` }] };
    },
  },
]);
