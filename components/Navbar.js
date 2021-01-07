import React from 'react';
import { useRouter } from 'next/router';
import 'twin.macro';
import { useSession } from 'next-auth/client';
import Dropdown from './Dropdown';

export default function Navbar(props) {
  const router = useRouter();
  const [session] = useSession();

  const { page, setShowResults, showResults } = props;

  return (
    <>
      {session && (
        <>
          <div tw="flex justify-between w-full h-24 py-4 bg-Light">
            <nav tw="flex justify-evenly items-center">
              <h1 tw="text-xl mx-2 font-bold">{page}</h1>
              <a
                tw="mx-2 px-4 py-2 bg-Dark hover:bg-Darkest font-bold rounded cursor-pointer md:block hidden"
                href="/"
              >
                Home
              </a>
              <a
                tw="mx-2 px-4 py-2 bg-Dark hover:bg-Darkest font-bold rounded cursor-pointer md:block hidden"
                href="/dashboard"
              >
                Dashboard
              </a>
              <a
                tw="mx-2 px-4 py-2 bg-Dark hover:bg-Darkest font-bold rounded cursor-pointer md:block hidden"
                href="/dashboard/guilds"
              >
                Guilds
              </a>
            </nav>
            <div
              tw="flex justify-end items-center py-3 px-4 outline-none hover:bg-Darkest cursor-pointer rounded"
              onClick={setShowResults}
              onKeyPress={setShowResults}
              role="button"
              tabIndex={0}
            >
              <img
                src={session.user.image}
                tw="w-8 h-8 rounded-full mx-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://i.imgur.com/2O78wUO.jpg';
                }}
                alt="userIMG"
              />
              <h1 tw="h-8 text-xl font-bold">{session.user.name}</h1>
            </div>
            {showResults ? <Dropdown /> : null}
          </div>
        </>
      )}
      {!session && (
        <>
          <div tw="flex w-full justify-between h-24 py-4 bg-Light">
            <nav tw="flex justify-evenly items-center">
              <h1 tw="text-xl mx-2 font-bold">{page}</h1>
              <a
                tw="mx-2 px-4 py-2 bg-Dark hover:bg-Darkest font-bold rounded cursor-pointer md:block hidden"
                href="/"
              >
                Home
              </a>
            </nav>
            <div
              tw="flex justify-end items-center py-3 px-6 bg-Dark hover:bg-Darkest cursor-pointer rounded"
              onClick={() => router.push('/auth/signin')}
              onKeyPress={router.push('/auth/signin')}
              role="button"
              tabIndex={0}
            >
              <h1 tw="h-8 text-xl font-bold">Login</h1>
            </div>
          </div>
        </>
      )}
    </>
  );
}
