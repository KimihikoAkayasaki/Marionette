const express = require("express");
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 4000;

app.get("/", async (req, res) => {

  browser = await puppeteer.launch({
    headless: true,
    ignoreDefaultArgs: ["--disable-extensions"],
    args: [
      "--no-sandbox",
      "--use-gl=egl",
      "--disable-setuid-sandbox",
    ],
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36")
  await page.goto('https://www.freecodecamp.org/');

  const result = page.html;
  await browser.close();

  return res.send('hello');
});

const server = app.listen(port, () => console.log(`Listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
