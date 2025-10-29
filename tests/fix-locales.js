import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesDir = path.join(__dirname, '..', 'i18n', 'locales');
const referenceFile = path.join(localesDir, 'en.json');

// Read reference file
const reference = JSON.parse(fs.readFileSync(referenceFile, 'utf8'));

// Get all keys from reference
function getAllKeys(obj, prefix = '') {
  const keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys.push(...getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

// Get value from nested object
function getValue(obj, path) {
  return path.split('.').reduce((curr, key) => curr?.[key], obj);
}

// Set value in nested object
function setValue(obj, path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((curr, key) => {
    if (!curr[key]) curr[key] = {};
    return curr[key];
  }, obj);
  target[lastKey] = value;
}

// Delete value from nested object
function deleteValue(obj, path) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((curr, key) => curr?.[key], obj);
  if (target) {
    delete target[lastKey];
  }
}

// Get all locale files except reference
const localeFiles = fs.readdirSync(localesDir)
  .filter(f => f.endsWith('.json') && f !== 'en.json')
  .map(f => path.join(localesDir, f));

const referenceKeys = getAllKeys(reference);

console.log('🔧 Fixing locale files...\n');

localeFiles.forEach(filePath => {
  const fileName = path.basename(filePath);
  console.log(`📝 Processing ${fileName}...`);

  const locale = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const localeKeys = getAllKeys(locale);

  // Find missing keys
  const missingKeys = referenceKeys.filter(key => !localeKeys.includes(key));

  // Find extra keys
  const extraKeys = localeKeys.filter(key => !referenceKeys.includes(key));

  // Add missing keys with English values
  missingKeys.forEach(key => {
    const value = getValue(reference, key);
    setValue(locale, key, value);
  });

  // Remove extra keys
  extraKeys.forEach(key => {
    deleteValue(locale, key);
  });

  // Write back to file
  fs.writeFileSync(filePath, JSON.stringify(locale, null, 2) + '\n', 'utf8');

  console.log(`  ✅ Added ${missingKeys.length} missing keys`);
  console.log(`  ✅ Removed ${extraKeys.length} extra keys`);
  console.log();
});

console.log('✨ All locale files fixed!');
