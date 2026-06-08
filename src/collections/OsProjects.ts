import type { CollectionConfig } from 'payload';

export const OsProjects: CollectionConfig = {
  slug: 'os_projects',
  admin: {
    useAsTitle: 'name',
    group: 'Internal OS',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'os_clients',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Completed', value: 'COMPLETED' },
        { label: 'Archived', value: 'ARCHIVED' },
      ],
      defaultValue: 'ACTIVE',
      required: true,
    },
  ],
};
