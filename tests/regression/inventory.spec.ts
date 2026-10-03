import { test, expect } from '../../fixtures/test';
import { users } from '../../test-data/users';

test.describe('Inventory @regression', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.expectLoaded();
  });

  test('sorts products by price from low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');

    const prices = await inventoryPage.prices();
    const expected = [...prices].sort((left, right) => left - right);

    expect(prices).toEqual(expected);
  });
});
