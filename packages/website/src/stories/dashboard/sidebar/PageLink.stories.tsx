import React from "react";
import { Story, Meta } from "@storybook/react";

import PageLink, { PageLinkProps } from "./PageLink";

export default {
  title: "dashboard/sidebar/PageLink",
  component: PageLink,
} as Meta;

const Template: Story<PageLinkProps> = (args) => <PageLink {...args} />;

export const PageLinkActive = Template.bind({});
PageLinkActive.args = {
  text: "Modules",
  active: true,
};
export const PageLinkInactive = Template.bind({});
PageLinkInactive.args = {
  text: "Modules",
  active: false,
};
