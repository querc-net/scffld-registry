'use client';
import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import { AppShell, Burger, Group, NavLink, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBrandMastodon,
  IconBrandNpm,
  IconBrandGithub,
  IconTerminal2,
  IconBooks,
  IconMarkdown,
} from '@tabler/icons-react';

import { Logo } from '../Logo/Logo';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

import './Shell.scss';

export type ShellProps = {} & PropsWithChildren;

export const Shell: React.FC<ShellProps> = (props) => {
  const { children } = props;
  const [opened, { toggle }] = useDisclosure();
  const path = usePathname();

  return (
    <AppShell
      header={{ height: { base: 64, md: 64, lg: 64 } }}
      navbar={{
        width: { base: 200, md: 240 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Link href="/">
            <Logo />
          </Link>
          <div className="social">
            <Link href="https://www.npmjs.com/org/scffld" className="npm">
              <IconBrandNpm size={32} aria-label="NPM" />
            </Link>
            <Link href="https://github.com/scffld-dev" className="github">
              <IconBrandGithub size={32} aria-label="GitHub" />
            </Link>
            <Link
              rel="me"
              href="https://mastodon.social/@scffld"
              className="mastodon"
            >
              <IconBrandMastodon size={32} aria-label="Mastodon" />
            </Link>
          </div>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        {/* {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))} */}
        <AppShell.Section grow component={ScrollArea}>
          <NavLink
            href="/cli"
            label="CLI"
            variant="light"
            leftSection={<IconTerminal2 size="24px" />}
            active={path.startsWith('/cli')}
          />
          <NavLink
            href="/templates"
            label="Template registry"
            variant="light"
            leftSection={<IconMarkdown size="24px" />}
            active={path.startsWith('/templates')}
          />
          <NavLink
            href="/docs"
            label="Docs"
            variant="light"
            leftSection={<IconBooks size="24px" />}
            active={path.startsWith('/docs')}
          />
        </AppShell.Section>
        <AppShell.Section>
          <ThemeToggle />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
