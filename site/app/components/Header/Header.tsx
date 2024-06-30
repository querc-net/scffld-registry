'use client';

import { Group, NavLink } from '@mantine/core';
import Link from 'next/link';

import './Header.scss';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { usePathname } from 'next/navigation';
import { Logo } from '../Logo/Logo';

export const Header: React.FC = () => {
  const path = usePathname();
  return (
    <header className="header">
      <h1>
        <Link href="/">
          <Logo />
        </Link>
      </h1>
      <nav className="header__nav">
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
      </nav>
      <div className="header__tools">
        <ThemeToggle />
      </div>
    </header>
  );
};
