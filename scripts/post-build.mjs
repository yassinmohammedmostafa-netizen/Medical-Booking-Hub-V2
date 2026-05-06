import fs from 'fs';
import path from 'path';

const source = path.resolve('artifacts/esaal/dist/public');
const destination = path.resolve('public');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

try {
  console.log(`[POST-BUILD] Copying frontend from ${source} to ${destination}...`);
  if (!fs.existsSync(source)) {
    console.error(`[POST-BUILD] Source directory not found: ${source}`);
    process.exit(1);
  }
  copyRecursiveSync(source, destination);
  console.log('[POST-BUILD] Done!');
} catch (err) {
  console.error('[POST-BUILD] Error:', err);
  process.exit(1);
}
