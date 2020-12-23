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
  if (req.method === 'POST') {
    const newtoken = await axios
      .post('https://discord.com/api/oauth2/token', {
        params: {
          client_id: process.env.DISCORD_CLIENT_ID,
          client_secret: process.env.DISCORD_CLIENT_SECRET,
          grant_type: 'refresh_token',
          redirect_uri: 'https://woauth.vercel.app',
          scope: 'identify email guilds',
        },
      })
      .catch((err) => console.log(err));
    res.send(newtoken.data);
  } else {
    res.status(201);
  }
}

export default handler;
