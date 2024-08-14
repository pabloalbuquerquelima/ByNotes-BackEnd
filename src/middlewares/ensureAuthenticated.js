const { verify } = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const authConfig = require('../config/auth'); //Traz para cá todas as configurações feitas em auth nas configs 

function ensureAuthenticated(request, response, next){

    // Recebe o token 
    const authHeader = request.headers.authorization;

    // Verificar se há token
    if(!authHeader) {
        throw new AppError('JWT token não informado', 401);
    }

    // Colocar dentro de um array o Bearer e depois o código do token, e como o segundo item, uma variável token é criada 
    const [, token] = authHeader.split(" "); // Bearer xxxxxxxxxxxxx


    // Utilizar o token e passar para a request ( Podendo ser localizada como request.user.id )
    try {

        //Retorna o sub: user_id de uma função que está decodificando o código jwt
        const { sub: user_id } = verify(token, authConfig.jwt.secret);

        //( Podendo ser localizada como request.user.id )
        request.user = {
            id: Number(user_id)
        }

        return next()
    } catch {

        throw new AppError('JWT token inválido', 401);
    }
}

module.exports = ensureAuthenticated;