import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getPost(id: number) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    return null;
  }

  return res.json();
}

export async function generateStaticParams() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return posts.map((post: any) => ({
    id: post.id.toString(),
  }));
}

export default async function Page({ params }: { params: { id: number } }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </main>
  );
}
