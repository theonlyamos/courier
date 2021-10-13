const fetch = require('node-fetch')

const handler = async function (event, context) {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: `It works!!!`, body: event.body }),
    }
  } catch (error) {
    // output to netlify function log
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }
