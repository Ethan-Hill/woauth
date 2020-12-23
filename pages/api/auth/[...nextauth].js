/* eslint-disable no-param-reassign */
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  site: process.env.NEXTAUTH_URL,

  // Configure one or more authentication providers
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  database: process.env.DATABASE_URL,
  session: {
    jwt: true,
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: 'hfsrhgksgnsgnsghlwsngkljshgsh',
  callbacks: {
    jwt: async (token, user, account, profile) => {
      // Add auth_time to token on signin in
      if (user) {
        token.accessToken = account.accessToken;
        token.id = profile.id;
        token.discriminator = profile.discriminator;
      }
      return Promise.resolve(token);
    },
    session: async (session, token) => {
      session.user.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.discriminator = token.discriminator;

      return session;
    },
    redirect: async (url) => {
      if (url === '/api/auth/signin') {
        return Promise.resolve('/dashboard');
      }
      return Promise.resolve('/api/auth/signin');
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
