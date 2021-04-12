import React from "react";
import { Story, Meta } from "@storybook/react";

import ModuleCollection, { ModuleCollectionProps } from "./ModuleCollection";
import Module from "./Module";

export default {
  title: "Dashboard/ModuleCollection",
  component: ModuleCollection,
} as Meta;

const Template: Story<ModuleCollectionProps> = (args) => (
  <ModuleCollection {...args} />
);

export const ModuleCollectionExample = Template.bind({});
ModuleCollectionExample.args = {
  cards: [
    <Module
      title="Moderation"
      description="Powerful and flexible moderation commands."
    />,
    <Module
      title="Moderation"
      description="Powerful and flexible moderation commands."
    />,
    <Module
      title="Moderation"
      description="Powerful and flexible moderation commands."
    />,
    <Module
      title="Moderation"
      description="Powerful and flexible moderation commands."
    />,
    <Module
      title="Moderation"
      description="Powerful and flexible moderation commands."
    />,
    <Module
      title="Moderation"
      description="Powerful and flexible moderation commands."
    />,
  ],
};
