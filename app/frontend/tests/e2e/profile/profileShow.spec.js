import { expect } from '@playwright/test';
import test from '../setupTest';

test.describe('when showing the current user profile', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/profiles/1');
    await page.waitForURL('/profiles/1');
  });

  test('should show their profile info, an edit button, an update avatar button', async ({
    page,
  }) => {
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

  test('should show the profile edit page when clicking the Edit button', async ({
    page,
  }) => {
    const userActions = page.getByTestId('profile-actions');
    await userActions.getByRole('button', { name: 'Edit' }).click();

    await expect(page.getByLabel('Username:')).toBeVisible();
    await expect(page.getByLabel('About Me:')).toBeVisible();

    await expect(page.getByRole('button', { name: 'Update' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Show' })).toBeVisible();
  });
});
