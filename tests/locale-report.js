import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

/**
 * Get value at a key path
 */
function getValueAtPath(obj, path) {
  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }

  return current;
}

const localesDir = path.resolve(__dirname, '../i18n/locales');
const localeFiles = fs.readdirSync(localesDir).filter(file => file.endsWith('.json'));

// Load English locale as reference
const enPath = path.join(localesDir, 'en.json');
const enContent = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
const enKeyPaths = getAllKeyPaths(enContent);

console.log('═'.repeat(80));
console.log('📋 LOCALE FILES ANALYSIS REPORT');
console.log('═'.repeat(80));
console.log(`\n📌 Reference: en.json (${enKeyPaths.length} keys)\n`);

const report = {
  missing: {},
  extra: {},
  summary: []
};

for (const file of localeFiles) {
  if (file === 'en.json') continue;

  const filePath = path.join(localesDir, file);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const keyPaths = getAllKeyPaths(content);

  // Find missing keys
  const missing = enKeyPaths.filter(key => !keyPaths.includes(key));
  if (missing.length > 0) {
    report.missing[file] = missing;
  }

  // Find extra keys
  const extra = keyPaths.filter(key => !enKeyPaths.includes(key));
  if (extra.length > 0) {
    report.extra[file] = extra;
  }

  report.summary.push({
    file,
    totalKeys: keyPaths.length,
    missing: missing.length,
    extra: extra.length,
    status: missing.length === 0 && extra.length === 0 ? '✅' : '❌'
  });
}

// Print summary
console.log('📊 SUMMARY');
console.log('─'.repeat(80));
report.summary.forEach(item => {
  console.log(`${item.status} ${item.file.padEnd(15)} Total: ${item.totalKeys.toString().padStart(4)} | Missing: ${item.missing.toString().padStart(4)} | Extra: ${item.extra.toString().padStart(4)}`);
});

// Print missing keys details
if (Object.keys(report.missing).length > 0) {
  console.log('\n\n❌ MISSING KEYS (compared to en.json)');
  console.log('═'.repeat(80));

  for (const file in report.missing) {
    console.log(`\n📁 ${file} - Missing ${report.missing[file].length} keys:`);
    console.log('─'.repeat(80));

    // Group by top-level key
    const grouped = {};
    for (const key of report.missing[file]) {
      const topLevel = key.split('.')[0];
      if (!grouped[topLevel]) grouped[topLevel] = [];
      grouped[topLevel].push(key);
    }

    for (const topLevel in grouped) {
      console.log(`\n  🔹 ${topLevel} (${grouped[topLevel].length} keys):`);

      // Show first 15 keys
      grouped[topLevel].slice(0, 15).forEach(key => {
        const value = getValueAtPath(enContent, key);
        const valuePreview = typeof value === 'string'
          ? ` = "${value.substring(0, 60)}${value.length > 60 ? '...' : ''}"`
          : '';
        console.log(`    - ${key}${valuePreview}`);
      });

      if (grouped[topLevel].length > 15) {
        console.log(`    ... and ${grouped[topLevel].length - 15} more keys`);
      }
    }
  }
}

// Print extra keys details
if (Object.keys(report.extra).length > 0) {
  console.log('\n\n➕ EXTRA KEYS (not in en.json)');
  console.log('═'.repeat(80));

  for (const file in report.extra) {
    console.log(`\n📁 ${file} - Extra ${report.extra[file].length} keys:`);
    console.log('─'.repeat(80));

    report.extra[file].forEach(key => {
      const content = JSON.parse(fs.readFileSync(path.join(localesDir, file), 'utf-8'));
      const value = getValueAtPath(content, key);
      const valuePreview = typeof value === 'string'
        ? ` = "${value.substring(0, 60)}${value.length > 60 ? '...' : ''}"`
        : '';
      console.log(`  + ${key}${valuePreview}`);
    });
  }
}

// Save detailed report to file
const reportPath = path.join(__dirname, 'locale-report.txt');
const reportContent = `LOCALE FILES ANALYSIS REPORT
Generated: ${new Date().toISOString()}

REFERENCE: en.json (${enKeyPaths.length} keys)

${'='.repeat(80)}
SUMMARY
${'='.repeat(80)}

${report.summary.map(item =>
  `${item.status} ${item.file.padEnd(15)} Total: ${item.totalKeys.toString().padStart(4)} | Missing: ${item.missing.toString().padStart(4)} | Extra: ${item.extra.toString().padStart(4)}`
).join('\n')}

${Object.keys(report.missing).length > 0 ? `
${'='.repeat(80)}
MISSING KEYS DETAILS
${'='.repeat(80)}

${Object.entries(report.missing).map(([file, keys]) => `
${file} - Missing ${keys.length} keys:
${keys.map(key => `  - ${key}`).join('\n')}
`).join('\n')}
` : ''}

${Object.keys(report.extra).length > 0 ? `
${'='.repeat(80)}
EXTRA KEYS DETAILS
${'='.repeat(80)}

${Object.entries(report.extra).map(([file, keys]) => `
${file} - Extra ${keys.length} keys:
${keys.map(key => `  + ${key}`).join('\n')}
`).join('\n')}
` : ''}
`;

fs.writeFileSync(reportPath, reportContent);

console.log('\n\n═'.repeat(80));
console.log(`✅ Detailed report saved to: ${reportPath}`);
console.log('═'.repeat(80));
