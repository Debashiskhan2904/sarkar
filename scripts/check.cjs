const fs = require('fs');
const code = fs.readFileSync('src/index.css', 'utf8');
let depth = 0;
const lines = code.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (const char of line) {
    if (char === '{') depth++;
    if (char === '}') depth--;
  }
  if (depth < 0) {
    console.log(`Unbalanced '}' at line ${i + 1}: ${line}`);
    depth = 0; // reset to find multiple
  }
}
if (depth > 0) console.log('Unbalanced { at EOF');
