import { TemplateStats } from './TemplateStats';

export const getStats = async (
  template: string
): Promise<TemplateStats | void> => {
  const url = `http://localhost:5068/TemplateStats/${template}`;
  // const url = `https://scffld-api.azurewebsites.net/TemplateStats/${template}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data) {
    return;
  }

  return data;
};
