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
    const guilds = await axios
      .get('https://discord.com/api/users/@me/guilds', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => console.log(err));
    res.send(guilds.data);
  } else {
    res.status(201);
  }
}

export default handler;
