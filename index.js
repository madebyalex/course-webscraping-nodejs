const request = require('request-promise').defaults({
  // Full of a proxy: http://username:password@ip:port

  // proxy: 'http://103.123.246.54:8080',
  proxy: 'http://31.146.31.182:3128',
});

(async () => {
  let response = await request('https://httpbin.org/ip');
  // console.log(response);

  console.log(response);
  debugger;
})();
