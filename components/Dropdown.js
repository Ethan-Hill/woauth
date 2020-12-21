import React from 'react';
import Popper from 'popper.js';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import 'twin.macro';

const Dropdown = ({ color }) => {
  const router = useRouter();
  // dropdown props
  const popoverDropdownRef = React.createRef();
  // bg colors
  let bgColor;
  color === 'white'
    ? (bgColor = 'bg-gray-800')
    : (bgColor = 'bg-' + color + '-500');

  return (
    <>
      <div tw="flex flex-wrap absolute right-0 top-16">
        <div tw="w-full sm:w-6/12 md:w-4/12 px-4">
          <div tw="relative inline-flex align-middle w-full">
            <div
              ref={popoverDropdownRef}
              tw="text-base z-50 bg-Light float-left py-2 list-none text-left rounded shadow-lg mt-1"
              style={{ minWidth: '12rem' }}
            >
              <a
                href="#pablo"
                tw="text-sm py-2 px-4 font-normal block w-full bg-transparent hover:bg-Darkest "
                onClick={(e) => e.preventDefault()}
              >
                Action
              </a>
              <a
                href="#pablo"
                tw="text-sm py-2 px-4 font-normal block w-full  bg-transparent hover:bg-Darkest"
                onClick={(e) => e.preventDefault()}
              >
                Another action
              </a>
              <a
                href="#pablo"
                tw="text-sm py-2 px-4 font-normal block w-full bg-transparent hover:bg-Darkest"
                onClick={(e) => e.preventDefault()}
              >
                Something else here
              </a>
              <div tw="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
              <a
                href="#"
                tw="text-sm py-2 px-4 font-normal block w-full  bg-transparent hover:bg-Darkest"
                onClick={signOut}
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function DropdownRender() {
  return (
    <>
      <Dropdown color="white" />
    </>
  );
}
