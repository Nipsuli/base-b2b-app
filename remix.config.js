const nodepoly = require('@esbuild-plugins/node-globals-polyfill').default;
const { withEsbuildOverride } = require("remix-esbuild-override");

withEsbuildOverride((option, { isServer, isDev }) => {
  option.plugins = option.plugins || []
  option.plugins.push(nodepoly({ buffer: true }))

  option.define = option.define || {}
  option.define.global = 'globalThis'

  return option
})

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverBuildTarget: "cloudflare-pages",
  server: "./server.js",
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: [".*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "functions/[[path]].js",
  // publicPath: "/build/",
};
