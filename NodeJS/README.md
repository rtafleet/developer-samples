# Node.js Samples for RTA APIs

## Getting Started

1. Copy the file .env.example to a new file called .env
2. Set your environment variables as provided to you by RTA
3. Open a terminal/command prompt to the NodeJS directory and run `npm install`

## `get-auth-token.js` - Obtaining an access token

Before you can access the RTA API, you must obtain an access token. This process must only be done once per session. To obtain the access token, you must call our to the RTA Authentication service. `get-auth-token.js` creates a basic form post containing the client id and client secret needed to obtain the token. The response includes an access token, the scopes (i.e. permissions), and the number of seconds until the token expires.

To run this sample, open your terminal/command prompt to the NodeJS directory and run `node get-auth-token.js`.
