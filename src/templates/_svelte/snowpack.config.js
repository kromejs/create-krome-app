// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: '/',
  },
  buildOptions: {
    out: 'dist',
    metaUrlPath: 'modules',
  },
  optimize: {
    entrypoints: ['background.js', 'content.js'],
    bundle: true,
    minify: true,
    target: 'es2020',
  },
  plugins: ['@snowpack/plugin-svelte'],
  // plugins: [['@snowpack/plugin-webpack']],
};
