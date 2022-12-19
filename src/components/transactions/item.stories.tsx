import { ComponentMeta, Story } from "@storybook/react";
import { Transaction } from './item';
import { transactions as TransactionsData } from '../../api/data/transactions';

export default {
    title: 'components/Transaction',
    component: Transaction,
} as ComponentMeta<typeof Transaction>;

const Template: Story = (args) => (
    <Transaction {...args} />
);

export const ExpOne = Template.bind({});
ExpOne.args = {
    transaction: TransactionsData[1]
};

export const ExpTwo = Template.bind({});
ExpTwo.args = {
    transaction: TransactionsData[2]
};

export const ExpThree = Template.bind({});
ExpThree.args = {
    transaction: TransactionsData[3]
};

export const IncOne = Template.bind({});
IncOne.args = {
    transaction: TransactionsData[0]
};