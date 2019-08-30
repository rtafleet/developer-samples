const getAuth = require('./get-auth-token')

const getToken = async () => {
  const token = await getAuth.getToken()
  console.log(token)
}

getToken()
