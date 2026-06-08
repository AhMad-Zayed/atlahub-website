import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';
import path from 'path';
import { fileURLToPath } from 'url';
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Portfolio } from './collections/Portfolio';
import { Services } from './collections/Services';

// Internal OS Collections
import { OsUsers } from './collections/OsUsers';
import { OsClients } from './collections/OsClients';
import { OsProjects } from './collections/OsProjects';
import { OsCampaigns } from './collections/OsCampaigns';
import { OsCampaignRequests } from './collections/OsCampaignRequests';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Portfolio,
    Services,
    OsUsers,
    OsClients,
    OsProjects,
    OsCampaigns,
    OsCampaignRequests,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_KEY_PLEASE_CHANGE',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
});
