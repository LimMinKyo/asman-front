import type { Meta, StoryObj } from '@storybook/react';

import TextAlert from './TextAlert';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Example/TextAlert',
  component: TextAlert,
  tags: ['autodocs'],
  // argTypes: {
  //   message: { control: 'color' },
  // },
} satisfies Meta<typeof TextAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Show: Story = {
  args: {
    message: 'should required validation.',
  },
};

export const Hide: Story = {
  args: {
    message: '',
  },
};
