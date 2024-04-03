import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

import Image from 'next/image';

Image.defaultProps = {
  unoptimized: true,
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
