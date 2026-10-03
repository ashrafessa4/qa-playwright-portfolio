import { test, expect } from '../../fixtures/test';
import { users } from '../../test-data/users';

test.describe('Authentication @smoke', () => {
  test('standard user can sign in', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await inventoryPage.expectLoaded();
  });

  test('locked-out user sees a useful error', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out');
  });
});
