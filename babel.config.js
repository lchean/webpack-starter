module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: {
          version: 3,
          proposals: true,
        },
      },
    ],
  ];

  const sourceType = 'unambiguous';

  const plugins = ['@babel/plugin-syntax-dynamic-import'];

  return {
    presets,
    plugins,
    sourceType,
  };
};
