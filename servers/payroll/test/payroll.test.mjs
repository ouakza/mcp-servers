import assert from 'node:assert/strict';
import { test } from 'node:test';

import { calculatePayroll } from '../src/payroll.js';

test('40 hours has no overtime premium', () => {
  assert.deepEqual(
    calculatePayroll({ hours: 40, hourly_rate: 20, tax_rate: 20 }),
    { gross: 800, overtimePremium: 0, tax: 160, net: 640 },
  );
});

test('45 hours includes overtime premium in gross pay and tax', () => {
  assert.deepEqual(
    calculatePayroll({ hours: 45, hourly_rate: 20, tax_rate: 20 }),
    { gross: 950, overtimePremium: 50, tax: 190, net: 760 },
  );
});

test('zero hours produces zero pay and tax', () => {
  assert.deepEqual(
    calculatePayroll({ hours: 0, hourly_rate: 20, tax_rate: 20 }),
    { gross: 0, overtimePremium: 0, tax: 0, net: 0 },
  );
});

test('omitted tax rate defaults to 22 percent', () => {
  assert.deepEqual(
    calculatePayroll({ hours: 45, hourly_rate: 20 }),
    { gross: 950, overtimePremium: 50, tax: 209, net: 741 },
  );
});
