'use client';
import { useOs } from '@mantine/hooks';
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { IconBrandWindows, IconTerminal2 } from '@tabler/icons-react';

export const QuickstartCode: React.FC = () => {
  const os = useOs();

  return (
    <CodeHighlightTabs
      defaultActiveTab={os === 'windows' ? 1 : 0}
      code={[
        {
          fileName: 'sh',
          code: `npx @scffld/cli reg:hello \\\n    --name="Foo Bar"`,
          language: 'sh',
          icon: <IconTerminal2 size={16} />,
        },
        {
          fileName: 'cmd',
          code: `npx @scffld/cli reg:hello ^\n    --name="Foo Bar"`,
          language: 'sh',
          icon: <IconBrandWindows size={16} />,
        },
      ]}
    />
  );
};
