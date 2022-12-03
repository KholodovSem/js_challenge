import cheerio from 'cherio';

export default function getPageContent(content, BASE_URL) {
  /* Links storage */
  const links = new Set();

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

  return Array.from(links);
}
