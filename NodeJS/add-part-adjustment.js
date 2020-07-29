
const rp = require('request-promise-native')
const getAuth = require('./get-auth-token')

const addPartAdjustment = async () => {
  const token = await getAuth.getToken()

  const graphQLQuery = {
    query: `mutation addPartAdjustment {
	addPartAdjustment(
		input: {
			tenantId: "foo"
			partId: "bar"
			binAQuantity: 3
			authorizedBy: "user_name"
			etag: "etag_of_part_you_fetched"
			cost: 50
			reason: "reason_for_adjustment"
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
