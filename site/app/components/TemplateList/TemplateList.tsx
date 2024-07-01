'use client';
import { Table } from '@mantine/core';
import Link from 'next/link';
import * as scffld from '@querc/scffld';

import './TemplateList.scss';

export type TemplateListProps = {
  templates: {
    name: string;
    template: string;
    params: scffld.TemplateParams;
  }[];
};

export const TemplateList: React.FC<TemplateListProps> = (props) => {
  const { templates } = props;

  return (
    <div className="template-list">
      <h3>Found {templates.length} templates</h3>
      <Table stickyHeader striped highlightOnHover withRowBorders={false}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Authors</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {templates.map((template) => (
            <Table.Tr key={template.name}>
              <Table.Th>
                <Link href={`/templates/${template.name}`}>
                  {template.name}
                </Link>
              </Table.Th>
              <Table.Td>{template.params.description || '-'}</Table.Td>
              <Table.Td>
                {template.params.authors
                  ? template.params.authors.map((author) => (
                      <span key={author}>
                        <a href={`https://github.com/${author}`} rel="external">
                          {author}
                        </a>
                      </span>
                    ))
                  : '-'}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};
