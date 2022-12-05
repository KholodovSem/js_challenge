import getPageContent from "./get-page-content.js";
import parseLinks from "./parse-links.js";

const parseEmbededLinks = async (links, url) => {
  try {
    const embededLinks = [];
    for (let link of links) {
      const content = await getPageContent(link);
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
  } catch (error) {
    throw error;
  }
}

export default parseEmbededLinks;