import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Loading } from './index';

export default {
  title: 'components/Loading',
  component: Loading,
} as ComponentMeta<typeof Loading>;

export const Primary: ComponentStory<typeof Loading> = () => (
  <Loading />
);

