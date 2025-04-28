import { execSync } from 'child_process';
import { test } from '@playwright/test';

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
});

test.afterEach(async () => {
  await cleanup_test_data();
});

export default test;
