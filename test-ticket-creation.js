// Simple test to create a ticket directly
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testTicketCreation() {
  console.log('🎫 Testing Ticket Creation...\n');

  try {
    // Create a test ticket
    console.log('Creating a test ticket...');
    const ticketData = {
      subject: 'Test Ticket from Frontend',
      requestDetails: 'This is a test ticket to verify the system works properly.',
      ticketType: 'General Inquiry',
      department: 'ICT',
      priority: 'medium',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    };

    const ticketResponse = await axios.post(`${BASE_URL}/tickets`, ticketData);
    console.log('✅ Ticket created successfully:', {
      id: ticketResponse.data.id,
      subject: ticketResponse.data.subject,
      status: ticketResponse.data.status,
      key: ticketResponse.data.key
    });

    // Get ticket statistics
    console.log('\nGetting ticket statistics...');
    const statsResponse = await axios.get(`${BASE_URL}/tickets/stats`);
    console.log('✅ Current ticket stats:', statsResponse.data);

    // Get all tickets
    console.log('\nGetting all tickets...');
    const ticketsResponse = await axios.get(`${BASE_URL}/tickets`);
    console.log('✅ Total tickets in system:', ticketsResponse.data.total);
    console.log('✅ Tickets:', ticketsResponse.data.tickets.map(t => ({
      id: t.id,
      subject: t.subject,
      status: t.status,
      customerName: t.customerName
    })));

    console.log('\n🎉 Ticket creation system is working perfectly!');
    console.log('\n📊 Dashboard should show:');
    console.log(`   - Total tickets: ${statsResponse.data.total}`);
    console.log(`   - New tickets: ${statsResponse.data.pending || 0}`);
    console.log(`   - Open tickets: ${statsResponse.data.open || 0}`);

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testTicketCreation();