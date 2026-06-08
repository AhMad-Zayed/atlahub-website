import { Users } from '../../collections/Users'
import { Media } from '../../collections/Media'
import { Portfolio } from '../../collections/Portfolio'
import { Services } from '../../collections/Services'
import { OsUsers } from '../../collections/OsUsers'
import { OsClients } from '../../collections/OsClients'
import { OsProjects } from '../../collections/OsProjects'
import { OsCampaigns } from '../../collections/OsCampaigns'
import { OsCampaignRequests } from '../../collections/OsCampaignRequests'

export const importMap = {
  "collections/Users.ts": Users,
  "collections/Media.ts": Media,
  "collections/Portfolio.ts": Portfolio,
  "collections/Services.ts": Services,
  "collections/OsUsers.ts": OsUsers,
  "collections/OsClients.ts": OsClients,
  "collections/OsProjects.ts": OsProjects,
  "collections/OsCampaigns.ts": OsCampaigns,
  "collections/OsCampaignRequests.ts": OsCampaignRequests,
}
