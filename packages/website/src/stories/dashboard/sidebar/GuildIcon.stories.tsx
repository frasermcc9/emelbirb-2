import React from "react";
import { Story, Meta } from "@storybook/react";

import GuildIcon, { GuildIconProps } from "./GuildIcon";

export default {
  title: "dashboard/sidebar/Avatar",
  component: GuildIcon,
} as Meta;

const Template: Story<GuildIconProps> = (args) => <GuildIcon {...args} />;

export const AvatarTemplate = Template.bind({});
AvatarTemplate.args = {};
