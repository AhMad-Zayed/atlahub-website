import type { CollectionConfig } from 'payload';

export const OsClients: CollectionConfig = {
  slug: 'os_clients',
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
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'manager',
      type: 'relationship',
      relationTo: 'os_users',
      required: true,
    },
  ],
};
