const { Router } = require('express')

// Requisição dos controllers 
const TagsController = require('../controllers/TagsController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

// Traz consigo o controller através do new
const tagsController = new TagsController()

const tagsRoutes = Router()

tagsRoutes.get('/', ensureAuthenticated, tagsController.index)

module.exports = tagsRoutes
