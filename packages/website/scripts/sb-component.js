const { red } = require("@material-ui/core/colors");
const fs = require("fs");
const { basename, dirname } = require("path");
const { exit } = require("process");
const prompts = require("prompts");

const component = (name) =>
  `import React from "react";

export interface ${name}Props {}

const ${name}: React.FC<${name}Props> = ({}) => {
  return <div></div>;
};

export default ${name};
`;

const story = (name, path) =>
  `import React from "react";
import { Story, Meta } from "@storybook/react";

import ${name}, { ${name}Props } from "./${name}";

export default {
  title: "${path}",
  component: ${name},
} as Meta;

const Template: Story<${name}Props> = (args) => <${name} {...args} />;

export const ${name}Template = Template.bind({});
${name}Template.args = {};
`;

(async () => {
  const response = await prompts({
    type: "text",
    name: "dir",
    message: "Where should this component be located (i.e. nav/Sidebar)",
  });

  if (!response) {
    console.log(red("Storybook component creation failed."));
    exit(0);
  }

  const path = response.dir;
  const filename = basename(path);
  const dir = dirname(path);

  fs.mkdirSync(`./src/stories/${dir}`, { recursive: true });

  fs.writeFileSync(`./src/stories/${response.dir}.tsx`, component(filename));
  fs.writeFileSync(
    `./src/stories/${response.dir}.stories.tsx`,
    story(filename, path)
  );
})();
