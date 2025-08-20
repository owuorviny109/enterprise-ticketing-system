const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/tickets-by-department', dashboardController.getTicketsByDepartment);
router.get('/tickets-by-type', dashboardController.getTicketsByType);
router.get('/top-creators', dashboardController.getTopCreators);
router.get('/ticket-summary', dashboardController.getTicketSummary);
router.get('/crm-stats', dashboardController.getCRMStats);

module.exports = router;
