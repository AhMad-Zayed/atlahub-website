import type { CollectionConfig } from 'payload';

export const Portfolio: CollectionConfig = {
  slug: 'portfolio',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Software', value: 'software' },
        { label: 'Media', value: 'media' },
        { label: 'Training', value: 'training' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Design', value: 'design' },
      ],
      required: true,
    },
    {
      name: 'role',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'action',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'result',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Website', value: 'website' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Facebook', value: 'facebook' },
          ],
        },
      ],
    },
  ],
};
