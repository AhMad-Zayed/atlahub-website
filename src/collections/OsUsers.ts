import type { CollectionConfig } from 'payload';

export const OsUsers: CollectionConfig = {
  slug: 'os_users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Internal OS',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Agent', value: 'AGENT' },
        { label: 'Administrator', value: 'ADMIN' },
      ],
      defaultValue: 'AGENT',
      required: true,
    },
  ],
};
