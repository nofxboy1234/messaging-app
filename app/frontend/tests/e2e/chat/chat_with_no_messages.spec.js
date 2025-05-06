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
  test('should show an empty chat', async ({ page }) => {
    await setup_test_data_except_users();
    await page.goto('/chats/2');
    await page.waitForURL('/chats/2');
    await page.waitForLoadState();

    await expect(page.getByTestId('message')).toHaveCount(0);
  });
});
