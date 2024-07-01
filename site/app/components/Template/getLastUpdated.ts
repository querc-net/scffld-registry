export const getLastUpdated = async (template: string) => {
  const response = await fetch(
    `https://api.github.com/repos/scffld-dev/website/commits?path=templates/${template}.md&per_page=1`
  );
  const data = await response.json();

  if (!data || data.length !== 1) {
    return undefined;
  }

  return new Date(data[0].commit.author.date);
};
