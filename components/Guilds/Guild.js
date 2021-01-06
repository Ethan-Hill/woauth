import React from 'react';
import 'twin.macro';

export default function Guild(props) {
  const { guild } = props;
  return (
    <div tw="bg-Dark ease-in-out w-full  transform transition duration-300 rounded shadow-xl flex flex-col justify-center p-12 mx-64 my-6 items-center">
      <img
        src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}
        tw="w-20 h-20 rounded-full"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://i.imgur.com/2O78wUO.jpg';
        }}
        alt="userIMG"
      />
      <div tw="text-center">
        <h1 tw="text-2xl font-bold m-2 ">{guild.name}</h1>
        <h1 tw="text-lg m-2 ">{guild.id}</h1>
      </div>
    </div>
  );
}
