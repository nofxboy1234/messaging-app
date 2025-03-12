import { execSync } from 'child_process';

export default async () => {
  execSync('rails playwright:teardown', { stdio: 'inherit' });
};
