import React from "react";
import { Story, Meta } from "@storybook/react";

import CoreSettings, { CoreSettingsProps } from "./CoreSettings";

export default {
  title: "dashboard/server/CoreSettings",
  component: CoreSettings,
} as Meta;

const Template: Story<CoreSettingsProps> = (args) => <CoreSettings {...args} />;

export const CoreSettingsTemplate = Template.bind({});
CoreSettingsTemplate.args = {
  currentNickname: "Fraserbot",
  currentPrefix: "%",
};
