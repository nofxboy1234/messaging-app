import { expect, test } from '@playwright/test';
import { execSync } from 'child_process';

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
  await page.goto('/profiles/1/edit');
  await page.waitForURL('/profiles/1/edit');
});

test.afterEach(async () => {
  await cleanup_test_data_except_users();
});

test.describe('when the editing the current user profile', () => {
  test('should show inputs to update their profile info', async ({ page }) => {
    console.log('test 1/3');

    await expect(page.getByLabel('Username:')).toBeVisible();
    await expect(page.getByLabel('About Me:')).toBeVisible();

    await expect(page.getByRole('button', { name: 'Update' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Show' })).toBeVisible();
  });

  test('should update their profile info when clicking the Update button', async ({
    page,
  }) => {
    console.log('test 2/3');

    const usernameInput = page.getByLabel('Username:');
    await usernameInput.clear();
    await usernameInput.fill('updated username');

    const aboutMeInput = page.getByLabel('About Me:');
    await aboutMeInput.clear();
    await aboutMeInput.fill('updated about me');

    await page.getByRole('button', { name: 'Update' }).click();

    await expect(page.getByText('updated username')).toBeVisible();
    await expect(page.getByText('updated about me')).toBeVisible();
    await expect(
      page.getByText('Profile was successfully updated.'),
    ).toBeVisible();
  });

  test('should show their unchanged profile info when clicking the Show button', async ({
    page,
  }) => {
    console.log('test 3/3');

    const usernameInput = page.getByLabel('Username:');
    await usernameInput.clear();
    await usernameInput.fill('updated username');

    const aboutMeInput = page.getByLabel('About Me:');
    await aboutMeInput.clear();
    await aboutMeInput.fill('updated about me');

    await page.getByRole('button', { name: 'Show' }).click();

    await expect(page.getByRole('button', { name: 'Edit' })).toBeVisible();

    await expect(
      page.getByTestId('profile').getByText('updated username'),
    ).not.toBeVisible();
    await expect(
      page.getByTestId('profile').getByText('updated about me'),
    ).not.toBeVisible();
    await expect(
      page.getByText('Profile was successfully updated.'),
    ).not.toBeVisible();
  });
});
