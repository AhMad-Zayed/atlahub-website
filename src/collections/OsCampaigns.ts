import type { CollectionConfig } from 'payload';

export const OsCampaigns: CollectionConfig = {
  slug: 'os_campaigns',
  admin: {
    useAsTitle: 'facebookAdId',
    group: 'Internal OS',
  },
  fields: [
    {
      name: 'facebookAdId',
      type: 'text',
      admin: {
        description: 'The Meta/Facebook Ad Campaign ID',
      }
    },
    {
      name: 'clientId',
      type: 'relationship',
      relationTo: 'os_clients',
      required: true,
    },
    {
      name: 'totalLockedBudget',
      type: 'number',
      defaultValue: 0,
      required: true,
      admin: {
        description: 'Total budget locked from client wallet',
      }
    },
    {
      name: 'currentSpent',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Amount spent so far on Facebook Ads',
      }
    },
    {
      name: 'actualFacebookSpend',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'HIDDEN: Actual amount spent on Facebook Meta Ads',
      }
    },
    {
      name: 'agencyMarginAmount',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'HIDDEN: Your flexible agency profit margin for this campaign',
      }
    },
    {
      name: 'remainingBudget',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'executionState',
      type: 'select',
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Paused', value: 'PAUSED' },
        { label: 'Completed', value: 'COMPLETED' },
      ],
      defaultValue: 'DRAFT',
      required: true,
    },
  ],
};
