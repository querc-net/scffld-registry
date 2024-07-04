'use client';
import {
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
  Button,
} from '@mantine/core';
import {
  IconRocket,
  IconCodeDots,
  IconAffiliate,
  IconArrowRight,
  IconBooks,
} from '@tabler/icons-react';

import classes from './FeaturesCards.module.css';

const mockdata = [
  {
    title: 'Super fast scaffolding',
    description:
      'scffld is quick - <500ms for remote templates and <100ms for local',
    icon: IconRocket,
  },
  {
    title: 'Local or remote templates',
    description:
      'Include templates in your codebase, provide them on GitHub, or use <a href="/templates">the registry</a>',
    icon: IconAffiliate,
  },
  {
    title: 'Reverse engineer existing code',
    description:
      'Use the <a href="https://github.com/scffld-dev/cli/blob/develop/docs/generator.md">generate</a> command to easily create a template from your existing source code',
    icon: IconCodeDots,
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

      <Group justify="center" mt={32}>
        <Button
          component="a"
          href="https://github.com/scffld-dev/cli/blob/develop/docs/usage.md"
          variant="light"
          leftSection={<IconBooks size={24} />}
          rightSection={<IconArrowRight size={14} />}
        >
          View usage for more features
        </Button>
      </Group>
    </Container>
  );
}
