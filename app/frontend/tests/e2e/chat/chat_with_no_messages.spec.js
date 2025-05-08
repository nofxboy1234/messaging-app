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

test.describe('when there are no messages', () => {
  let context;
  let page;

  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext({
      storageState: 'app/frontend/playwright/.auth/user.json',
    });
    page = await context.newPage();

    await setup_test_data_except_users();
    await page.goto('/chats/2');
    await page.waitForURL('/chats/2');
    await page.waitForLoadState();
  });

  test.afterEach(async () => {
    if (context) {
      await context.close();
      context = null;
    }
  });

  test('should show an empty chat', async () => {
    await expect(page.getByTestId('message')).toHaveCount(0);
  });
});
