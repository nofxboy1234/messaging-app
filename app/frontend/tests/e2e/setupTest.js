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

function setupTest(
  beforeEachCallback = async () => {},
  afterEachCallback = async () => {},
) {
  test.beforeEach(async ({ page }) => {
    await setup_test_data_except_users();
    await beforeEachCallback({ page });
  });

  test.afterEach(async ({ page }) => {
    await cleanup_test_data_except_users();
    await afterEachCallback({ page });
  });

  return test;
}

export default setupTest;
