const projectId = 'prj_rzz9fncxzF9qOQUTAT40sT5x83Rv';
const teamId = 'team_IjT7hAfDVw813xsaS8r32fzu';

async function updateProject() {
  try {
    // Use vercel CLI's embedded token via environment
    const response = await fetch(
      `https://api.vercel.com/v9/projects/${projectId}?teamId=${teamId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rootDirectory: null }),
      }
    );

    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

updateProject();
