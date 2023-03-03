const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react');
const GenerateIconsMapPlugin = require('../../generate-icons-map-plugin');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
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
});
