import { test, expect } from '@playwright/test';
import { execSync } from 'child_process';

const setup_test_data = async () => {
  execSync('RAILS_ENV=test rails playwright:setup_test_data', {
    stdio: 'inherit',
  });
};

const cleanup_test_data = async () => {
  execSync('RAILS_ENV=test rails playwright:cleanup_test_data', {
    stdio: 'inherit',
  });
};

test.beforeEach(async ({ page }) => {
  await setup_test_data();

  await page.goto('/');
  await page.getByLabel('Email:').fill('user1@example.com');
  await page.getByLabel('Password:').fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
});

test.afterEach(async () => {
  await cleanup_test_data();
});

test.beforeEach(async ({ page }) => {
  await page.getByRole('link', { name: 'Friends' }).click();
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
