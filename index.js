const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  // Login into Pinterest account
  await page.goto('https://pinterest.com');
  await page.waitFor('div[data-test-id="simple-login-button"] > button');
  await page.click('div[data-test-id="simple-login-button"] > button');

  await page.waitFor(500);
  // await page.waitForNavigation();

  await page.waitFor('input[name="id"]');
  await page.type('input[name="id"]', 'username@email.com', {
    delay: 100,
  });
  await page.type('input[name="password"]', 'userPassword123', {
    delay: 100,
  });
  await page.click('button[type="submit"]');

  // Go to your profile page

  await page.waitFor('div[aria-label="Your profile"] > a');
  await page.setViewport({ width: 1200, height: 1200 });
  await page.click('div[aria-label="Your profile"] > a');
  await page.waitFor('a[href=/username/web-app-design/"]');
  await page.click('a[href=/username/web-app-design/"]');

  // await page.waitFor(500);
  // await page.goto('/username/web-app-design/');

  // Scraping images
  const IMAGE_SELECTOR = '';

  debugger;
  // await browser.close();
})();
