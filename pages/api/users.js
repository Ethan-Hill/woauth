import nextConnect from 'next-connect';

const handler = nextConnect();

// POST /api/users
handler.post(async (req, res) => {
  const { name, avatar, email } = req.body;

  await req.db
    .collection('users')
    .insertOne({ name, avatar, email })
    .then(() => {
      res.status(201);
    });
});

export default handler;
