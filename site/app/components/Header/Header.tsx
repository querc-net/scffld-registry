'use client';

import { Group } from '@mantine/core';
import Link from 'next/link';

import './Header.scss';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>
        <Link href="/">scffld | Registry</Link>
      </h1>
      <Group>
        <ThemeToggle />
      </Group>
    </header>
  );
};
