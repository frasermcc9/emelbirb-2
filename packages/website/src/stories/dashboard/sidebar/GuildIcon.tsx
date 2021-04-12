import { Guild } from "discord.js";
import React, { useContext } from "react";
import useDelimit from "../../../hooks/useDelimit";
import { useGuildContext } from "../../../hooks/useGuildContext";

export interface GuildIconProps {}

const GuildIcon: React.FC<GuildIconProps> = ({}) => {
  const guild = useGuildContext();

  const memberCountFormatted = useDelimit(guild.memberCount);

  let iconUrl;
  if (guild.icon) {
    iconUrl = guild.icon;
  }

  return (
    <div className="flex flex-col gap-y-4 text-center">
      <div className="rounded-full h-32 w-32 bg-red-400 border-4 overflow-hidden shadow mx-auto">
        {iconUrl && <img src={iconUrl} alt={"Server icon"} />}
      </div>
      {guild.name && (
        <div className="font-bold text-3xl text-f-light">{`${guild.name}`}</div>
      )}
      {guild.memberCount && (
        <div className="font-medium text-base text-f-light opacity-75">
          {`${memberCountFormatted} Members`}
        </div>
      )}
    </div>
  );
};

export default GuildIcon;
