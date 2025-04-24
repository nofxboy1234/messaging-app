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

test('should show the current user profile when clicking on their username in the user index', async ({
  page,
}) => {
  const userIndex = page.getByTestId('user-index');
  await userIndex.getByRole('link', { name: 'user1' }).click();

  const profile = page.getByTestId('profile');
  await expect(profile.getByText('user1')).toBeVisible();
  await expect(profile.getByText('About Me:')).toBeVisible();

  const profileActions = page.getByTestId('profile-actions');
  await expect(
    profileActions.getByRole('button', { name: 'Edit' }),
  ).toBeVisible();
  await expect(
    profileActions.getByRole('link', { name: 'Update avatar' }),
  ).toBeVisible();
});

test('should show an outgoing friend profile when clicking on their username in the user index', async ({
  page,
}) => {
  const userIndex = page.getByTestId('user-index');
  await userIndex.getByRole('link', { name: 'user2' }).click();

  const profile = page.getByTestId('profile');
  await expect(profile.getByText('user2')).toBeVisible();
  await expect(profile.getByText('About Me:')).toBeVisible();

  const userActions = page.getByTestId('user-actions');
  await expect(
    userActions.getByRole('button', { name: 'Cancel' }),
  ).toBeVisible();
});

test('should show an incoming friend profile when clicking on their username in the user index', async ({
  page,
}) => {
  const userIndex = page.getByTestId('user-index');
  await userIndex.getByRole('link', { name: 'user3' }).click();

  const profile = page.getByTestId('profile');
  await expect(profile.getByText('user3')).toBeVisible();
  await expect(profile.getByText('About Me:')).toBeVisible();

  const userActions = page.getByTestId('user-actions');
  await expect(
    userActions.getByRole('button', { name: 'Accept' }),
  ).toBeVisible();
  await expect(
    userActions.getByRole('button', { name: 'Reject' }),
  ).toBeVisible();
});

test('should show a friend profile when clicking on their username in the user index', async ({
  page,
}) => {
  const userIndex = page.getByTestId('user-index');
  await userIndex.getByRole('link', { name: 'user4' }).click();

  const profile = page.getByTestId('profile');
  await expect(profile.getByText('user4')).toBeVisible();
  await expect(profile.getByText('About Me:')).toBeVisible();

  const userActions = page.getByTestId('user-actions');
  await expect(userActions.getByRole('button', { name: 'Chat' })).toBeVisible();
  await expect(
    userActions.getByRole('button', { name: 'Unfriend' }),
  ).toBeVisible();
});
