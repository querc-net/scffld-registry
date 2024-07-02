import { InlineCodeHighlight } from '@mantine/code-highlight';

export default async function Page() {
  return (
    <>
      <h2>CLI</h2>

      <p>
        <strong>
          <code>@scffld/cli</code>
        </strong>{' '}
        is where all the magic happens - run without props to interactively step
        through them, or provide required props to get up & running quickly
      </p>

      <img
        src="/screenshot.svg"
        width={840}
        height={451}
        style={{ maxWidth: '100%', height: 'auto' }}
        alt="Example output from the scffld CLI"
      />

      <ul>
        <li>
          View the{' '}
          <a href="https://www.npmjs.com/package/@scffld/cli">NPM package</a>
        </li>
        <li>
          Read the{' '}
          <a href="https://github.com/scffld-dev/cli/blob/develop/docs/usage.md">
            usage
          </a>{' '}
          instructions on GitHub
        </li>
      </ul>
    </>
  );
}
