
const rp = require('request-promise-native')
const getAuth = require('./get-auth-token')

const addPartAdjustment = async () => {
  const token = await getAuth.getToken()

  const graphQLQuery = {
    query: `mutation addPartAdjustment {
	addPartAdjustment(
		input: {
			tenantId: "RTA01267"
			partId: "006EB9F456312B807AC210A071DCC63E"
			binAQuantity: 3
			authorizedBy: "ME"
			etag: "batman"
			cost: 50
			reason: "scooby"
		}
	) {
		id
		facilityId
		partNumber
		binLocation
		description
		vendorId
		sellingPrice
		meanCost
		totalQuantity
		binA {
			label
			id
			quantity
			isEnabled
		}
		binB {
			label
			id
			quantity
			isEnabled
		}
		binC {
			label
			id
			quantity
			isEnabled
		}
		binD {
			label
			id
			quantity
			isEnabled
		}
		binE {
			label
			id
			quantity
			isEnabled
		}
		vmrs {
			major
			intermediate
			minor
			code
		}
		etag
	}
}

`
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

addPartAdjustment()
