import { Container, Title, Text, Button } from '@mantine/core';

import './page.scss';
import { InlineCodeHighlight } from '@mantine/code-highlight';

export default function HomePage() {
  return (
    <>
      <div className="hero">
        <Container size="lg">
          <div className="inner">
            <div className="content">
              <Title className="title">
                <Text
                  component="span"
                  inherit
                  variant="gradient"
                  gradient={{ from: 'purple', to: 'magenta' }}
                >
                  Simplify
                </Text>{' '}
                your code generation &amp; scaffolding
              </Title>

              <Text className="description" mt={30}>
                <strong>scffld</strong> is a simple code scaffolding tool
                utilising a single Markdown file to define templates &
                properties
                <br />
                <br />
                Spend less time copy &amp; pasting, more time{' '}
                <span className="typing">
                  <code>coding</code>
                </span>
                {/* <InlineCodeHighlight code="coding" lang="ts" /> */}
              </Text>
              <div className="ctas">
                <Button
                  component="a"
                  href="/cli"
                  variant="gradient"
                  gradient={{ from: 'purple', to: 'magenta' }}
                  size="xl"
                  className="control"
                  mt={40}
                >
                  Get started
                </Button>
                <Button
                  variant="outline"
                  component="a"
                  href="/templates"
                  size="xl"
                  className="browse"
                  mt={40}
                >
                  Browse templates
                </Button>
              </div>
            </div>
            <div className="attribution">
              Photo by{' '}
              <a href="https://unsplash.com/@christopher__burns?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                Christopher Burns
              </a>{' '}
              on{' '}
              <a href="https://unsplash.com/photos/person-holding-tool-during-daytime-8KfCR12oeUM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                Unsplash
              </a>
            </div>
          </div>
        </Container>
      </div>
      {/* <p>[Hero]</p> */}
      {/* <p>[Features]</p> */}
    </>
  );
}
