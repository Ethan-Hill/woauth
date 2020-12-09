import nextConnect from "next-connect";
import middleware from "../../middlewares/middleware";

const handler = nextConnect();

handler.use(middleware); // see how we're reusing our middleware

// POST /api/users
handler.post(async (req, res) => {
  const { name, avatar, email } = req.body;

  await req.db
    .collection("users")
    .insertOne({ name, avatar, email })
    .then(() => {
      res.status(201);
    });
});

export default handler;
