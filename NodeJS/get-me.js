const rp = require('request-promise-native')
const getAuth = require('./get-auth-token')

const getMe = async () => {
  const token = await getAuth.getToken()

  const graphQLQuery = {
    query: `query {
      getMe {    
        id   
        firstName
        lastName
      }
    }`
  }

  const options = {
    method: 'POST',
    url: process.env.RTA_API_ENDPOINT,
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(graphQLQuery)
  }

  const res = await rp(options)
  const formattedResponse = JSON.stringify(JSON.parse(res), null, '  ')
  console.log(formattedResponse)
}

getMe()
