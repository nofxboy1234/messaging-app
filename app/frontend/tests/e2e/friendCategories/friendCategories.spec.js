import { expect } from '@playwright/test';
import test from '../setupTest';

test.beforeEach(async ({ page }) => {
  await page.goto('/friend_categories');
  await page.waitForURL('/friend_categories');
});

test('should show All and Pending friends links', async ({ page }) => {
  await expect(page.getByText('Friends:')).toBeVisible();
  await expect(page.getByRole('link', { name: 'All' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Pending' })).toBeVisible();
});

test('should show all friends when clicking All', async ({ page }) => {
  await page.getByRole('link', { name: 'All' }).click();

  await expect(page.getByText('ALL FRIENDS-2')).toBeVisible();
});

test('should show outgoing and incoming requests when clicking Pending', async ({
  page,
}) => {
  await page.getByRole('link', { name: 'Pending' }).click();

  await expect(page.getByText('Outgoing Friend Requests')).toBeVisible();
  await expect(page.getByText('Incoming Friend Requests')).toBeVisible();
});
