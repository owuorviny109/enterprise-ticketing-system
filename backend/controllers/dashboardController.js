const db = require('../db');

exports.getDashboardMetrics = async (req, res) => {
  try {
    const [
      [newTickets],
      [openTickets],
      [closedTickets],
      [unassignedTickets],
      [customers],
      [contacts],
      ticketByDept,
      ticketByType,
      topCreators
    ] = await Promise.all([
      db.query("SELECT COUNT(*) AS count FROM tickets WHERE DATE(created_at) = CURDATE()"),
      db.query("SELECT COUNT(*) AS count FROM tickets WHERE status = 'Open'"),
      db.query("SELECT COUNT(*) AS count FROM tickets WHERE status = 'Closed'"),
      db.query("SELECT COUNT(*) AS count FROM tickets WHERE user_id IS NULL"),
      db.query("SELECT COUNT(*) AS count FROM organizations"),
      db.query("SELECT COUNT(*) AS count FROM contacts"),
      db.query("SELECT department, COUNT(*) AS count FROM tickets GROUP BY department"),
      db.query("SELECT type, COUNT(*) AS count FROM tickets GROUP BY type"),
      db.query("SELECT created_by, COUNT(*) AS count FROM tickets GROUP BY created_by ORDER BY count DESC LIMIT 3")
    ]);

    res.json({
      newTickets: newTickets.count,
      openTickets: openTickets.count,
      closedTickets: closedTickets.count,
      unassignedTickets: unassignedTickets.count,
      customers: customers.count,
      contacts: contacts.count,
      ticketByDept,
      ticketByType,
      topCreators
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
