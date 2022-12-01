import puppeteer from 'puppeteer';

const LAUNCH_PUPPETEER_OPT = {
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--window-size=1920x1080',
  ]
};

const PAGE_PUPPETEER_OPT = {
  networkIdle2Timeout: 5000,
  waitUntil: 'networkidle2',
  timeout: 3000000,
}

export async function getPageContent(url) {
  try {
    const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPT);
    const page = await browser.newPage();
    await page.goto(url, PAGE_PUPPETEER_OPT);
    const content = await page.content();
    browser.close();
    return content;

  } catch (error) {
    throw error;
  }
}
