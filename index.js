const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;

const URLS = [
  'https://www.imdb.com/title/tt0462538/?ref_=fn_al_tt_2',
  'https://www.imdb.com/title/tt0454876/?ref_=nv_sr_srsg_3',
];

(async () => {
  let moviesData = [];

  for (let movie of URLS) {
    const response = await request({
      uri: movie,
      headers: {
        Host: 'www.imdb.com',
        'User-Agent': 'Super-Scraper',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0',
        TE: 'Trailers',
      },
      gzip: true,
    });

    let $ = cheerio.load(response);
    let title = $('div[class="title_wrapper"] > h1').text().trim();
    let rating = $('div[class="ratingValue"] > strong > span').text();
    let posterURL = $('div[class="poster"] > a > img').attr('src');
    let ratingCount = $(
      'div[class="imdbRating"] > a > span[itemprop="ratingCount"]'
    ).text();
    let releaseDate = $('a[title="See more release dates"]').text().trim();

    let genres = [];
    $(
      'div[class="title_wrapper"] > div[class="subtext"] > a[href^="/search/"]'
    ).each((i, elm) => {
      let genre = $(elm).text();
      genres.push(genre);
    });

    moviesData.push({
      title,
      rating,
      posterURL,
      ratingCount,
      releaseDate,
      genres,
    });

    // 1. Save the parsed data as a JSON file
    // fs.writeFileSync('./data.json', JSON.stringify(moviesData), 'utf-8');

    // 2. Save the parsed data as a CSV file
    // const fields = ['title', 'rating'];
    // const json2csvParser = new Json2csvParser({ fields });
    // const csv = json2csvParser.parse(moviesData);
    // fs.writeFileSync('./data.csv', csv, 'utf-8');

    // 3. Save the parsed data as a CSV file without specifying column titles
    const json2csvParser = new Json2csvParser();
    const csv = json2csvParser.parse(moviesData);
    fs.writeFileSync('./data.csv', csv, 'utf-8');
  }
})();
