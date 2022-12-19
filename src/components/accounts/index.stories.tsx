import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Accounts } from './index';
import * as AccountItemStories from './item.stories';

export default {
    title: 'components/Accounts',
    component: Accounts,
} as ComponentMeta<typeof Accounts>;

const Template: ComponentStory<typeof Accounts> = (args) => (
    <Accounts {...args} />
);

export const DataRow = Template.bind({});
DataRow.args = {
    accounts: [AccountItemStories?.GBP?.args?.account, AccountItemStories?.EUR?.args?.account, AccountItemStories?.USD?.args?.account]
}
