'use client';

import { useMantineColorScheme, Group, Button } from '@mantine/core';

export const Header: React.FC = () => {
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();

  return (
    <header>
      <h1>scffld | Registry</h1>
      <Group>
        <Button onClick={() => setColorScheme('light')}>Light</Button>
        <Button onClick={() => setColorScheme('dark')}>Dark</Button>
        <Button onClick={() => setColorScheme('auto')}>Auto</Button>
        <Button onClick={clearColorScheme}>Clear</Button>
      </Group>
    </header>
  );
};
