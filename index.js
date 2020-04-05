const request = require('request-promise').defaults({
  // Full of a proxy: http://username:password@ip:port
  proxy: 'http://103.123.246.54:8080',
});

(async () => {
  let response = await request('https://httpbin.org/ip');
  // console.log(response);

  console.log(response);
  debugger;
})();
