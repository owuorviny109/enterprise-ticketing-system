const db = require('../db');

exports.getDashboardMetrics = async (req, res) => {
  try {
    const [
      [newTicketsResult],
      [openTicketsResult],
      [closedTicketsResult],
      [unassignedTicketsResult],
      [customersResult],
      [contactsResult],
      [departmentsResult],
      [ticketByDeptRows],
      [ticketByTypeRows],
      [topCreatorsRows]
    ] = await Promise.all([
      db.query("SELECT COUNT(*) AS count FROM tickets WHERE DATE(created_at) = CURDATE()"),
      db.query("SELECT COUNT(*) AS count FROM tickets WHERE status = 'Open'"),
      db.query("SELECT COUNT(*) AS count FROM tickets WHERE status = 'Closed'"),
      db.query("SELECT COUNT(*) AS count FROM tickets WHERE user_id IS NULL"),
      db.query("SELECT COUNT(*) AS count FROM organizations WHERE is_active = TRUE"),
      db.query("SELECT COUNT(*) AS count FROM contacts"),
      db.query("SELECT COUNT(*) AS count FROM departments WHERE is_active = TRUE"),
      db.query("SELECT department AS department, COUNT(*) AS count FROM tickets GROUP BY department"),
      db.query("SELECT type AS type, COUNT(*) AS count FROM tickets GROUP BY type"),
      db.query("SELECT created_by AS creator, COUNT(*) AS tickets_created FROM tickets GROUP BY created_by ORDER BY tickets_created DESC LIMIT 5")
    ]);

    res.json({
      newTickets: newTicketsResult.count,
      openTickets: openTicketsResult.count,
      closedTickets: closedTicketsResult.count,
      unassignedTickets: unassignedTicketsResult.count,
      customers: customersResult.count,
      contacts: contactsResult.count,
      departments: departmentsResult.count,
      ticketByDept: ticketByDeptRows,
      ticketByType: ticketByTypeRows,
      topCreators: topCreatorsRows
    });
  } catch (err) {
    console.error('❌ Dashboard metrics error:', err);
    res.status(500).json({ error: 'Failed to load dashboard metrics' });
  }
};
