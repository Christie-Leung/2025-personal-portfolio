const handlebar = require('handlebars');
const fs = require('fs');
const path = require("path");
const ids = require('../templates/Ids.json');

const source = fs.readFileSync(path.resolve(__dirname, '../templates/id.hbs'), 'utf-8');
const template = handlebar.compile(source);

console.log('Generating IDs');

const prefixes = [];
for (const id of ids) {
  const { prefix, name } = id;
  if (!prefix || !name) {
    throw new Error('`prefix` and `name` are required.');
  }
  if (prefix.length !== 2) {
    throw new Error('prefix must be of length 2.');
  }
  if (name.length < 4) {
    throw new Error('name must be at least 4 characters long.');
  }
  if (prefixes.includes(prefix)) {
    throw new Error(`Duplicate prefix ${prefix} found.`);
  }
  if (name.endsWith('Id')) {
    throw new Error(`${name} cannot end with Id.`);
  }

  prefixes.push(prefix);
  const rendered = template({ name,  prefix });
  fs.writeFileSync(path.resolve(__dirname, `../src/ids/${name}Id.ts`), rendered);
}

console.log(`Generated ${prefixes.length} Ids`);

