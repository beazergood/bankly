import { ComponentMeta, Story } from "@storybook/react";
import { AccountItem } from './item';
import { accounts as AccountsData } from '../../api/data/accounts';

export default {
    title: 'components/AccountItem',
    component: AccountItem,
} as ComponentMeta<typeof AccountItem>;

const Template: Story = (args) => (
    <AccountItem {...args} />
);

export const GBP = Template.bind({});
GBP.args = {
    account: AccountsData[0]
}

export const EUR = Template.bind({});
EUR.args = {
    account: AccountsData[1]
}

export const USD = Template.bind({});
USD.args = {
    account: AccountsData[2]
}