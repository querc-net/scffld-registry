import { readFile } from 'node:fs/promises';

export const getTemplate = async (name: string) => {
  const templateContent = await readFile(`../templates/${name}.md`);

  return templateContent.toString();
};
