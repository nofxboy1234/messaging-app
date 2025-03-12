import { execSync } from 'child_process';

export default async () => {
  execSync('rails playwright:setup', { stdio: 'inherit' });
  console.log('reset the test database and load seeds');
};
