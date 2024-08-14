require('express-async-errors'); // Faz a require dos erros dos express
require('dotenv/config');

const migrationsRun = require('./database/sqlite/migrations');
const AppError = require('./utils/AppError');
const uploadConfig = require('./config/upload');

const cors = require('cors');
const express = require('express');
const routes = require('./routes'); //index

migrationsRun();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

// Tratamento de erros
app.use((error, request, response, next) => {
  
  //Cria uma instancia de AppError e retorna
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.error(error);

  // Erro fora do comum, retorna erro interno do servidor
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

//Rodar na porta:
const PORT = process.env.SERVER_PORT || 3332;

//Ligar o servidor 
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
