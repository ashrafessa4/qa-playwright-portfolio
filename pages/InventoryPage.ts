import { expect, type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly heading: Locator;
  readonly inventoryItems: Locator;
  readonly sortSelect: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.sortSelect = page.locator('[data-test="product-sort-container"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html$/);
    await expect(this.heading).toHaveText('Products');
    await expect(this.inventoryItems).not.toHaveCount(0);
  }

  async addItem(name: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: name });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortSelect.selectOption(value);
  }

  async prices(): Promise<number[]> {
    const labels = await this.page.locator('[data-test="inventory-item-price"]').allTextContents();
    return labels.map((price) => Number(price.replace('$', '')));
  }
}
