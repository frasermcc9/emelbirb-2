import React from "react";
import { Story, Meta } from "@storybook/react";

import Module, { ModuleProps } from "./Module";

export default {
  title: "Dashboard/Category",
  component: Module,
} as Meta;

const Template: Story<ModuleProps> = (args) => <Module {...args} />;

export const CategoryCard = Template.bind({});
CategoryCard.args = {
  description: "This is a brief description of this command category.",
  title: "Command Title",
};
export const ModerationCard = Template.bind({});
ModerationCard.args = {
  description: "Powerful and flexible commands to help with server moderation.",
  title: "Moderation",
};
export const EnabledCard = Template.bind({});
EnabledCard.args = {
  description: "This is an example of a module that is enabled in a server.",
  title: "Enabled Module",
  enabled: true,
};
