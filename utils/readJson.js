// Nor supported
// import movies from './movies.json' assert { type: 'json' };
// Not supported yet
// import movies from './movies.json' with { type: 'json' };

// Possible solution
// import fs from 'node:fs';
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));

//Best solution
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

export const readJson = (path) => require(path);
