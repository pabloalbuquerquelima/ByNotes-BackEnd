const { Router } = require('express')

// Importa os caminhos
const usersRoutes = require('./users.routes')
const sessionsRoutes = require('./sessions.routes')
const notesRoutes = require('./notes.routes')
const tagsRoutes = require('./tags.routes')

const routes = Router()

//Sessões HTML
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)
routes.use('/notes', notesRoutes)
routes.use('/tags', tagsRoutes)


module.exports = routes
