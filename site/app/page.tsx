import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <div>Home page</div>
      <p>
        <Link href="/posts">Posts</Link>
      </p>
    </>
  );
}
