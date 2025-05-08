import { expect, test } from '@playwright/test';
import { execSync } from 'child_process';

const setup_test_data_except_users = async () => {
  return new Promise((resolve) => {
    execSync('RAILS_ENV=test rails playwright:setup_test_data_except_users', {
      stdio: 'inherit',
    });
    resolve();
  });
};

let context;
let page;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext({
    storageState: 'app/frontend/playwright/.auth/user.json',
  });
  page = await context.newPage();

  await setup_test_data_except_users();
  await page.goto('/friend_categories');
  await page.waitForURL('/friend_categories');
  await page.waitForLoadState();
});

test.afterEach(async () => {
  if (context) {
    await context.close();
    context = null;
  }
});

test('should show All and Pending friends links', async () => {
  await expect(page.getByText('Friends:')).toBeVisible();
  await expect(page.getByRole('link', { name: 'All' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Pending' })).toBeVisible();
});

test('should show all friends when clicking All', async () => {
  await page.getByRole('link', { name: 'All' }).click();

  await expect(page.getByText('ALL FRIENDS-2')).toBeVisible();
});

test('should show outgoing and incoming requests when clicking Pending', async () => {
  await page.getByRole('link', { name: 'Pending' }).click();

  await expect(page.getByText('Outgoing Friend Requests')).toBeVisible();
  await expect(page.getByText('Incoming Friend Requests')).toBeVisible();
});
