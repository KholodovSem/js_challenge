import cherio from 'cherio';
import { getPageContent } from "./puppeteer.js";

async function getLinks(URL, deep) {
  if (!getLinks.links) {
    getLinks.links = new Set();
    getLinks.baseURL = URL;
  }
  const content = await getPageContent(URL);

  const $ = cherio.load(content);
  $('a').each((i, element) => {
    if ($(element).attr('href') && $(element).attr('href').startsWith('/')) {
      getLinks.links.add(getLinks.baseURL + $(element).attr('href'));
    }
  });

  console.log(getLinks.links);
}

getLinks("https://madappgang.com");

