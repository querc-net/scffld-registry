import React from 'react';
import { MantineProvider, ColorSchemeScript, Container } from '@mantine/core';
import PlausibleProvider from 'next-plausible';

import { theme } from '../theme';
import { Header } from './components/Header/Header';

import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import './layout.scss';

export const metadata = {
  title: 'scffld registry',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <PlausibleProvider domain="scffld.dev" trackOutboundLinks={true}>
            <Header />
            <Container fluid>{children}</Container>
          </PlausibleProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
