const { Router } = require('express');
const multer = require('multer');
const uploadConfigs = require('../config/upload');

// Requisição dos controllers 
const UsersController = require('../controllers/UsersController');
const EnsureAuthenticated = require('../middlewares/ensureAuthenticated');
const UserAvatarController = require('../controllers/UserAvatarController');

// Traz consigo o controller através do new
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

// Carregar o multer
const upload = multer(uploadConfigs.MULTER);

const usersRoutes = Router();


usersRoutes.post('/', usersController.create);
usersRoutes.put('/', EnsureAuthenticated, usersController.update);
usersRoutes.patch('/avatar', EnsureAuthenticated, upload.single('avatar'), userAvatarController.update);


module.exports = usersRoutes;
