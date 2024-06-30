'use client';
import { Table, Tabs } from '@mantine/core';
import { CodeHighlight, CodeHighlightTabs } from '@mantine/code-highlight';
import { GithubIcon } from '@mantinex/dev-icons';
import * as scffld from '@querc/scffld';

import './Template.scss';

export type TemplateProps = {
  name: string;
  template: string;
  params: scffld.TemplateParams;
};

export const Template: React.FC<TemplateProps> = (props) => {
  const { name, template, params } = props;

  // TODO: extract usage command from template
  // Something like:
  // ```sh { usage }
  const usageCommand = `npx @querc/scffld reg:${name}`;

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

  const codeUrl = `https://github.com/querc-net/scffld-registry/blob/main/templates/${name}.md`;

  return (
    <Tabs defaultValue="overview">
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="params">Params</Tabs.Tab>
        <Tabs.Tab value="raw">Raw template</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="overview">
        <h3>Usage</h3>
        <CodeHighlight code={usageCommand} language="sh" />
      </Tabs.Panel>
      <Tabs.Panel value="params">
        {params.outputDirectory && (
          <>
            <h3>Default output directory</h3>
            <pre>{params.outputDirectory}</pre>
          </>
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

        {/* {params.postInstallCommands && (
          <p>
            <b>Post install commands:</b>

            <CodeHighlight
              code={params.postInstallCommands.join('\n')}
              language="sh"
              withCopyButton={false}
            />
          </p>
        )} */}

        <h3>Props</h3>
        {params.props && (
          <Table stickyHeader striped highlightOnHover withRowBorders={false}>
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
                        {params.props && params.props[prop].type === 'list' && (
                          <>
                            : <i>{params.props[prop].options?.join(', ')}</i>
                          </>
                        )}
                      </small>
                    </Table.Th>
                    <Table.Td>
                      <p>{params.props && params.props[prop].description}</p>
                      {/* <pre>
                        {params.props
                          ? JSON.stringify(params.props[prop], null, 2)
                          : ''}
                      </pre> */}
                    </Table.Td>
                    <Table.Td>
                      <p>
                        {params.props && params.props[prop].default?.toString()}
                      </p>
                    </Table.Td>
                  </Table.Tr>
                ))}
            </Table.Tbody>
          </Table>
        )}
      </Tabs.Panel>
      <Tabs.Panel value="raw">
        <a className="template-link" href={codeUrl} target="_blank">
          <GithubIcon size={24} />
          <code>{codeUrl}</code>
        </a>
        <CodeHighlight code={template} language="markdown" />
      </Tabs.Panel>
    </Tabs>
  );
};
