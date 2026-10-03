import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async expectItem(name: string): Promise<void> {
    await expect(this.cartItems.filter({ hasText: name })).toHaveCount(1);
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
