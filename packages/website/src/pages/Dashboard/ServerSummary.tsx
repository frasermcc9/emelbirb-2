import React from "react";
import { useHistory } from "react-router-dom";
import Page from "../../core/Page";
import AvatarSettingsGroup from "../../stories/dashboard/server/AvatarSettingsGroup";
import CoreSettings from "../../stories/dashboard/server/CoreSettings";
import Summary from "../../stories/dashboard/server/Summary";
import PageLink from "../../stories/dashboard/sidebar/PageLink";
import Sidebar from "../../stories/nav/Sidebar";

const ServerSummary: React.FC = () => {
  const settings = {
    serverImageUrl:
      "https://cdn.discordapp.com/icons/827768694426959883/3ed8bff40e1ffda3d4a8b313bf0e6860.webp",
    memberCount: 1000,
    serverName: "DaBaby",
    currentNickname: "Fraserbot",
    currentPrefix: "%",
  };

  return (
    <div className="px-4">
      <div className="text-4xl font-bold py-12 text-f-light lg:max-w-none mx-auto max-w-md">
        Server Summary
      </div>
      <div className="pb-4">
        <AvatarSettingsGroup {...settings} />
      </div>
      <div className="py-4">
        <Summary />
      </div>
    </div>
  );
};

export default ServerSummary;
