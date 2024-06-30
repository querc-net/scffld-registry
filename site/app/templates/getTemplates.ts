import { globby } from 'globby';

export const getTemplates = async () => {
  const paths = await globby(['../templates/**/*.md']);

  return paths.map((x) => x.replace('../templates/', '').replace('.md', ''));
};
