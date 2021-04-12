import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import React from "react";
import { useGuildContext } from "../../../hooks/useGuildContext";
dayjs.extend(advancedFormat);

export interface SummaryProps {}

const Summary: React.FC<SummaryProps> = () => {
  const guild = useGuildContext();

  const formatDate = (date?: number | null) => {
    if (!date) return null;
    return dayjs(date).format("Do MMMM, YYYY");
  };

  return (
    <div className="text-f-light shadow rounded bg-f-semidark p-4 max-w-4xl">
      <div className="uppercase font-bold text-xl pb-6">
        <span className="text-f-primary font-bold">{guild.name}</span> At A
        Glance
      </div>
      <div className="flex flex-row pb-2">
        <div className="flex flex-col gap-y-4">
          <StackedText top="Members" bot={guild.memberCount ?? 0} />
          <StackedText top="Owner" bot={guild.owner?.username ?? "Unknown"} />
        </div>
        <div className="flex flex-col gap-y-4">
          <StackedText top="Text Channels" bot={guild.textChannelCount ?? 0} />
          <StackedText
            top="Created"
            bot={formatDate(guild.createdTimestamp) ?? "Unknown"}
          />
        </div>
        <div className="flex flex-col gap-y-4">
          <StackedText
            top="Voice Channels"
            bot={guild.voiceChannelCount ?? 0}
          />
          <StackedText top="Region" bot={guild.region ?? "Unknown"} />
        </div>
        <div className="flex flex-col gap-y-4">
          <StackedText top="Roles" bot={guild.roleCount ?? 0} />
          <StackedText top="Boosts" bot={guild.premiumSubscriptionCount ?? 0} />
        </div>
      </div>
    </div>
  );
};

const StackedText: React.FC<{ top: string | number; bot: string | number }> = ({
  top,
  bot,
}) => (
  <div className="flex flex-col pr-24">
    <div className="text-f-primary font-bold text-lg">{top}</div>
    <div className="font-medium">{bot ?? 0}</div>
  </div>
);

export default Summary;
