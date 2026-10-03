import { test, expect } from '../../fixtures/test';
import { checkoutCustomer, products } from '../../test-data/checkout';
import { users } from '../../test-data/users';

test('customer can complete checkout @smoke', async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
  await inventoryPage.expectLoaded();

  await inventoryPage.addItem(products.backpack);
  await expect(inventoryPage.cartBadge).toHaveText('1');
  await inventoryPage.openCart();

  await cartPage.expectItem(products.backpack);
  await cartPage.checkout();
  await checkoutPage.provideCustomer(checkoutCustomer);
  await checkoutPage.finish();

  await checkoutPage.expectOrderComplete();
});
