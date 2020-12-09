import Head from "next/head";
import { useRouter } from "next/router";
import "twin.macro";
import { signIn, signOut, useSession } from "next-auth/client";
export default function Home() {
  const [session, loading] = useSession();
  const router = useRouter();
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {!session && (
        <>
          <div>
            <Head>
              <title>Home</title>
              <link rel="icon" href="/favicon.ico" />
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
              />
            </Head>
            <main tw="flex justify-center h-screen w-screen">
              <div tw="flex flex-col items-center justify-center w-96 h-96 mt-36">
                <h1 tw="text-3xl my-5">Login here 👇</h1>

                <button
                  onClick={signIn}
                  tw="mt-3 mx-12 text-lg font-semibold 
                bg-gray-800 w-full text-white rounded-lg
                px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                >
                  <i className="fab fa-discord"></i>
                  <span tw="ml-2">Login</span>
                </button>
              </div>
            </main>
          </div>
        </>
      )}
      {session && (
        <>
          <Head>
            <title>Profile</title>
            <link rel="icon" href="/favicon.ico" />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
            />
          </Head>
          <main tw="flex justify-center h-screen w-screen">
            <div tw="flex flex-col items-center justify-center w-96 h-96 mt-36">
              <h1 tw="text-3xl my-5">Hey {session.user.name} 👋</h1>
              <button
                onClick={signOut}
                tw="mt-3 mx-12 text-lg font-semibold 
		  bg-gray-800 w-full text-white rounded-lg
		  px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
              >
                <span tw="ml-2">Logout</span>
              </button>
            </div>
          </main>
        </>
      )}
    </>
  );
}
