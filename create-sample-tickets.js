// Script to create sample tickets for testing the dashboard
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

const sampleTickets = [
  {
    subject: 'Certificate Request - John Doe',
    requestDetails: 'I need my bronze award certificate for university application.',
    ticketType: 'Certificate Request',
    department: 'Admin',
    priority: 'medium',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  },
  {
    subject: 'Award Progression Query',
    requestDetails: 'I want to know about moving from bronze to silver level.',
    ticketType: 'Award Progression',
    department: 'Program Management',
    priority: 'low',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com'
  },
  {
    subject: 'Technical Support - Login Issues',
    requestDetails: 'I cannot log into my account. Getting error messages.',
    ticketType: 'Technical Support',
    department: 'ICT',
    priority: 'high',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@example.com'
  },
  {
    subject: 'Registration Problem',
    requestDetails: 'My registration was not completed properly.',
    ticketType: 'Registration Issue',
    department: 'Customer Service',
    priority: 'medium',
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@example.com'
  },
  {
    subject: 'General Inquiry about Program',
    requestDetails: 'I want to know more about the Duke of Edinburgh Award program.',
    ticketType: 'General Inquiry',
    department: 'Customer Service',
    priority: 'low',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@example.com'
  },
  {
    subject: 'Complaint about Service',
    requestDetails: 'I am not satisfied with the response time to my previous inquiry.',
    ticketType: 'Complaint or Grievance',
    department: 'Admin',
    priority: 'high',
    firstName: 'Lisa',
    lastName: 'Davis',
    email: 'lisa.davis@example.com'
  },
  {
    subject: 'Finance Query - Payment Issues',
    requestDetails: 'My payment was deducted but registration is not showing as complete.',
    ticketType: 'General Inquiry',
    department: 'Finance',
    priority: 'urgent',
    firstName: 'Robert',
    lastName: 'Miller',
    email: 'robert.miller@example.com'
  },
  {
    subject: 'Award Verification Request',
    requestDetails: 'I need verification of my completed award for my CV.',
    ticketType: 'Certificate Request',
    department: 'Admin',
    priority: 'medium',
    firstName: 'Emma',
    lastName: 'Taylor',
    email: 'emma.taylor@example.com'
  }
];

async function createSampleTickets() {
  console.log('🎫 Creating sample tickets for dashboard testing...\n');

  try {
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < sampleTickets.length; i++) {
      const ticket = sampleTickets[i];
      
      try {
        console.log(`Creating ticket ${i + 1}/${sampleTickets.length}: ${ticket.subject}`);
        
        const response = await axios.post(`${BASE_URL}/tickets`, ticket);
        
        console.log(`✅ Created ticket #${response.data.id} - ${response.data.key}`);
        successCount++;
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`❌ Failed to create ticket: ${ticket.subject}`);
        console.error(`   Error: ${error.response?.data?.error || error.message}`);
        errorCount++;
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Successfully created: ${successCount} tickets`);
    console.log(`   ❌ Failed to create: ${errorCount} tickets`);

    // Get final statistics
    console.log('\n📈 Getting updated statistics...');
    const statsResponse = await axios.get(`${BASE_URL}/tickets/stats`);
    console.log('📊 Current ticket stats:', statsResponse.data);

    // Get all tickets to show breakdown
    const ticketsResponse = await axios.get(`${BASE_URL}/tickets`);
    console.log(`📋 Total tickets in system: ${ticketsResponse.data.total}`);

    // Show breakdown by department
    const tickets = ticketsResponse.data.tickets;
    const departmentCounts = {};
    const typeCounts = {};

    tickets.forEach(ticket => {
      departmentCounts[ticket.department] = (departmentCounts[ticket.department] || 0) + 1;
      typeCounts[ticket.type] = (typeCounts[ticket.type] || 0) + 1;
    });

    console.log('\n🏢 Tickets by Department:');
    Object.entries(departmentCounts).forEach(([dept, count]) => {
      console.log(`   ${dept}: ${count} tickets`);
    });

    console.log('\n📝 Tickets by Type:');
    Object.entries(typeCounts).forEach(([type, count]) => {
      console.log(`   ${type}: ${count} tickets`);
    });

    console.log('\n🎉 Sample tickets created successfully!');
    console.log('🚀 Your dashboard should now show real data!');

  } catch (error) {
    console.error('❌ Error creating sample tickets:', error.message);
  }
}

createSampleTickets();