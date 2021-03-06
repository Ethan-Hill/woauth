const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      // eslint-disable-next-line no-param-reassign
      config.node = { fs: 'empty' };
    }
    return config;
  },
  functions: {
    'api/auth/[...nextauth]': {
      maxDuration: 30,
    },
  },
});
