const request = require('request-promise');
const cheerio = require('cheerio');

(async () => {
  // #1
  console.log(`Initial request to get the csrf_token value`);
  let initialRequest = await request({
    uri: 'http://quotes.toscrape.com/login',
    method: 'GET',
    gzip: true,
    resolveWithFullResponse: true,
  });

  // #2 Parsing the cookies
  let cookie = initialRequest.headers['set-cookie']
    .map((value) => value.split(';')[0])
    .join(' ');

  let $ = cheerio.load(initialRequest.body);
  let csrfToken = $('input[name="csrf_token"]').val();

  // #3
  console.log(`Post request to login on the form`);
  try {
    let loginRequest = await request({
      uri: 'http://quotes.toscrape.com/login',
      method: 'POST',
      headers: {
        Host: 'quotes.toscrape.com',
        Connection: 'keep-alive',
        Pragma: 'no-cache',
        'Cache-Control': 'no-cache',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        Referer: 'http://quotes.toscrape.com/login',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-US,en;q=0.9,nb;q=0.8',
        Cookie: cookie,
      },
      form: {
        csrf_token: csrfToken,
        username: 'admin',
        password: 'admin',
      },
      resolveWithFullResponse: true,
      gzip: true,
    });
  } catch (response) {
    cookie = response.response.headers['set-cookie']
      .map((value) => value.split(';')[0])
      .join(' ');
  }

  console.log('LoggedIn request');
  let loggedInResponse = await request({
    uri: 'http://quotes.toscrape.com/',
    method: 'GET',
    gzip: true,
    headers: {
      Host: 'quotes.toscrape.com',
      Connection: 'keep-alive',
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      Referer: 'http://quotes.toscrape.com/login',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'en-US,en;q=0.9,nb;q=0.8',
      Cookie: cookie,
    },
  });

  debugger;
})();
