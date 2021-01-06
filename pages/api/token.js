/* eslint-disable camelcase */
import Cors from 'cors';
import axios from 'axios';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);
  // Rest of the API logic
  if (req.method === 'GET') {
    const { token } = req.query;

    const params = new URLSearchParams();
    params.append('client_id', process.env.DISCORD_CLIENT_ID);
    params.append('client_secret', process.env.DISCORD_CLIENT_SECRET);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', token);
    params.append('redirect_uri', process.env.NEXTAUTH_URL);
    params.append('scope', 'identify email');

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const newtoken = await axios
      .post('https://discord.com/api/oauth2/token', params, config)
      .catch((err) => console.log(err));

    res.send(newtoken.data);
  } else {
    res.status(201);
  }
}

export default handler;
