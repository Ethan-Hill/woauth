import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/client';
import Navbar from '../../../components/Navbar';

import 'twin.macro';

export default function Guild({ guild }) {
  const [showResults, setShowResults] = React.useState(false);
  const router = useRouter();
  const page = router.pathname;
  const newTitle = page.split('/');
  const title = newTitle[2].charAt(0).toUpperCase() + newTitle[2].slice(1);

  const [session, loading] = useSession();

  if (loading) {
    return <p>Loading...</p>;
  }

  const toggle = () => {
    setShowResults(!showResults);
  };

  return (
    <div>
      <Head>
        <title>Guilds</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        />
      </Head>
      <section tw="flex min-h-screen flex-col bg-Dark text-white">
        <Navbar
          page={title}
          session={session}
          showResults={showResults}
          setShowResults={toggle}
        />

        <main tw="flex min-h-full flex-grow bg-Dark">
          <div tw="flex w-screen flex-wrap items-center justify-center m-0 md:m-8">
            <h1>{guild}</h1>
          </div>
        </main>
      </section>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
    return {};
  }

  const res = await axios
    .get(`https://discord.com/api/guilds/${ctx.params.id}`, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`,
      },
    })
    .catch((err) => console.log(err));
  const { data } = res;

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      guild: data,
    },
  };
}
