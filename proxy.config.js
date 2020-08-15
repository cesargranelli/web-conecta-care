const proxy = [
  {
    context: '/api',
    target: 'https://viacep.com.br',
    secure: false,
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = proxy;
