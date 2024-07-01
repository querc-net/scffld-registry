import React from 'react';
import { MantineProvider, ColorSchemeScript, Container } from '@mantine/core';
import PlausibleProvider from 'next-plausible';

import { theme } from '../theme';

import './layout.scss';
import { Shell } from './components/Shell/Shell';

export const metadata = {
  title: 'scffld',
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
            <Shell>
              <Container fluid py={0}>
                {children}
              </Container>
            </Shell>
          </PlausibleProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
