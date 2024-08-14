const path = require("path")
//O path é um módulo integrado ao Node.js que fornece utilitários para trabalhar com caminhos de arquivos e diretórios no sistema de arquivos.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      //Você pode usar o método resolve() para criar um caminho absoluto a partir de caminhos relativos ou concatenar vários segmentos de caminho em um caminho completo.

      filename: path.resolve(__dirname, "src", "database", "database.db") // Pasta local/ src/ database/ database.db
    },

    // Conexão para o gerenciamento do banco de dados. Ele ativa as chaves estrangeiras
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },

    // Pasta da migration
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },

    // Utilizar o null para valores que não foram passados
    useNullAsDefault: true
  }
};
