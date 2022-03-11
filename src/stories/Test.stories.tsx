import React from "react";
import { Test } from "../index";

export default {
    title: 'Example/Test',
    component: Test,
    argTypes: {
        text: {
            control: {
                type: "text"
            }
        }
    }
};

const Template = (args) => <Test {...args} />;

export const Tested = Template.bind({});
Tested.args = {
    text: "ddd",
};

export const Testea = Template.bind({});
Testea.args = {};