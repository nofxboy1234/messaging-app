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

test.describe('when clicking on the Log out button', () => {
  test('should show the login page with a flash message', async ({ page }) => {
    await page.getByRole('button', { name: 'Log out' }).click();

    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    await expect(page.getByText('Signed out successfully.')).toBeVisible();
  });
});
