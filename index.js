const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on('request', (request) => {
    if (['images', 'stylesheet', 'font'].includes(request.resourceType())) {
      request.abort();
    } else {
      request.continue();
    }
  });

  await page.goto('https://amazon.com');
  debugger;
  // await browser.close();
})();
