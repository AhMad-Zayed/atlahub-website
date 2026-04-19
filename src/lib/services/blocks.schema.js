// Block Schema Definitions — used by the UI to render the right form fields per block type
// This is a pure data file with no server imports — safe to import anywhere (client + server).

export const BLOCK_SCHEMAS = {
  MetaAds: {
    label: 'Meta Ads / Social',
    color: 'text-sky-400',
    fields: [
      { key: 'postUrl',        label: 'Ad URL',          type: 'url',    required: true  },
      { key: 'budget',         label: 'Budget ($)',       type: 'number', required: true  },
      { key: 'targetAudience', label: 'Target Audience',  type: 'text',   required: false },
      { key: 'startDate',      label: 'Start Date',       type: 'date',   required: false },
    ],
  },
  CyberAudit: {
    label: 'Cybersecurity Audit',
    color: 'text-red-400',
    fields: [
      { key: 'targetDomain',  label: 'Target Domain',  type: 'text',   required: true  },
      { key: 'assetCount',    label: 'Asset Count',    type: 'number', required: false },
      { key: 'securityLevel', label: 'Security Level', type: 'select', options: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], required: true },
      { key: 'scope',         label: 'Scope Notes',    type: 'text',   required: false },
    ],
  },
  Branding: {
    label: 'Brand Identity',
    color: 'text-purple-400',
    fields: [
      { key: 'brandName',     label: 'Brand Name',      type: 'text',   required: true  },
      { key: 'revisionCount', label: 'Max Revisions',   type: 'number', required: false },
      { key: 'style',         label: 'Style Direction',  type: 'text',   required: false },
      { key: 'deliverables',  label: 'Deliverables',    type: 'text',   required: false },
    ],
  },
  Hosting: {
    label: 'Hosting / Infrastructure',
    color: 'text-emerald-400',
    fields: [
      { key: 'domain',       label: 'Domain',         type: 'text',   required: true  },
      { key: 'plan',         label: 'Plan Name',      type: 'text',   required: true  },
      { key: 'renewsAt',     label: 'Renewal Date',   type: 'date',   required: true  },
      { key: 'serverRegion', label: 'Server Region',  type: 'text',   required: false },
    ],
  },
  SSL: {
    label: 'SSL Certificate',
    color: 'text-amber-400',
    fields: [
      { key: 'domain',     label: 'Domain',      type: 'text',    required: true  },
      { key: 'issuer',     label: 'Issuer / CA',  type: 'text',    required: false },
      { key: 'expiresAt',  label: 'Expiry Date', type: 'date',    required: true  },
      { key: 'autoRenew',  label: 'Auto-Renew',  type: 'boolean', required: false },
    ],
  },
};
