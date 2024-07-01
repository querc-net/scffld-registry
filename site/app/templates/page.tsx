import * as scffld from '@scffld/cli';

import { getTemplates } from './getTemplates';
import { TemplateList } from '../components/TemplateList/TemplateList';
import { getTemplate } from './[name]/getTemplate';

export default async function Page() {
  const templateNames = await getTemplates();

  const getFullTemplates = async (templateNames: string[]) => {
    const templates = templateNames.map(async (name) => {
      const template = await getTemplate(name);
      const params = scffld.getTemplateParams(template);

      return {
        name,
        template,
        params,
      };
    });

    return await Promise.all(templates);
  };

  const templates = await getFullTemplates(templateNames);

  return (
    <>
      <h2>Templates</h2>
      <TemplateList templates={templates} />
      {/* <ol>
        {templates.map((template: string) => (
          <li key={template}>
            <Link href={`/templates/${template}`}>{template}</Link>
          </li>
        ))}
      </ol> */}
    </>
  );
}
