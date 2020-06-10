const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: "http://local.api.factorysupport.systems",
    secure: false,
    loglevel: 'debug',
    pathRewrite: {
      '^/api': ''
    },
    changeOrigin: true
  }
]

module.exports = PROXY_CONFIG;
