const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  var timestamp = new Date().getTime();
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.type('input.gsfi', 'Hello world!', { delay: 100 }); // Types slower, like a user
  await page.keyboard.press('Enter');
  await page.waitForNavigation();

  await page.screenshot({
    path: `scrapped-imgs/example-${timestamp}.png`,
    fullPage: true,
  });

  // await browser.close();

  debugger;
})();
