import React from "react";
import { Story, Meta } from "@storybook/react";

import Nav, { NavProps } from "./NavBar";

export default {
  title: "Navigation/Navbar",
  component: Nav,
} as Meta;

const Template: Story<NavProps> = (args) => <Nav {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  loggedIn: true,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  loggedIn: false,
};
