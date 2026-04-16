import prisma from '@/lib/prisma';

/**
 * Locks FormTemplate.schemaJson (+ version) onto ProjectSnapshot for immutability.
 */
export async function createProjectSnapshotFromTemplate({
  projectId,
  formTemplateId,
  fieldOverridesJson = null,
}) {
  const template = await prisma.formTemplate.findUnique({
    where: { id: Number(formTemplateId) },
  });

  if (!template) {
    throw new Error('FormTemplate not found');
  }

  return prisma.projectSnapshot.upsert({
    where: { projectId: Number(projectId) },
    create: {
      projectId: Number(projectId),
      formTemplateId: template.id,
      templateVersion: template.version,
      schemaSnapshotJson: template.schemaJson,
      fieldOverridesJson: fieldOverridesJson || undefined,
    },
    update: {
      formTemplateId: template.id,
      templateVersion: template.version,
      schemaSnapshotJson: template.schemaJson,
      fieldOverridesJson: fieldOverridesJson || undefined,
    },
  });
}

export function defaultLegacyWizardSchemaJson() {
  return {
    version: 1,
    steps: [
      { id: 's1', title: 'The Soul', fields: [{ key: 'step1_soul', type: 'textarea' }] },
      { id: 's2', title: 'Positioning', fields: [{ key: 'step2_market', type: 'textarea' }] },
      { id: 's3', title: 'Visual Identity', fields: [{ key: 'step3_visual', type: 'textarea' }] },
      { id: 's4', title: 'Media Lab', fields: [{ key: 'step4_media', type: 'multiline' }] },
      { id: 's5', title: 'Final Review', fields: [{ key: 'step5_summary', type: 'textarea' }] },
    ],
  };
}

export function visualIdentitySchema() {
  return {
    version: 1,
    steps: [
      { id: 'v1', title: 'Asset Requirements', fields: [{ key: 'asset_preferences', type: 'textarea' }, { key: 'brand_colors', type: 'text' }] },
      { id: 'v2', title: 'Visual Guidelines', fields: [{ key: 'style_notes', type: 'textarea' }] },
      { id: 'v3', title: 'Deliverables Vault', fields: [{ key: 'review_ack', type: 'checkbox', label: 'I understand deliverables will appear in the gallery once initiated.' }] }
    ]
  };
}

export function workshopProposalSchema() {
  return {
    version: 1,
    steps: [
      { id: 'w1', title: 'Workshop Agenda', fields: [{ key: 'agenda_overview', type: 'textarea' }] },
      { id: 'w2', title: 'Logistics', fields: [{ key: 'date_time', type: 'text' }, { key: 'location', type: 'text' }] },
      { id: 'w3', title: 'Collaborator Space', fields: [{ key: 'provider_notes', type: 'textarea', label: 'Any specific hardware/software requests for the Admin?' }] }
    ]
  };
}

/**
 * Dynamically injects a new field into a project's snapshot without breaking the locked schema.
 */
export async function injectFieldToSnapshot(projectId, stepId, newField) {
  const snapshot = await prisma.projectSnapshot.findUnique({ where: { projectId: Number(projectId) } });
  if (!snapshot) throw new Error('Snapshot not found');
  
  const overrides = snapshot.fieldOverridesJson || { injectedFields: [] };
  if (!overrides.injectedFields) overrides.injectedFields = [];
  
  overrides.injectedFields.push({ stepId, field: newField });
  
  return prisma.projectSnapshot.update({
    where: { id: snapshot.id },
    data: { fieldOverridesJson: overrides }
  });
}
