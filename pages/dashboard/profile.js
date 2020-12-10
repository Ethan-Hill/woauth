import Head from "next/head";
import axios from "axios";
import React from "react";
import Dropdown from "../../components/Dropdown";
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import "twin.macro";

export default function Dashboard({ guilds }) {
  const [session, loading] = useSession();
  const [showResults, setShowResults] = React.useState(false);
  const onClick = () => setShowResults(!showResults);
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        />
      </Head>
      <section tw="flex min-h-screen flex-col min-w-screen bg-Dark text-white">
        <div tw="flex w-screen  justify-between h-24 py-4 px-6 bg-Light">
          <nav tw="flex justify-evenly items-center">
            <h1 tw="text-xl mx-2 font-bold">Dashboard</h1>
            <a
              href="/dashboard"
              tw="mx-2 px-4 py-2 bg-Dark hover:bg-Darkest font-bold rounded cursor-pointer md:block hidden"
            >
              Home
            </a>
            <a
              href="#"
              tw="mx-2 px-4 py-2 bg-Dark hover:bg-Darkest font-bold rounded cursor-pointer md:block hidden"
            >
              Guilds
            </a>
          </nav>
          <div
            tw="flex justify-end items-center py-3 px-4 hover:bg-Darkest cursor-pointer rounded"
            onClick={onClick}
          >
            <img
              src={session.user.image}
              tw="w-8 h-8 rounded-full mx-2"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://i.imgur.com/2O78wUO.jpg";
              }}
            />
            <h1 tw="h-8 text-xl font-bold">{session.user.name}</h1>
          </div>
          {showResults ? <Dropdown /> : null}
        </div>

        <main tw="flex min-h-full flex-grow bg-Dark">
          <div tw="flex w-screen flex-wrap items-center justify-center m-0 md:m-8">
            <div tw="flex flex-col items-center p-12 justify-between bg-Light h-64 w-80 m-4 rounded shadow-xl text-center ease-in-out transform hover:scale-125 transition duration-300">
              <img
                src={session.user.image}
                tw="w-20 h-20 rounded-full mx-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://i.imgur.com/2O78wUO.jpg";
                }}
              />
              <h1 tw="text-2xl font-bold m-2">
                {session.user.name}
                <span tw="text-sm">#{session.user.discriminator}</span>
              </h1>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
/*Profile.getInitialProps = async (ctx) => {
  const session = await getSession(ctx);
  const res = await axios.get("http://localhost:3000/api/user", {
    params: { token: session.user.accessToken, id: session.user.id },
  });
  const data = res.data;
  return { user: data };
};*/
