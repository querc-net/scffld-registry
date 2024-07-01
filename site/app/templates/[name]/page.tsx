import { notFound } from 'next/navigation';
import * as scffld from '@scffld/cli';

import { getTemplates } from '../getTemplates';
import { getTemplate } from './getTemplate';
import { Template } from '../../components/Template/Template';

import './page.scss';

export async function generateStaticParams() {
  const templates = await getTemplates();

  return templates.map((template: string) => ({
    name: template,
  }));
}

export default async function Page({ params }: { params: { name: string } }) {
  const template = await getTemplate(params.name);

  if (!template) {
    notFound();
  }

  const templateParams = scffld.getTemplateParams(template);

  return (
    <main>
      {!templateParams.name && <h2>{params.name}</h2>}
      {templateParams.name && (
        <h2 className="template-name">
          {templateParams.name}
          <small>{params.name}</small>
        </h2>
      )}
      {/* <pre>{template}</pre> */}
      <Template
        name={params.name}
        template={template}
        params={templateParams}
      />
    </main>
  );
}
