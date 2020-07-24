const rp = require('request-promise-native')
const getAuth = require('./get-auth-token')

const getVehicles = async () => {
  const token = await getAuth.getToken()

  const graphQLQuery = {
    query: `query {
      getVehicles(tenantId:"${process.env.TENANT_ID}",facilityId: 1, queryOptions:{
        filters : {
          name:"make"      
          operator: EQUALS
          values:["FORD"]
        }
        pagination:{limit:10}
      }) {
        vehicles {
          id
          vehicleNumber
          make
          model
          status {
            code
            description
            isAvailable
            priority
          }
          meters {
            meter {
              reading
              unitOfMeasure
              lastPostedDate
            }
            fuelMeter {
              reading
              unitOfMeasure
              lastPostedDate
            }
          }
        }
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
