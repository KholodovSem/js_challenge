import puppeteer from 'puppeteer';

export default async function getPageContent(url) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const content = await page.content();
    browser.close();
    return content;

  } catch (error) {
    console.log(error);
  }
}

