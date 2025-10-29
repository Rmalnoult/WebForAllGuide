import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Count all keys in a nested object recursively
 */
function countKeys(obj) {
  let count = 0;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      count++;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        count += countKeys(obj[key]);
      }
    }
  }

  return count;
}

/**
 * Get all key paths in a nested object
 */
function getAllKeyPaths(obj, prefix = '') {
  const keys = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullPath = prefix ? `${prefix}.${key}` : key;
      keys.push(fullPath);

      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        keys.push(...getAllKeyPaths(obj[key], fullPath));
      }
    }
  }

  return keys;
}

test('Locale files validation', async (t) => {
  const localesDir = path.resolve(__dirname, '../i18n/locales');
  const localeFiles = fs.readdirSync(localesDir).filter(file => file.endsWith('.json'));

  // Load English locale as reference
  const enPath = path.join(localesDir, 'en.json');
  const enContent = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
  const enKeyCount = countKeys(enContent);
  const enKeyPaths = getAllKeyPaths(enContent);

  await t.test('English locale file should exist and be valid', () => {
    assert.strictEqual(fs.existsSync(enPath), true, 'English locale file should exist');
    assert.ok(enContent, 'English locale content should be defined');
    assert.ok(enKeyCount > 0, 'English locale should have keys');
  });

  await t.test('All locale files should be valid JSON', () => {
    const invalidFiles = [];

    for (const file of localeFiles) {
      try {
        const filePath = path.join(localesDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        JSON.parse(content);
      } catch (error) {
        invalidFiles.push({ file, error: error.message });
      }
    }

    if (invalidFiles.length > 0) {
      console.log('\n❌ Invalid JSON files:');
      invalidFiles.forEach(({ file, error }) => {
        console.log(`  ✗ ${file}: ${error}`);
      });
    }

    assert.strictEqual(invalidFiles.length, 0, 'All locale files should be valid JSON');
  });

  await t.test('All locale files should have the same number of keys as English', () => {
    const results = [];

    for (const file of localeFiles) {
      const filePath = path.join(localesDir, file);
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const keyCount = countKeys(content);

      results.push({
        file,
        keyCount,
        expected: enKeyCount,
        match: keyCount === enKeyCount
      });
    }

    // Log results for debugging
    console.log('\n📊 Locale files key count:');
    console.log('━'.repeat(60));
    results.forEach(result => {
      const status = result.match ? '✅' : '❌';
      const diff = result.keyCount - result.expected;
      const diffStr = diff === 0 ? '' : ` (${diff > 0 ? '+' : ''}${diff})`;
      console.log(`${status} ${result.file.padEnd(15)} ${result.keyCount} keys${diffStr}`);
    });
    console.log('━'.repeat(60));
    console.log(`Expected: ${enKeyCount} keys (from en.json)\n`);

    // Check if all match
    const allMatch = results.every(r => r.match);
    const failedFiles = results.filter(r => !r.match);

    if (!allMatch) {
      const errorMessage = `Some locale files have different key counts:\n${
        failedFiles.map(f => `  - ${f.file}: ${f.keyCount} keys (expected ${f.expected})`).join('\n')
      }`;
      assert.fail(errorMessage);
    }

    assert.strictEqual(allMatch, true, 'All locale files should have same key count as English');
  });

  await t.test('All locale files should have the same key structure as English', () => {
    const missingKeys = {};
    const extraKeys = {};

    for (const file of localeFiles) {
      if (file === 'en.json') continue;

      const filePath = path.join(localesDir, file);
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const keyPaths = getAllKeyPaths(content);

      // Find missing keys
      const missing = enKeyPaths.filter(key => !keyPaths.includes(key));
      if (missing.length > 0) {
        missingKeys[file] = missing;
      }

      // Find extra keys
      const extra = keyPaths.filter(key => !enKeyPaths.includes(key));
      if (extra.length > 0) {
        extraKeys[file] = extra;
      }
    }

    // Log detailed results
    if (Object.keys(missingKeys).length > 0 || Object.keys(extraKeys).length > 0) {
      console.log('\n🔍 Key structure differences:');
      console.log('━'.repeat(60));

      for (const file in missingKeys) {
        console.log(`\n❌ ${file} - Missing keys (${missingKeys[file].length}):`);
        missingKeys[file].slice(0, 10).forEach(key => console.log(`  - ${key}`));
        if (missingKeys[file].length > 10) {
          console.log(`  ... and ${missingKeys[file].length - 10} more`);
        }
      }

      for (const file in extraKeys) {
        console.log(`\n➕ ${file} - Extra keys (${extraKeys[file].length}):`);
        extraKeys[file].slice(0, 10).forEach(key => console.log(`  + ${key}`));
        if (extraKeys[file].length > 10) {
          console.log(`  ... and ${extraKeys[file].length - 10} more`);
        }
      }

      console.log('\n' + '━'.repeat(60));
    }

    // Assert no differences
    if (Object.keys(missingKeys).length > 0) {
      assert.fail(`Some files have missing keys. Check the output above for details.`);
    }

    if (Object.keys(extraKeys).length > 0) {
      assert.fail(`Some files have extra keys. Check the output above for details.`);
    }
  });
});
