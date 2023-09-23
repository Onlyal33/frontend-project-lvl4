module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['*.jsx'],
      rules: {
        'react/prop-types': 0,
      },
    },
    {
      files: ['*.js','*.jsx'],
      rules: {
        'import/extensions': ['error', 'always']
      },
    },
    {
      files: ['*.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  rules: {
    'import/first': 1,
    'import/order': 1,
    'import/prefer-default-export': 1,
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'jsx': 'never',
      'ts': 'never',
      'tsx': 'never'
    }],
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      typescript: {}
    },
    react: {
      version: 'detect',
    },
  },
};
