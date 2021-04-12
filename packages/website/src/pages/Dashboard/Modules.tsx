import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { QUERY_FETCH_MODULES } from "../../graphql/functions/BotData";
import {
  MUTATE_TOGGLE_BLOCKED,
  QUERY_GUILD,
} from "../../graphql/functions/Server";
import { FetchModules } from "../../graphql/typings/FetchModules";
import { GetServer, GetServerVariables } from "../../graphql/typings/GetServer";
import {
  ToggleBlocked,
  ToggleBlockedVariables,
} from "../../graphql/typings/ToggleBlocked";
import { useGuildContext } from "../../hooks/useGuildContext";
import Module from "../../stories/dashboard/modules/Module";
import ModuleCollection from "../../stories/dashboard/modules/ModuleCollection";

const Modules: React.FC = () => {
  const guild = useGuildContext();

  const { data: botModulesData } = useQuery<FetchModules>(QUERY_FETCH_MODULES);
  const { data: serverModulesData } = useQuery<GetServer, GetServerVariables>(
    QUERY_GUILD,
    {
      variables: {
        id: guild.id,
      },
    }
  );

  const [toggleBlocked] = useMutation<ToggleBlocked, ToggleBlockedVariables>(
    MUTATE_TOGGLE_BLOCKED
  );

  const toggleModule = async (groupName: string) => {
    await toggleBlocked({
      variables: { id: guild.id, toggleBlocked: groupName },
    });
  };

  const size = botModulesData?.fetchModules.commandGroups?.length ?? 0;
  const refs: React.MutableRefObject<HTMLElement | null>[] = React.useMemo(() => {
    const internalRef = [];
    for (let index = 0; index < size; index++) {
      internalRef.push(React.createRef<HTMLElement | null>());
    }
    return internalRef;
  }, [size]);

  React.useEffect(() => {
    const maxHeight = Math.max(
      ...refs.map((e) => e.current?.clientHeight ?? 0)
    );

    refs.forEach((r) => {
      if (r.current) {
        r.current.style.height = maxHeight + "px";
      }
    });
  }, [refs, botModulesData, serverModulesData]);

  let descriptions = botModulesData?.fetchModules.commandDescriptions;

  if (
    !botModulesData?.fetchModules.commandGroups ||
    !serverModulesData?.getServer
  )
    return <></>;

  if (!descriptions) descriptions = [];

  console.log(serverModulesData.getServer.disabledGroups);

  return (
    <div className="w-full">
      <div className="text-4xl font-bold py-12 text-f-light lg:max-w-none mx-auto max-w-md">
        Dashboard
      </div>
      <div className="w-full mb-12">
        <ModuleCollection
          cards={botModulesData.fetchModules.commandGroups.map((group, idx) => (
            <Module
              ref={refs[idx]}
              title={group}
              description={descriptions![idx] ?? ""}
              enabled={
                !serverModulesData?.getServer.disabledGroups.includes(
                  group.toLowerCase()
                )
              }
              onSwitchChange={toggleModule}
            />
          ))}
        />
      </div>
    </div>
  );
};

export default Modules;
