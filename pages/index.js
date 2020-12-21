import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import 'twin.macro';

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const title = 'Home';
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
        <title>Home</title>
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
          <div tw="flex flex-col w-screen flex-wrap items-center justify-around m-0 md:m-8">
            <div tw="text-center">
              <h1 tw="text-4xl font-bold">Welcome</h1>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}
