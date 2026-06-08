import type { CollectionConfig } from 'payload';

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'valueProposition',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'technicalScope',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'item',
          type: 'text',
        },
      ],
    },
    {
      name: 'process',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'step',
          type: 'text',
        },
      ],
    },
    {
      name: 'whyUs',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'icon',
      type: 'text',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
};
