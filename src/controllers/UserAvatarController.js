const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');

class UserAvatarController {
    async update(request, response) {
        const user_id = request.user.id;
        const avatarFileName = request.file.filename;

        const diskStorage = new DiskStorage();

        //Conexão com a tabela onde o user_id é igual ao id da tabela
        const user = await knex("users")
        .where({ id: user_id }).first();

        if(!user) {
            throw new AppError('Somente usuários autenticados podem alterar a foto de perfil', 401);
        }

        //Deletar a imagem
        if(user.avatar) {
            await diskStorage.deleteFile(user.avatar);
        }

        //Passar a imagem 
        const filename = await diskStorage.saveFile(avatarFileName);
        //Salvar a imagem
        user.avatar = filename;




        //Fazer o update
        await knex("users")
        .where({ id: user_id })
        .update({ avatar: filename });
        
        return response.json(user);
    }
}

module.exports = UserAvatarController