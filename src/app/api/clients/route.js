export async function GET() {
  const clients = [
    { id: 1, name: 'AtlaHub', industry: 'Tech', logo_url: '/assets/images/Atlanta_Jerusalem.png' },
    { id: 2, name: 'Atlantis LLC', industry: 'Cyber Security', logo_url: '/assets/images/Atlanta_Jerusalem.png' }
  ];
  return new Response(JSON.stringify(clients), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
