import { execSync } from 'child_process';

try {
  execSync('npm run clean', { stdio: 'inherit' });
  execSync('npm run copy-files', { stdio: 'inherit' });
  execSync('npm run ts', { stdio: 'inherit' });
  execSync('tsc-alias', { stdio: 'inherit' });
  execSync('npm run up', { stdio: 'inherit' });
  execSync('npm run packaging', { stdio: 'inherit' });
} catch (e) {
  console.error(e);
}
