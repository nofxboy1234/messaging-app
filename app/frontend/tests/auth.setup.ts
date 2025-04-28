import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(
  import.meta.dirname,
  '../playwright/.auth/user.json',
);

setup('authenticate', async ({ page }) => {
  console.log('*** setup authenticated state ***');
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('/users/sign_in');
  await page.getByLabel('Email:').fill('user1@example.com');
  await page.getByLabel('Password:').fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  // await page.waitForURL('/');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByText('Profile (user1)')).toBeVisible();
  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});
