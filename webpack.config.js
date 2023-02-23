const getConfig = require('@nrwl/react/plugins/webpack');
const GenerateIconsMapPlugin = require('./generate-icons-map-plugin');


module.exports = (config) => {
  config = getConfig(config);
  config.output.chunkLoadTimeout = 300000;
  config.module.rules = config.module.rules.map((ruleSet) => {
    if (ruleSet.test.toString().includes('.svg')) {
      return {
        test: /.svg$/,
        oneOf: [
          {
            use: {
              loader: 'svg-sprite-loader',
            },
          },
        ],
      };
    }

    return ruleSet;
  });

  config.plugins = [
    ...config.plugins,
    new GenerateIconsMapPlugin(),
  ];

  return config;
};
