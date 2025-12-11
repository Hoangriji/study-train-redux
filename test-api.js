// Test API script
const API_URL = 'https://671891927fc4c5ff8f49fcac.mockapi.io/v2';

async function testAPI() {
  try {
    console.log('Testing API...');
    const response = await fetch(`${API_URL}?page=1&limit=5`);
    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));
    console.log(`Total items returned: ${data.length}`);
  } catch (error) {
    console.error('API Error:', error);
  }
}

testAPI();
