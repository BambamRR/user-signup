'use strict'

const Arquivo = use ('App/Models/Arquivo');
const Tarefa = use ('App/Models/Tarefa');

const Helpers = use ('Helpers');

class ArquivoController {
  async create({params, request, response, auth}){
    try {
      const tarefa = await Tarefa.findOrFail(params.id)

      const arquivos = request.file('file', {
        size: '1mb'
      })
      await arquivos.moveAll(Helpers.tmpPath('arquivos'), file => ({
        name: file.clientName
      }))

      if(!arquivos.moveAll()){
        return arquivos.errors();
      }

    } catch (error) {
      return response.status(500).send({error: `Error to upload: ${error}`})
    }
  }
}

module.exports = ArquivoController
