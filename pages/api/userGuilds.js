import Cors from "cors";
import axios from "axios";
import { getSession } from "next-auth/client";
const secret = process.env.JWT_SECRET;

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
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
  if (req.method === "GET") {
    const token = req.query.token;
    console.log(token);

    let guilds = await axios
      .get("https://discord.com/api/users/@me/guilds", {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((guilds) => {
        return guilds;
      })
      .catch((err) => console.log(err));
    res.send(guilds.data);
  } else {
    res.status(201);
  }
}

export default handler;
