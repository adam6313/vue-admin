const VueAutoRoutingPlugin = require("vue-auto-routing/lib/webpack-plugin");
const WebpackAutoInject = require('webpack-auto-inject-version');

// vue.config.js
module.exports = {
  chainWebpack: config => {
    config.plugin("vue-auto-routing").use(VueAutoRoutingPlugin, [
      {
        pages: "src/views/Dashboard",
        importPrefix: "@/views/Dashboard/",
        dynamicImport: true
      }
    ]);
    config.module
      .rule("js")
      .use("loader")
      .loader("./src/Loader.js");
  },
  configureWebpack: {
    plugins: [
      new WebpackAutoInject(),
    ],
    devServer: {
      proxy: {
        "/api": {
          target: "http://192.0.0.1:8080/dev",
          changeOrigin: true,
          pathRewrite: {
            "^/api": ""
          }
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/_layout.scss";`
      }
    }
  },
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    },
  }
};
