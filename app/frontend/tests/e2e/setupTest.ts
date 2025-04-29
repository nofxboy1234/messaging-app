import { execSync } from 'child_process';
import { test } from '@playwright/test';

const setup_test_data_except_users = async () => {
  execSync('RAILS_ENV=test rails playwright:setup_test_data_except_users', {
    stdio: 'inherit',
  });
};

const cleanup_test_data_except_users = async () => {
  execSync('RAILS_ENV=test rails playwright:cleanup_test_data_except_users', {
    stdio: 'inherit',
  });
};

test.beforeEach(async ({ page }) => {
  await setup_test_data_except_users();
});

test.afterEach(async () => {
  await cleanup_test_data_except_users();
});

export default test;
