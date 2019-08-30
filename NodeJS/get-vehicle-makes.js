const rp = require('request-promise-native')
const getAuth = require('./get-auth-token')

const getMakes = async () => {
  const token = await getAuth.getToken()

  const graphQLQuery = {
    query: `query {
      getVehicleMakes(tenantId:"${process.env.TENANT_ID}") {
        make
        models
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
  console.log(res)
}

getMakes()
