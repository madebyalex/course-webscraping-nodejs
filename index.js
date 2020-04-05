const request = require('request-promise');

// Show additional information about the response
request.debug = 1;

(async () => {
  console.log('Initial request');

  try {
    let status = await request({
      url: 'https://httpbin.org/status/300',
      resolveWithFullResponse: true,
    });
  } catch (response) {
    if (response.statusCode == 300) {
      console.log(
        `Everything is fine! The status code ${response.statusCode} is valid.`
      );
    } else {
      console.log(`Something has happened: ${response}`);
      process.exit(1);
    }
  }
})();
