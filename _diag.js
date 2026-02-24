const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all section IDs
const sectionIds = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
console.log('Section IDs found:');
sectionIds.forEach(id => console.log('  #' + id));

// Check how many data-i18n attributes exist
const i18nCount = (html.match(/data-i18n/g) || []).length;
console.log('\ndata-i18n attributes in HTML:', i18nCount);

// Find class names used in sections
const classes = [...html.matchAll(/class="([^"]+)"/g)].map(m => m[1]);
const uniqueClasses = [...new Set(classes.join(' ').split(' '))].sort();
console.log('\nKey classes:');
uniqueClasses.filter(c => /section|tag|title|desc|card|badge|feat|stat|label|text|sub|why|mv|closing|contact|ref|row|key/i.test(c))
    .forEach(c => console.log('  .' + c));
