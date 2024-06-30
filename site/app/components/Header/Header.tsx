'use client';

import { Group } from '@mantine/core';
import Link from 'next/link';

import './Header.scss';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { Logo } from '../../../src/components/src/components/Logo/Logo';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>
        <Link href="/">
          <Logo />
        </Link>
      </h1>
      <Group>
        <ThemeToggle />
      </Group>
    </header>
  );
};
