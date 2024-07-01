'use client';

import { MantineColorsTuple, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';

const magenta: MantineColorsTuple = [
  '#ffe9f6',
  '#ffd1e6',
  '#faa1c9',
  '#f66eab',
  '#f24391',
  '#f02881',
  '#f01879',
  '#d60867',
  '#c0005c',
  '#a9004f',
];

const purple: MantineColorsTuple = [
  '#f3edff',
  '#e0d7fa',
  '#beabf0',
  '#9a7ce6',
  '#7c56de',
  '#683dd9',
  '#5f2fd8',
  '#4f23c0',
  '#451eac',
  '#3a1899',
];

export const theme = createTheme({
  primaryColor: 'purple',
  colors: {
    magenta,
    purple,
  },
});
