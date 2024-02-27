// hello there!
// 
// I'm a serverless function that you can deploy as part of your site.
// I'll get deployed to AWS Lambda, but you don't need to know that. 
// You can develop and deploy serverless functions right here as part
// of your site. Netlify Functions will handle the rest for you.

const axios = require('axios');
const { JSDOM } = require('jsdom');
exports.handler = async event => {
    
    /*
    const response = await axios.get('https://css-tricks.com/accessing-data-netlify-functions-react/');
    const subject = event.queryStringParameters.name || 'World'
    return {
        statusCode: 200,
        body: `Hello ${subject}! ${response.data} `,
    }
}
*/
      try {
    const response = await axios.get(url);
    const { document } = new JSDOM(response.data).window;

    const images = document.querySelectorAll('img');

    images.forEach((img) => {
      const dataUrl = getDataUrl(img.src);
      img.src = dataUrl;
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: document.documentElement.outerHTML,
    };
  } catch (error) {
    console.error('Error:', error.message);
    return {
      statusCode: 500,
      body: 'An error occurred while rendering the page.',
    };
  }
};


function getDataUrl(url) {
  return axios
    .get(url, {
      responseType: 'arraybuffer',
    })
    .then((response) => {
      const contentType = response.headers['content-type'];
      const base64 = Buffer.from(response.data, 'binary').toString('base64');
      return `data:${contentType};base64,${base64}`;
    })
    .catch((error) => {
      console.error('Error fetching image:', error.message);
      return url; // Return the original URL on error
    });
}
