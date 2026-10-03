import AxeBuilder from '@axe-core/playwright';

import { test, expect } from '../../fixtures/test';
import { users } from '../../test-data/users';

test('inventory has no critical WCAG A/AA violations @accessibility @regression', async ({
  page,
  loginPage,
  inventoryPage,
}) => {
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();

  const scan = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  const criticalViolations = scan.violations.filter(
    (violation) => violation.impact === 'critical',
  );

  expect(
    criticalViolations,
    criticalViolations
      .map((violation) => `${violation.id}: ${violation.help}`)
      .join('\n'),
  ).toEqual([]);
});
