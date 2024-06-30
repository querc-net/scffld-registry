import Link from 'next/link';

export default async function Page() {
  return (
    <>
      <h2>Docs</h2>
      <p>
        Proper docs are coming soon, but for now you can check out the{' '}
        <Link href="https://github.com/lindsayevans/scffld/tree/develop/docs">
          GitHub repo
        </Link>
        .
      </p>
    </>
  );
}
