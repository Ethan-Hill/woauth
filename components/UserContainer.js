import React from 'react';
import 'twin.macro';

export default function UserContainer(props) {
  const { session } = props;
  const { user } = session;

  return (
    <div tw="flex flex-col items-center p-12 justify-between bg-Light h-64 w-80 m-4 rounded shadow-xl text-center ease-in-out transform hover:scale-110 transition duration-300">
      <img
        src={user.image}
        tw="w-20 h-20 rounded-full mx-2"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://i.imgur.com/2O78wUO.jpg';
        }}
        alt="userIMG"
      />
      <h1 tw="text-2xl font-bold m-2">
        {user.name}
        <span tw="text-sm">#{user.discriminator}</span>
      </h1>
    </div>
  );
}
