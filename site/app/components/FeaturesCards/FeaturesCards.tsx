'use client';
import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from '@mantine/core';
import {
  IconCloudComputing,
  IconTerminal2,
  IconCode,
} from '@tabler/icons-react';

import classes from './FeaturesCards.module.css';

const mockdata = [
  {
    title: 'Local or remote templates',
    description:
      'Include templates in your codebase, provide them on GitHub, or use <a href="/templates">the registry</a>',
    icon: IconCloudComputing,
  },
  {
    title: 'Interactive mode',
    description: 'Prompts the user for missing properties',
    icon: IconTerminal2,
  },
  {
    title: 'Any language',
    description:
      'Templates can be written in any language you want:<br />HTML, XML, CSS, SCSS, JavaScript, TypeScript, Python, Ruby, PHP, ColdFusion, COBOL...',
    icon: IconCode,
  },
];

export function FeaturesCards() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.magenta[6]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text
        fz="sm"
        c="dimmed"
        mt="sm"
        dangerouslySetInnerHTML={{ __html: feature.description }}
      >
        {/* {feature.description} */}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      {/* <Group justify="center">
        <Badge variant="filled" size="lg">
          Features
        </Badge>
      </Group> */}

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Features
      </Title>

      {/* <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Every once in a while, you’ll see a Golbat that’s missing some fangs.
        This happens when hunger drives it to try biting a Steel-type Pokémon.
      </Text> */}

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
