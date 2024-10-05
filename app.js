const express = require("express");
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 3001;

app.get("/", async (req, res) => {
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.freecodecamp.org/');

  const result = page.html;
  await browser.close();

  return res.type('html').send('result');
});

const server = app.listen(port, () => console.log(`Listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
