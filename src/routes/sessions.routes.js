const { Router } = require('express');

// Requisição dos controllers 
const SessionsController = require('../controllers/SessionsController');

// Traz consigo o controller através do new
const sessionsController = new SessionsController();

const sessionsRoutes = Router()

sessionsRoutes.post("/", sessionsController.create)

module.exports = sessionsRoutes