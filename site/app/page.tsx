import { Container, Title, Text, Button } from '@mantine/core';
import { InlineCodeHighlight } from '@mantine/code-highlight';

import { QuickstartCode } from './components/QuickstartCode/QuickstartCode';

import './page.scss';
import { FeaturesCards } from './components/FeaturesCards/FeaturesCards';

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
                  Simplified
                </Text>{' '}
                code scaffolding
              </Title>

              <Text className="description">
                <strong>scffld</strong> is a Node.js based code scaffolding
                tool, with all code templates defined in a single file
                <br />
                <br />
                Spend less time copy &amp; pasting, more time{' '}
                <span className="typing">
                  <code>coding</code>
                </span>
              </Text>
              <Text className="description">
                <h3>Quickstart</h3>
                <p>
                  Ensure you have <a href="https://nodejs.org/">Node</a> v18+
                  installed and run the following:
                </p>
                <QuickstartCode />
                <p>
                  ...now take a look at the file it created:{' '}
                  <InlineCodeHighlight
                    code="hello/Hello_FooBar.txt"
                    language="txt"
                  />
                </p>
              </Text>
              <Text className="description">
                <h3>Where to from here?</h3>
                <div className="ctas">
                  {/* <Button
                    component="a"
                    href="/cli"
                    variant="gradient"
                    gradient={{ from: 'purple', to: 'magenta' }}
                    size="xl"
                    className="control"
                  >
                    Get started
                  </Button> */}
                  <Button
                    variant="outline"
                    component="a"
                    href="/docs"
                    size="lg"
                    className="browse"
                  >
                    Read the docs
                  </Button>
                  <Button
                    variant="outline"
                    component="a"
                    href="/templates"
                    size="lg"
                    className="browse"
                  >
                    Browse templates
                  </Button>
                </div>
              </Text>
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
      <FeaturesCards />
    </>
  );
}
