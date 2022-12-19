import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Header } from './index';

export default {
    title: 'components/Header',
    component: Header,
} as ComponentMeta<typeof Header>;

export const Primary: ComponentStory<typeof Header> = () => (
    <Header />
);

