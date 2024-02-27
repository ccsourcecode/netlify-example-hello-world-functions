// hello there!
// 
// I'm a serverless function that you can deploy as part of your site.
// I'll get deployed to AWS Lambda, but you don't need to know that. 
// You can develop and deploy serverless functions right here as part
// of your site. Netlify Functions will handle the rest for you.

const axios = require('axios');
exports.handler = async event => {
    const response = await axios.get('https://ithelp.ithome.com.tw/articles/10315665');
    const subject = event.queryStringParameters.name || 'World'
    return {
        statusCode: 200,
        body: `Hello ${subject}! ${response.data} `,
    }
}
