const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();
const {
  VITE_CLIENT_ID_GOOGLE
} = process.env;

const client = new OAuth2Client(VITE_CLIENT_ID_GOOGLE);

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: VITE_CLIENT_ID_GOOGLE,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  return payload;
};

module.exports = { verify };