import Link from 'next/link';

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json();
}

export default async function Page() {
  const posts = await getPosts();
  return (
    <>
      <h1>Posts</h1>
      <ol>
        {posts.map((post: any) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ol>
    </>
  );
}
