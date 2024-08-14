const { Router } = require('express')

// Requisição dos controllers 
const NotesController = require('../controllers/NotesController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

// Traz consigo o controller através do new
const notesController = new NotesController()

const notesRoutes = Router()

// Utiliza o middle em todas as rotas de notes 
notesRoutes.use(ensureAuthenticated)

notesRoutes.get('/', notesController.index)
notesRoutes.post('/', notesController.create)
notesRoutes.get('/:id', notesController.show)
notesRoutes.delete('/:id', notesController.delete)


module.exports = notesRoutes
