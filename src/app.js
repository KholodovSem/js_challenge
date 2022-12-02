import puppeteer from 'puppeteer';
import cheerio from 'cherio';

const uniqEmails = [];

const BASE_URL = 'https://madappgang.com';
const regexp = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;

(async (URL) => {
  const scraper = async (url) => {
    try {
      /* Start process */
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url);
      const content = await page.content();

      /* Links storage */
      const links = new Set();

      /* //!Next step */
      // console.log("Deep: " + deep);
      // const nextStep = deep - 1;

      /* Parse links */
      const $ = cheerio.load(content);
      $('a').each((i, link) => {
        if ($(link).attr("href")
          && $(link).attr("href").startsWith('/')
          && !$(link).attr("href").includes('#')) {

          const fullLink = BASE_URL + $(link).attr('href');
          links.add(fullLink);
        }
      })

      /* Parse Emails */
      const emails = content.match(regexp);
      console.log("Emails on page: " + url, emails);

      /* Finish process */
      browser.close();
      return links;

      /* //!Recursion */
      // if (deep <= 0) {
      //   return
      // } else {
      //   for (let link of links) {
      //     await scraper(link, nextStep)
      //   }
      // }

    } catch (error) {
      console.log(error);
      // throw error;
    }
  }
  const arrayOfLinks = await scraper(URL);

  const iterator = async (arr) => {
    let counter = 0;
    for (let link of arr) {
      counter += 1;
      console.log("Total: " + Array.from(arr).length, '\n' + "Counter: " + counter);
      await scraper(link);
    }
  }
  await iterator(arrayOfLinks);

})(BASE_URL)


// linksList(BASE_URL);