import { execSync, exec } from 'child_process';

export default async () => {
  execSync('rails playwright:setup', { stdio: 'inherit' });
};
