module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/react",
  webpackFinal: async (config) => {
    config.module.rules.push({
      // this is for both less and scss
      // test: /.*\.(?:le|c)ss$/,
      test: /.*\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: false
          }
        },
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true
            }
          }
        }
      ]
    });
    return config;
  }
}