const rp = require('request-promise-native')
const getAuth = require('./get-auth-token')

const getVehicles = async () => {
  const token = await getAuth.getToken()

  const graphQLQuery = {
    query: `mutation {
      createDriverReport(
        tenantId:"${process.env.TENANT_ID}",
        reportFacilityId:1,
        vehicleId:"1FD0FA34EDA80BBA0EA76B30F8C7C008",
        vehicleFacilityId: 1,
        driver:"John",
        meter:12345
        type:PRE_TRIP,
        defects: [
          { 
          location: "Front",
          component: "Tires",
          condition: "Treads exposed",
          isOperable:false,
          note:"I can see metal"
          }
        ]
      )
      {
        id
        number
        createdAt
        
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

getVehicles()
