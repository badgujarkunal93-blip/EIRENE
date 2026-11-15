/**
 * EIRENE Environment Verification Tool
 * Validates that all required environment variables are set before starting the servers.
 */

const fs = require('fs');
const path = require('path');

const requiredBackendKeys = [
  'JWT_SECRET',
  'JWT_EXPIRATION',
  'DB_HOST',
  'DB_PORT',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_NAME',
  'AWS_REGION',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'S3_BACKUP_BUCKET',
];

function checkFile(filePath, keys) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing file: ${filePath}`);
    return false;
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  let missing = [];
  keys.forEach((key) => {
    const regex = new RegExp(`^${key}=.+`, 'm');
    if (!regex.test(content)) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    console.error(`❌ ${filePath} is missing required keys: ${missing.join(', ')}`);
    return false;
  }
  console.log(`✅ ${filePath} is valid.`);
  return true;
}

console.log('--- Verifying EIRENE Environment ---');
const backendOk = checkFile(path.join(__dirname, '..', 'backend', '.env'), requiredBackendKeys);
const frontendOk = fs.existsSync(path.join(__dirname, '..', 'frontend', '.env'));

if (backendOk && frontendOk) {
  console.log('🎉 Environment ready for launch!');
  process.exit(0);
} else {
  console.error('⚠️ Please fix environment variables before continuing.');
  process.exit(1);
}
