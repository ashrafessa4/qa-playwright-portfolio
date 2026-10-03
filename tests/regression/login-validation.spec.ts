import { test, expect } from '../../fixtures/test';
import { invalidLoginCases } from '../../test-data/users';

test.describe('Login validation @regression', () => {
  for (const loginCase of invalidLoginCases) {
    test(loginCase.name, async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.login(loginCase.username, loginCase.password);

      await expect(loginPage.errorMessage).toContainText(loginCase.expectedError);
    });
  }
});
