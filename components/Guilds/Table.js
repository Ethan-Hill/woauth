/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import { React, useState } from 'react';
import 'twin.macro';
import Guild from './Guild';

export default function UserContainer(props) {
  const { guilds } = props;
  const [showOwnerGuilds, setOwnerGuilds] = useState(false);

  const matches = guilds.filter((guild) => guild.owner).map((item) => item);

  function renderGuilds() {
    if (!showOwnerGuilds) {
      const guildItemNotOwner = guilds.map((guild) => (
        <Guild key={guild.id} guild={guild} />
      ));
      return guildItemNotOwner;
    }
    const guildItemOwner = matches.map((guild) => (
      <Guild key={guild.id} guild={guild} />
    ));
    return guildItemOwner;
  }

  return (
    <div tw="flex flex-wrap items-center w-full p-12 justify-between bg-Darkest rounded shadow-xl text-center">
      <div tw="flex justify-center items-center">
        <h1 tw="mx-2">Owner only</h1>
        <input
          type="checkbox"
          id="switch"
          onClick={() => setOwnerGuilds(!showOwnerGuilds)}
        />
      </div>
      {renderGuilds()}
    </div>
  );
}
