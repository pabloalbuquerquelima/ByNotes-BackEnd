const fs = require("fs");
const path = require('path');
const uploadConfigs = require("../config/upload");

class DiskStorage {

    //Salvar o arquivo
    async saveFile(file){

        //Mudar de lugar/destinatário 
        await fs.promises.rename(
            path.resolve(uploadConfigs.TMP_FOLDER, file),
            path.resolve(uploadConfigs.UPLOADS_FOLDER, file)
        );

        return file;
    }

    // Deletar o arquivo
    async deleteFile(file){

        //Vai até o diretório do arquivo e encontra-o
        const filePath = path.resolve(uploadConfigs.UPLOADS_FOLDER, file);

        try {

            //retorna o status do arquivo
            await fs.promises.stat(filePath);
        } catch {
            return;
        }

        // Deleta
        await fs.promises.unlink(filePath);
    }
}

module.exports = DiskStorage;