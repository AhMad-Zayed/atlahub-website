import pg from 'pg';
const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  await client.connect();
  
  // Check what tables exist
  const tables = await client.query(`
    SELECT table_name FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name
  `);
  console.log('=== Existing tables ===');
  tables.rows.forEach(r => console.log(' ', r.table_name));

  // Check users table columns
  const userCols = await client.query(`
    SELECT column_name, data_type FROM information_schema.columns 
    WHERE table_name = 'users' 
    ORDER BY ordinal_position
  `);
  console.log('\n=== users table columns ===');
  userCols.rows.forEach(r => console.log(' ', r.column_name, '-', r.data_type));

  // Check os_campaign table columns
  const campaignCols = await client.query(`
    SELECT column_name, data_type FROM information_schema.columns 
    WHERE table_name = 'os_campaign' 
    ORDER BY ordinal_position
  `);
  console.log('\n=== os_campaign table columns ===');
  campaignCols.rows.forEach(r => console.log(' ', r.column_name, '-', r.data_type));

  await client.end();
}

main().catch(console.error);
