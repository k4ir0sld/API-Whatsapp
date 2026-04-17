//ESTRUTURA BASE DA API!!!!!

//Import das dependencias para criar a API
const express   = require('express')
const cors      = require('cors')

//Criando um objeto para manipular o express
const app = express()

//Conjunto de permissões a serem aplicadas no CORS da API
const corsOptions = {
    origin: ['*'], //A origem da requisição, podendo ser um IP ou * - TODOS
    methods: 'GET', //São os verbos que serão liberados na API (GET, POST, PUT e DELETE)
    allowedHeaders: ['Content-type', 'Autorization'] //São permissões de cabeçalho do CORS 
}

//Configura as permissões da API atraves do CORS 
app.use(cors(corsOptions))

//Response  -> Retornos da API
//Request   -> São chegadas de dados na API

//Import do arquivo de funções
const whatsAppFunction = require('./modulo/busca_contatos.js')
const { conteudoWhatsApp } = require('./modulo/contatos.js')

//Criando EndPoints para a API

//Retorna todos os dados 
app.get('/v1/whatsapp/dados', function(request, response){
    
    let dadosWhatsApp = whatsAppFunction.getListaDadosUsuario

    response.status(200)
    response.json(dadosWhatsApp)
})

//Retorna dados do profile
app.get('/v1/whatsapp/dados/profile/:num', function(request, response){
    
    let numero = request.params.num
    let dadosProfile = whatsAppFunction.getListaDadosProfile(numero)
    
    if(!dadosProfile){
        response.status(404) //O response de status deve vir sempre primeiro!!!
        response.json({"message": "O numero informado está incorreto!" });
    }else{
        response.status(200)
        response.json(dadosProfile)
    }
    
})

//Retorna lista de dados dos contatos de um usuário
app.get('/v1/whatsapp/dados/contatos/:num', function(request, response){

    let numero = request.params.num
    let listaContatos = whatsAppFunction.getListaDadosContato(numero)

     if(!listaContatos){
        response.status(404) //O response de status deve vir sempre primeiro!!!
        response.json({"message": "O numero informado está incorreto!" });
    }else{
        response.status(200)
        response.json(listaContatos)
    }
})

//Retorna todas as mensagens trocadas de um usuário com um contato
app.get('/v1/whatsapp/mensagens/:num', function(request, response){

    let numero = request.params.num
    let mensagensContatos = whatsAppFunction.getConversasUsuario(numero)

    if(!mensagensContatos){
        response.status(404) //O response de status deve vir sempre primeiro!!!
        response.json({"message": "O numero informado está incorreto!" });
    }else{
        response.status(200)
        response.json(mensagensContatos)
    }
})

//Retorna lista de conversa de um usuário e um contato
//usuario = parametrô
//contato = query
app.get('/v1/whatsapp/conversa/:num', function(request, response){

    let numero = request.params.num
    let contato = request.query.contato
    let conversa = whatsAppFunction.getConversaUsuarioContato(numero, contato)

    if(!conversa){
        response.status(404) //O response de status deve vir sempre primeiro!!!
        response.json({"message": "O numero ou contato informado está incorreto!" });
    }else{
        response.status(200)
        response.json(conversa)
    }

})

app.listen(3030, function(){
    console.log('API funcionando e aguardando novas requsições ...')
})




;