const rp = require('request-promise-native')
require('dotenv-safe').config()

module.exports = {
  getToken: async () => {
    const options = {
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

    const res = await rp(options)
    // console.log({ res })
    return JSON.parse(res).access_token
  }
}
