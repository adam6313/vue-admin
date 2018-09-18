const VueAutoRoutingPlugin = require('vue-auto-routing/lib/webpack-plugin');

// vue.config.js
module.exports = {
  chainWebpack: config => {
    config
      .plugin('vue-auto-routing')
        .use(VueAutoRoutingPlugin, [
          {
            pages: "src/views/Dashboard",
            importPrefix: "@/views/Dashboard/",
            dynamicImport: true
          }
        ])
  },
  configureWebpack: {
    devServer: {
      proxy: {
        "/api": {
          target: 'http://192.0.0.1:8080/dev',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          },       
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/_layout.scss";`
      },
    },
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
