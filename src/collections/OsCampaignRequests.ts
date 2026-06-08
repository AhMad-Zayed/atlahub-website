import type { CollectionConfig } from 'payload';

export const OsCampaignRequests: CollectionConfig = {
  slug: 'os_campaign_requests',
  admin: {
    useAsTitle: 'title',
    group: 'Internal OS',
  },
  fields: [
    {
      name: 'title',
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
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending Review', value: 'PENDING' },
        { label: 'Approved', value: 'APPROVED' },
        { label: 'Rejected', value: 'REJECTED' },
      ],
      defaultValue: 'PENDING',
    },
  ],
};
