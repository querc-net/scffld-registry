import Link from 'next/link';

export default async function Page() {
  return (
    <>
      <h2>CLI</h2>
      <ul>
        <li>
          <a href="https://www.npmjs.com/package/@scffld/cli">NPM package</a>
        </li>
        <li>
          <a href="https://github.com/scffld-dev/cli/blob/develop/docs/usage.md">
            Usage
          </a>
        </li>
      </ul>
    </>
  );
}
