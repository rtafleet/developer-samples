# Node.js Samples for RTA APIs

## Getting Started

1. Copy the file .env.example to a new file called .env
2. Set your environment variables as provided to you by RTA
3. Open a terminal/command prompt to the NodeJS directory and run `npm install`

## `test-get-token.js` - Obtaining an access token

Before you can access the RTA API, you must obtain an access token. This process must only be done once per session. To obtain the access token, you must call our to the RTA Authentication service. [get-auth-token.js](get-auth-token.js) creates a basic form post containing the client id and client secret needed to obtain the token. The response includes an access token, the scopes (i.e. permissions), and the number of seconds until the token expires.

To run this sample, open your terminal/command prompt to the NodeJS directory and run `node test-get-token.js`. The output will be an JWT access token similar to the following:

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6UkVNemRFTXpGRE9FSTVRamhEUVRaRVFUUXhSa1pETVRGQ09ETXlNRFl3TkRsR01VUTJSQSJ9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.mdXCjKnlmu0HpIOidETDv5y3KDpyKGpZ4GjPCzLFmWNAQALrrCgKz5pg9bOqBm0S1tGwXtZHqN7qrjth0VNx-IHu3GxF-hs80AZSGB6PFcogK-r7-LOtxstVW_S2J5Pya6BXU3oiSn1_ep9c1YWPR52sRXl90lqkAIdsQpVadAd_W3FxIuRT2HmvHKGD8WEpH03in8WOvkp6JMIjDaGvPAisPyPReqmlGqaUctj5EI3VCl1LbUbP5EUe2HPx_58ejumpTmN8s4TLYmOy6h-iDkZu-uHh8fwQaFgCh-6kB7naDkA99UfDHBRVEe7tb9M2CInr_AobprL5fa-QwmADdg
```

## `get-me.js` - Retrieving current user data

Now that you have an access token, you can start using the RTA GraphQL api. For the first sample, let's retrieve the data for the current user. [get-me.js](get-me.js) uses the [get-auth-token.js](get-auth-token.js) module used for getting the auth token and then constructs a GraphQL query:

```graphql
query {
  getMe {
    id
    firstName
    lastName
  }
}
```

The query is POSTed to the API endpoint along with an authorization header containing the access token.

### Current User Example response

```javascript
{
  "data": {
    "getMe": {
      "id": "0wrXTJ5KmgquF7mZA4ZF112LB1PLzOsW",
      "firstName": null,
      "lastName": null
    }
  }
}
```

## `get-vehicle-makes` - Retrieving the vehicle makes and models

We can also retrieve the makes and models of the vehicles using a similar technique, as shown in [get-vehicle-makes.js](get-vehicle-makes.js).

```graphql
query {
  getVehicleMakes(tenantId: "${process.env.TENANT_ID}") {
    make
    models
  }
}
```

### Vehicle Makes Example response

```javascript
{
    "data": {
        "getVehicleMakes": [{
            "make": "FORD",
            "models": ["CROWN VICTORIA", "CUTAWAY", "E-150", "ESCAPE", "ESCORT", "EXPEDITION", "EXPLORER", "EXPLORER  XLT", "F-150", "F-150 XL", "F-250", "F-350", "F-450", "F-550", "FREESTAR", "L8000", "MUSTANG", "RANGER", "SEDAN", "TAURUS", "TAURUS/SE", "VAN", "XL-150", "XL150"]
        }, {
            "make": "THERMO KING",
            "models": ["SB1200"]
        }, {
            "make": "VERMEER",
            "models": ["1250 A CHIPPER", "1250 CHIPPER", "SC252"]
        }, {
            "make": "VOLKSWAGEN",
            "models": ["FASTBACK", "KARMANN-GHIA", "THING"]
        }]
    }
}
```

## `get-vehicles` - Searching and paging through vehicles

The RTA API also supports searching and paging through the data. An example of this is shown in [get-vehicles.js](get-vehicles.js) using the `queryOptions`, `filters`, and `pagination` parameters:

```graphql
query {
  getVehicles(
    tenantId: "${process.env.TENANT_ID}"
    facilityId: 1
    queryOptions: {
      filters: { name: "model", operator: EQUALS, values: ["F-150"] }
      pagination: { limit: 10 }
    }
  ) {
    vehicles {
      vehicleNumber
      make
      model
      meters {
        meterType
        meter
      }
    }
  }
}
```

## Vehicle Search Example Response

```javascript
PS C:\dev\rta\developer-samples\NodeJS> node .\get-vehicles.js
{
  "data": {
    "getVehicles": {
      "vehicles": []
    }
  }
}
PS C:\dev\rta\developer-samples\NodeJS> node .\get-vehicles.js
{
  "data": {
    "getVehicles": {
      "vehicles": [
        {
          "vehicleNumber": "5132",
          "make": "VERMEER",
          "model": "SC252",
          "meters": {
            "meterType": "hours",
            "meter": 476
          }
        },
        {
          "vehicleNumber": "9102",
          "make": "VERMEER",
          "model": "1250 CHIPPER",
          "meters": {
            "meterType": "hours",
            "meter": 881.4
          }
        },
        {
          "vehicleNumber": "9103",
          "make": "VERMEER",
          "model": "1250 A CHIPPER",
          "meters": {
            "meterType": "hours",
            "meter": 188
          }
        }
      ]
    }
  }
}
```
