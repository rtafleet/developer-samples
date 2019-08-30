var request = require('request')
require('dotenv-safe').config()

let options = {
  method: 'POST',
  url: process.env.AUTH_ENDPOINT,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form: {
    audience: process.env.AUDIENCE,
    grant_type: 'client_credentials',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  }
}

request(options, function(error, response, body) {
  if (error) throw new Error(error)

  console.log(body)
})
