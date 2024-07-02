'use client';
import { Divider, Grid, Skeleton, Table, Tabs } from '@mantine/core';
import { CodeHighlight, CodeHighlightTabs } from '@mantine/code-highlight';
import { GithubIcon } from '@mantinex/dev-icons';
import * as scffld from '@scffld/cli';
import markdownit, { Token } from 'markdown-it';

import './Template.scss';
import React, { useEffect, useState } from 'react';
import { getLastUpdated } from './getLastUpdated';
import { getFileSize } from './getFileSize';

export type TemplateProps = {
  name: string;
  template: string;
  params: scffld.TemplateParams;
};

export const Template: React.FC<TemplateProps> = (props) => {
  const { name, template, params } = props;

  const usageCommand = `npx @scffld/cli reg:${name}`;
  let hasUsage = false;

  const usageStartComment = '<!-- @scffld-usage-start -->';
  const usageEndComment = '<!-- @scffld-usage-end -->';
  const usageStartCommentPosition = template.indexOf(usageStartComment);
  const usageEndCommentPosition = template.indexOf(usageEndComment);
  let usageMarkup = '';
  let usageElements: React.JSX.Element[] = [];

  if (usageStartCommentPosition > 0 && usageEndCommentPosition > 0) {
    hasUsage = true;
    const usageMarkdown = template
      .substring(usageStartCommentPosition, usageEndCommentPosition)
      .replace(usageStartComment, '')
      .replace(usageEndComment, '')
      .replace('### ', '#### ')
      .replace('## ', '### ')
      .replace('# ', '## ');

    const md = markdownit();
    // usageMarkup = md.render(usageMarkdown);
    const usageMarkdownParsed = md.parse(usageMarkdown, {});
    usageElements = usageMarkdownParsed
      .map((token, i) => {
        let el = <p>{token.content}</p>;
        if (i > 1 && usageMarkdownParsed[i - 1].type === 'heading_open') {
          el = <h4>{token.content}</h4>;
        }

        if (token.type === 'fence' && token.tag === 'code') {
          el = <CodeHighlight code={token.content} language={token.info} />;
        }

        return el;
      })
      .filter((x) => x !== null);
  }

  const postInstallCode = [];

  if (params.postInstallMessage) {
    postInstallCode.push({
      fileName: 'Message',
      code: params.postInstallMessage,
      language: 'markdown',
    });
  }
  if (params.postInstallCommands) {
    postInstallCode.push({
      fileName: 'Commands',
      code: params.postInstallCommands.join('\n'),
      language: 'sh',
    });
  }

  const codeUrl = `https://github.com/scffld-dev/website/blob/main/templates/${name}.md`;

  const [lastUpdated, setLastUpdated] = useState<Date>();
  useEffect(() => {
    getLastUpdated(name).then((x) => {
      setLastUpdated(x);
    });
  }, []);

  const templateSize = getFileSize(template);

  const maxFiles = template.match(/```[^\s]+ {\s?filename:\s?'/gi)?.length;
  let minFiles = maxFiles;
  const conditionalFiles = template.match(
    /```[^\s]+ {[^,]+,\s?condition: /gi
  )?.length;
  if (maxFiles !== undefined && conditionalFiles !== undefined) {
    minFiles = maxFiles - conditionalFiles;
  }

  return (
    <div className="template">
      <Grid>
        <Grid.Col span={{ base: 12, md: 9, lg: 10 }}>
          <Tabs defaultValue="overview">
            <Tabs.List>
              <Tabs.Tab value="overview">Overview</Tabs.Tab>
              <Tabs.Tab value="params">Params</Tabs.Tab>
              <Tabs.Tab value="raw">Raw template</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="overview">
              {params.description && (
                <>
                  <p className="description">{params.description}</p>
                  <Divider my="md" />
                </>
              )}

              {!hasUsage && <h3>Usage</h3>}
              {!hasUsage && <CodeHighlight code={usageCommand} language="sh" />}
              {/* {hasUsage && (
                <div
                  className="usage"
                  dangerouslySetInnerHTML={{ __html: usageMarkup }}
                ></div>
              )} */}
              {hasUsage && <div className="usage">{usageElements}</div>}
            </Tabs.Panel>
            <Tabs.Panel value="params">
              {params.outputDirectory && (
                <>
                  <h3>Default output directory</h3>
                  <pre>{params.outputDirectory}</pre>
                </>
              )}

              <h3>Props</h3>
              {params.props && (
                <Table
                  stickyHeader
                  striped
                  highlightOnHover
                  withRowBorders={false}
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Name</Table.Th>
                      <Table.Th>Description</Table.Th>
                      <Table.Th>Default value</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {params.props &&
                      Object.keys(params.props).map((prop) => (
                        <Table.Tr key={prop}>
                          <Table.Th>
                            {prop}
                            {params.props && params.props[prop].required && (
                              <b style={{ color: 'red' }}> *</b>
                            )}
                            <br />
                            <small style={{ color: 'gray' }}>
                              {params.props && params.props[prop].type}
                              {params.props &&
                                params.props[prop].type === 'list' && (
                                  <>
                                    :{' '}
                                    <i>
                                      {params.props[prop].options?.join(', ')}
                                    </i>
                                  </>
                                )}
                            </small>
                          </Table.Th>
                          <Table.Td>
                            <p>
                              {params.props && params.props[prop].description}
                            </p>
                            {/* <pre>
                        {params.props
                          ? JSON.stringify(params.props[prop], null, 2)
                          : ''}
                      </pre> */}
                          </Table.Td>
                          <Table.Td>
                            <p>
                              {params.props &&
                                params.props[prop].default?.toString()}
                            </p>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                  </Table.Tbody>
                </Table>
              )}

              {postInstallCode.length > 0 && (
                <>
                  <h3>Post install</h3>
                  <p>
                    <CodeHighlightTabs
                      withExpandButton
                      defaultExpanded={false}
                      withCopyButton={false}
                      code={postInstallCode}
                    />
                  </p>
                </>
              )}
            </Tabs.Panel>
            <Tabs.Panel value="raw">
              <a
                className="template-link"
                href={codeUrl}
                target="_blank"
                rel="external"
              >
                <GithubIcon size={24} />
                <code>{codeUrl}</code>
              </a>
              <CodeHighlight code={template} language="markdown" />
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3, lg: 2 }} className="metadata">
          {params.keywords && (
            <>
              <h3>Keywords</h3>
              <ul className="keywords">
                {params.keywords.map((keyword) => (
                  <li key={keyword}>{keyword}</li>
                ))}
              </ul>
            </>
          )}
          {params.authors && (
            <>
              <h3>Author{params.authors.length > 1 && 's'}</h3>
              <ul className="authors">
                {params.authors.map((author) => (
                  <li key={author}>
                    <a href={`https://github.com/${author}`} rel="external">
                      {author}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
          {params.contributors && (
            <>
              <h3>Contributors</h3>
              <ul className="contributors">
                {params.contributors.map((contributor) => (
                  <li key={contributor}>
                    <a
                      href={`https://github.com/${contributor}`}
                      rel="external"
                    >
                      {contributor}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          <h3>Last updated</h3>
          <p title={lastUpdated && lastUpdated.toISOString()}>
            {!lastUpdated && <Skeleton height="1rem" width="200px" />}
            {lastUpdated &&
              new Intl.DateTimeFormat(undefined, {
                dateStyle: 'long',
                timeZone: 'Australia/Sydney',
              }).format(lastUpdated)}
          </p>

          <h3>Template size</h3>
          <p>{templateSize}</p>

          <h3>Files created</h3>
          <p>
            {minFiles === maxFiles ? minFiles : `${minFiles} - ${maxFiles}`}
          </p>
        </Grid.Col>
      </Grid>
    </div>
  );
};
