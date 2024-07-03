// lint-staged.config.js
module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'npx tsc --noEmit',

  // Run ESLint on changes to JavaScript/TypeScript files
  '**/*.(ts|js)?(x)': () => `eslint . --ext ts --ext tsx `,

  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': filenames => [
    `npx eslint --fix ${filenames.join(' ')}`,
    `npx  prettier --write ${filenames.join(' ')}`
    // `npx test`
  ],

  // Format MarkDown and JSON
  '**/*.(md|json)': filenames => `npx  prettier --write ${filenames.join(' ')}`
};
