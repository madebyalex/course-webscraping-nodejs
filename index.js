const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://instagram.com');
  // await page.waitFor('a[href="/accounts/login/?source=auth_switcher"');
  // await page.click('a[href="/accounts/login/?source=auth_switcher"');

  await page.waitFor(500);

  await page.waitFor('input[name="username"]');
  await page.type('input[name="username"]', 'cool-user');
  await page.type('input[name="password"]', 'strongPassword');
  await page.click('button[type="submit"]');

  debugger;
  // await browser.close();
})();
