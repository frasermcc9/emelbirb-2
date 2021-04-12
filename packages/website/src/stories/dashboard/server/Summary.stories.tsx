import React from "react";
import { Story, Meta } from "@storybook/react";

import Summary, { SummaryProps } from "./Summary";

export default {
  title: "dashboard/server/Summary",
  component: Summary,
} as Meta;

const Template: Story<SummaryProps> = (args) => <Summary {...args} />;

export const SummaryTemplate = Template.bind({});
SummaryTemplate.args = {
  memberCount: 1000,
  owner: "Fraser",
  region: "Sydney",
  roleCount: 73,
  serverName: "DaBaby",
  textChannels: 40,
  voiceChannels: 12,
};
