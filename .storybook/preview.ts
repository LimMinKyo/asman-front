import type { Preview } from '@storybook/react';
import '../styles/globals.css';

import Image from 'next/image';

Image.defaultProps = {
  unoptimized: true,
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
