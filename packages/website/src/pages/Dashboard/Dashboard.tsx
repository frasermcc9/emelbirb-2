import { useQuery } from "@apollo/client";
import React from "react";
import { useHistory } from "react-router-dom";
import Page from "../../core/Page";
import { QUERY_DISCORD_GUILD } from "../../graphql/functions/DiscordData";
import {
  GetDiscordGuild,
  GetDiscordGuildVariables,
} from "../../graphql/typings/GetDiscordGuild";
import { createGuildContext } from "../../hooks/useGuildContext";
import PageLink from "../../stories/dashboard/sidebar/PageLink";
import Sidebar from "../../stories/nav/Sidebar";
import Modules from "./Modules";
import ServerSummary from "./ServerSummary";

interface DashboardProps {
  location?: DashboardLocations;
}

type DashboardLocations = "summary" | "modules" | "logs";

const Dashboard: React.FC<DashboardProps> = ({ location }) => {
  //const guild: Partial<Guild> = SERVER_EXAMPLE;

  const { data } = useQuery<GetDiscordGuild, GetDiscordGuildVariables>(
    QUERY_DISCORD_GUILD,
    { variables: { id: "827768694426959883" } }
  );
  const history = useHistory();

  const GuildContext = createGuildContext();

  if (!data) {
    return <></>;
  }

  const SubPage: React.FC = () => {
    switch (location) {
      case "logs":
        return <></>;
      case "modules":
        return <Modules />;
      case "summary":
        return <ServerSummary />;
      default:
        return <></>;
    }
  };

  return (
    <Page>
      <GuildContext value={data?.getDiscordGuild}>
        <div className="flex flex-row gap-x-12 h-full min-h-screen ">
          <div className="md:block hidden">
            <Sidebar>
              <PageLink
                text="Server Details"
                active={location === "summary"}
                onClick={() => history.push("/dashboard/summary")}
              />
              <PageLink
                text="Modules"
                active={location === "modules"}
                onClick={() => history.push("/dashboard/modules")}
              />
              <PageLink
                text="Logs"
                active={location === "logs"}
                onClick={() => history.push("/dashboard/logs")}
              />
            </Sidebar>
          </div>
          <SubPage />
        </div>
      </GuildContext>
    </Page>
  );
};

export default Dashboard;
