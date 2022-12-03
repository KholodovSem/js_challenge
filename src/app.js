import puppeteer from './helpers/puppeteer.js'
import parseEmails from './helpers/parseEmails.js'
import parseLinks from './helpers/parseLinks.js'
import onlyUniqLinks from './helpers/onlyUniqLinks.js';
import spinner from './cli/cli_spinner.js';
import onlyUnique from './helpers/uniqValues.js';
import argv from './cli/commander.js';



const BASE_URL = argv.url.endsWith("/") ? argv.url.slice(0, argv.url.length - 1) : argv.url;

console.log(BASE_URL);

const scraper = async (url) => {
  try {
    const emails = [];

    spinner.start('Starting to look for links');

    /* Puppeteer */
    const content = await puppeteer(url);

    /* Parse link on Base page */
    const links = parseLinks(content, url);

    /* Parse embeded links */
    const parseEmbededLinks = async () => {
      const embededLinks = [];
      for (let link of links) {
        const content = await puppeteer(link);
        const newLinks = parseLinks(content, url);
        newLinks.forEach(newLink => {
          if (links.indexOf(newLink) === -1) {
            embededLinks.push(newLink);
          }
        })

      }
      /* Leave only unique links */
      const uniqEmbededLinks = new Set(embededLinks);
      return Array.from(uniqEmbededLinks);
    }

    /* Combining all the links */
    const embededLinks = await parseEmbededLinks();
    const combinedLinks = [...links, ...embededLinks];
    const uniqLinks = onlyUniqLinks(combinedLinks);

    spinner.succeed(`Total count links: ${uniqLinks.length}`)
    console.log(uniqLinks);

    /* Parse emails on each link */
    for (let link of uniqLinks) {
      const content = await puppeteer(link);
      parseEmails(content, link, emails);
    }

    /* Only unique emails */
    const uniqueEmails = emails.filter(onlyUnique);
    console.log("Total unique emails finded: " + uniqueEmails.length);
    console.log(uniqueEmails);

  } catch (error) {
    console.log(error);
  }
}

if (!argv.url) {
  console.log("Specify the url using the -url <...> flag when running the script");
  process.exit(1);
} else {
  scraper(BASE_URL);
}
