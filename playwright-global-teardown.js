import { execSync } from 'child_process';

export default async () => {
  return new Promise((resolve, reject) => {
    execSync('RAILS_ENV=test rails playwright:teardown', { stdio: 'inherit' });
    resolve();
  });
};
