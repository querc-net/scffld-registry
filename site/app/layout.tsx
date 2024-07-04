import React from 'react';
import { MantineProvider, ColorSchemeScript, Container } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import NextTopLoader from 'nextjs-toploader';
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4F23C0" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <PlausibleProvider domain="scffld.dev" trackOutboundLinks={true}>
            <NextTopLoader
              color="#f01879"
              height={4}
              showSpinner={false}
              shadow="none"
            />
            <Notifications />
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
