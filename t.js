const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://google.com');
  
  const r = await page.pdf();
  await browser.close();

  console.log(r);
  return r
})();