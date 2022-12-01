// const cherio = require('cherio');
// const chalk = require('chalk');
import cherio from 'cherio';
import chalk from 'chalk';
import { slugify } from 'transliteration';
import { arrayFromLength } from './helpers/common.js'
import { getPageContent } from './helpers/puppeteer.js'


const regexp = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
const SITE = 'https://auto.ru/catalog/cars/all/?page_num=/';
const pages = 2;

(async function main() {
  try {

    for (const page of arrayFromLength(pages)) {
      const url = `${SITE}${page}`;
      const pageContent = await getPageContent(url);
      const $ = cherio.load(pageContent);
      const carsItems = [];

      $('.mosaic.title').each((i, element) => {
        const url = $(element).attr('href');
        const title = $(header).text();

        carsItems.push({
          title,
          url,
          code: slugify(title),
        })
      })
      console.log(carsItems);
    }

  } catch (error) {
    console.log(chalk.red('An error has occured \n'));
    console.log(error);
  }
})()







