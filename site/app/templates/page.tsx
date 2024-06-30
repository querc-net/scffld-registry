import Link from 'next/link';
import { getTemplates } from './getTemplates';

export default async function Page() {
  const templates = await getTemplates();

  return (
    <>
      <h2>Templates</h2>
      <ol>
        {templates.map((template: string) => (
          <li key={template}>
            <Link href={`/templates/${template}`}>{template}</Link>
          </li>
        ))}
      </ol>
    </>
  );
}
