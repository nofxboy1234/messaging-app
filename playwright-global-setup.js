import { execSync } from 'child_process';

export default async () => {
  execSync('RAILS_ENV=test rails playwright:setup', { stdio: 'inherit' });
};
