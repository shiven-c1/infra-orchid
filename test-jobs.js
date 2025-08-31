const fetch = require('node-fetch');

async function testJobsAPI() {
  try {
    console.log('Testing jobs API...');
    const response = await fetch('http://localhost:5000/api/jobs');
    const jobs = await response.json();
    console.log(`Found ${jobs.length} jobs:`);
    jobs.forEach(job => {
      console.log(`- ${job.id}: ${job.title}`);
    });
  } catch (error) {
    console.error('Error testing API:', error.message);
  }
}

testJobsAPI();
