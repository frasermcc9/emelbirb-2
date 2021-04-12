import React, { useContext } from "react";
import { useGuildContext } from "../../../hooks/useGuildContext";
import GuildIcon from "../sidebar/GuildIcon";
import CoreSettings from "./CoreSettings";

export interface AvatarSettingsGroupProps {
  currentNickname?: string;
  updateNickname?: (name: string) => void;
  currentPrefix?: string;
  updatePrefix?: (prefix: string) => void;
}

const AvatarSettingsGroup: React.FC<AvatarSettingsGroupProps> = (args) => {
  const guild = useGuildContext();

  return (
    <div className="flex lg:flex-row flex-col gap-x-20">
      <div>
        <GuildIcon {...guild} />
      </div>
      <div className="w-full">
        <CoreSettings {...args} {...guild} />
      </div>
    </div>
  );
};

export default AvatarSettingsGroup;
