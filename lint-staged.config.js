const eslintCommand = 'npx eslint ./src';

const formatCommand = 'prettier --write';

export default {
  '*.{js,jsx,ts,tsx}': [formatCommand, eslintCommand],
  '*.{css,scss,sass,md,json}': [formatCommand],
};
