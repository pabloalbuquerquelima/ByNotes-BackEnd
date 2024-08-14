//Instancia

const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const authConfig = require('../config/auth');
const { sign } = require('jsonwebtoken');


class SessionsController {
    async create(request, response){
        const { email, password } = request.body;

        //Verificar e-mail:

        const user = await knex('users').where({email}).first();

        if(!user) {
            throw new AppError('E-mail e/ou senha incorreta', 401);
        }

        //Verificar senha:

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched) {
            throw new AppError('E-mail e/ou senha incorreta', 401);
        }


        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })
        //Retorno
        return response.json({user, token})
    }
}

module.exports = SessionsController;