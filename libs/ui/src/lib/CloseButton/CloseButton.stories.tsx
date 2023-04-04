import type { Meta } from '@storybook/react';
import { CloseButton } from './CloseButton';

const Story: Meta<typeof CloseButton> = {
  component: CloseButton,
  title: 'CloseButton',
};
export default Story;

const handleClick = () => {
  console.log('Clicked button!');
};

export const Default = {
  args: { onClick: handleClick },
};
