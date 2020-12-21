import Cors from 'cors';
import axios from 'axios';
import { getSession } from 'next-auth/client';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'PATCH'],
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
  if (req.method === 'PATCH') {
    const image = req.body.image;
    let user = await axios
      .patch(
        'https://discord.com/api/users/@me',
        {
          image,
        },
        {
          headers: {
            Authorization: `Bot ` + process.env.DISCORD_CLIENT_TOKEN,
          },
        },
      )
      .then((user) => {
        return user.data;
      })
      .catch((err) => console.log(err));
    res.send(user);
  } else {
    res.status(201);
  }
}

export default handler;
