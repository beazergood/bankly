import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TransactionHistory } from './index';
import * as TransactionStories from './item.stories';

export default {
    title: 'components/TransactionHistory',
    component: TransactionHistory,
} as ComponentMeta<typeof TransactionHistory>;

const Template: ComponentStory<typeof TransactionHistory> = (args) => (
    <div className="container">
        <TransactionHistory {...args} />
    </div>
);

export const Primary = Template.bind({});
Primary.args = {
    transactions: [TransactionStories?.ExpOne?.args?.transaction, TransactionStories?.ExpTwo?.args?.transaction, TransactionStories?.ExpThree?.args?.transaction, TransactionStories?.IncOne?.args?.transaction]
};

export const LoadingState = Template.bind({});
LoadingState.args = {
    transactions: [],
    errorText: '',
    isLoading: true
};

export const ErrorState = Template.bind({});
ErrorState.args = {
    transactions: [],
    errorText: 'Something went wrong 🙀',
    isLoading: false
};
