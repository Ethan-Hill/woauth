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
  const { query } = req;
  const { token } = query;
  // Rest of the API logic
  if (req.method === 'GET') {
    await axios
      .get('http://localhost:3000/api/token', {
        params: { token },
      })
      .then(async (newToken) => {
        const { access_token } = newToken.data;

        const newGuilds = await axios
          .get('https://discord.com/api/users/@me/guilds', {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .catch((err) => console.log(err));

        res.send(newGuilds.data);
      })
      .catch((err) => res.send(err));
  } else {
    res.status(201);
  }
}

export default handler;
