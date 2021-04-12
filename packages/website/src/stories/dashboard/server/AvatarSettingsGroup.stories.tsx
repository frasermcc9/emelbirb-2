import React from "react";
import { Story, Meta } from "@storybook/react";

import AvatarSettingsGroup, {
  AvatarSettingsGroupProps,
} from "./AvatarSettingsGroup";

export default {
  title: "dashboard/server/AvatarSettingsGroup",
  component: AvatarSettingsGroup,
} as Meta;

const Template: Story<AvatarSettingsGroupProps> = (args) => (
  <AvatarSettingsGroup {...args} />
);

export const AvatarSettingsGroupTemplate = Template.bind({});
AvatarSettingsGroupTemplate.args = {
  currentNickname: "Fraserbot",
  currentPrefix: "%",
};
