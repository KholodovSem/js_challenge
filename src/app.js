import getPageContent from './helpers/get-page-content.js'
import parseEmails from './helpers/parse-emails.js'
import parseLinks from './helpers/parse-links.js'
import parseEmbededLinks from './helpers/parse-embeded-links.js';
import onlyUniqLinks from './helpers/only-unique-links.js';
import spinner from './cli/cli-spinner.js';
import onlyUnique from './helpers/uniq-values.js';
import argv from './cli/commander.js';

if (!argv.url) {
  console.log("Specify the url using the -url <...> flag when running the script");
  process.exit(1);
}

const BASE_URL = argv.url.endsWith("/") ? argv.url.slice(0, argv.url.length - 1) : argv.url;

const scraper = async (url) => {
  try {
    const emails = [];

    spinner.start('Starting to look for links');

    /* getPageContent */
    const content = await getPageContent(url);

    /* Parse link on Base page */
    const links = parseLinks(content, url);

    /* Combining all the links */
    const embededLinks = await parseEmbededLinks(links, url);
    const combinedLinks = [...links, ...embededLinks];
    const uniqLinks = onlyUniqLinks(combinedLinks);

    spinner.succeed(`Total count links: ${uniqLinks.length}`)
    console.log(uniqLinks);

    /* Parse emails on each link */
    for (let link of uniqLinks) {
      const content = await getPageContent(link);
      emails.push(...parseEmails(content, link, emails));
    }

    /* Only unique emails */
    const uniqueEmails = emails.filter(onlyUnique);
    console.log("Total unique emails finded: " + uniqueEmails.length);
    console.log(uniqueEmails);

  } catch (error) {
    console.log(error);
  }
}

scraper(BASE_URL);


