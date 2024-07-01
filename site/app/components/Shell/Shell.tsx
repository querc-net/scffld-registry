'use client';
import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import {
  AppShell,
  Burger,
  Group,
  NavLink,
  ScrollArea,
  Skeleton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Logo } from '../Logo/Logo';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

export type ShellProps = {} & PropsWithChildren;

export const Shell: React.FC<ShellProps> = (props) => {
  const { children } = props;
  const [opened, { toggle }] = useDisclosure();
  const path = usePathname();

  return (
    <AppShell
      header={{ height: { base: 64, md: 64, lg: 64 } }}
      navbar={{
        width: { base: 200, md: 300 },
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
            href="/templates"
            label="Templates"
            variant="light"
            active={path.startsWith('/templates')}
          />
          <NavLink
            href="/docs"
            label="Docs"
            variant="light"
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
