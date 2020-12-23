import React from 'react';
import 'twin.macro';
import Guild from './Guild';

export default function UserContainer(props) {
  const { guilds } = props;

  const guildItem = guilds.map((guild) => (
    <Guild key={guild.id} guild={guild} />
  ));

  return (
    <div tw="flex flex-col items-center p-12 justify-between bg-Darkest h-96 w-10/12 m-4 rounded shadow-xl text-center overflow-y-scroll">
      {guildItem}
    </div>
  );
}
