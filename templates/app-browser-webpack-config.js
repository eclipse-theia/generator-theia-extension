/**
 * This file can be edited to customize webpack configuration.
 * To reset delete this file and rerun theia build again.
 */
// @ts-check
const config = require('./gen-webpack.config.js');

/**
 * Expose bundled modules on window.theia.moduleName namespace, e.g.
 * window['theia']['@theia/core/lib/common/uri'].
 * Such syntax can be used by external code, for instance, for testing.
config.module.rules.push({
    test: /\.js$/,
    loader: require.resolve('@theia/application-manager/lib/expose-loader')
}); */

// Load relevant node polyfills as they are no longer automatically included with webpack 5.
config.resolve.fallback.http = require.resolve("stream-http");
config.resolve.fallback.https = require.resolve("https-browserify");
config.resolve.fallback.url = require.resolve("url");

module.exports = config;
