const axios = require('axios');

async function scraping(url) {
  const { data } = await axios.get(url);
  console.log(data);
}

scraping('https://madappgang.com/');