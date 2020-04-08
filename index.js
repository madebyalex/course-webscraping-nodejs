const request = require('request-promise');
const cheerio = require('cheerio');

(async () => {
  const USERNAME = 'pablostanley';
  const BASE_URL = `https://instagram.com/${USERNAME}`;

  let response = await request(BASE_URL);

  let $ = cheerio.load(response);
  let script = $('script[type="text/javascript"]').eq(3).html();

  let scriptRegex = /window._sharedData = (.+);/g.exec(script);

  let {
    entry_data: {
      ProfilePage: {
        [0]: {
          graphql: { user },
        },
      },
    },
  } = JSON.parse(scriptRegex[1]);

  let instagram_data = {
    followers: user.edge_followed_by.count,
    following: user.edge_follow.count,
    uploads: user.edge_owner_to_timeline_media.count,
    full_name: user.full_name,
    picture_url: user.profile_pic_url_hd,
  };

  console.log(instagram_data);

  debugger;
})();
