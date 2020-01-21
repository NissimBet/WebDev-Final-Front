module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },

  extends: `react-app`,
  rules: {
    'import/no-unused-modules': [
      1,
      { unusedExports: true, missingExports: true },
    ],
  },
};
