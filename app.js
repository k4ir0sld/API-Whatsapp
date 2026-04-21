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
    
    let dadosWhatsApp = whatsAppFunction.getListaDadosUsuario()

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
    let mensagensContatos = whatsAppFunction.getTodasMensagensUsuario(numero)

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
    let conversa = whatsAppFunction.getConversasUsuario(numero, contato)

    if(!conversa){
        response.status(404) //O response de status deve vir sempre primeiro!!!
        response.json({"message": "O numero ou contato informado está incorreto!" });
    }else{
        response.status(200)
        response.json(conversa)
    }

})

//Retorna mensagens filtradas por palavra-chave
app.get('/v1/whatsapp/mensagens/filtro/:num', function(request, response){
    
    let numero      = request.params.num
    let contato     = request.query.contato
    let palavraChave = request.query.busca
    
    let mensagens = whatsAppFunction.getMensagensFiltradas(numero, contato, palavraChave)
    
    if(!mensagens){
        response.status(404)
        response.json({"message": "Número, contato ou palavra não encontrados!"})
    }else{
        response.status(200)
        response.json(mensagens)
    }

})

//Retorna documentação da API
app.get('/v1/whatsapp/help', function(request, response){

    let docAPI = {
        "API - description": "API para manipular dados do WhatsApp",
        "Date": "2026-04-08",
        "Development": "Lucas Duarte",
        "Version": "1.0",
        "Endpoints": [
            {
                "id": 1,
                "Route": "/v1/whatsapp/dados",
                "Method": "GET",
                "Description": "Retorna todos os dados de todos os usuários"
            },
            {
                "id": 2,
                "Route": "/v1/whatsapp/dados/profile/:num",
                "Method": "GET",
                "Description": "Retorna os dados do profile de um usuário filtrando pelo número",
                "Exemplo": "/v1/whatsapp/dados/profile/11938092524"
            },
            {
                "id": 3,
                "Route": "/v1/whatsapp/dados/contatos/:num",
                "Method": "GET",
                "Description": "Retorna a lista de contatos de um usuário filtrando pelo número",
                "Exemplo": "/v1/whatsapp/dados/contatos/11938092524"
            },
            {
                "id": 4,
                "Route": "/v1/whatsapp/mensagens/:num",
                "Method": "GET",
                "Description": "Retorna todas as mensagens trocadas de um usuário filtrando pelo número",
                "Exemplo": "/v1/whatsapp/mensagens/11938092524"
            },
            {
                "id": 5,
                "Route": "/v1/whatsapp/conversa/:num?contato=",
                "Method": "GET",
                "Description": "Retorna a conversa de um usuário com um contato específico",
                "Exemplo": "/v1/whatsapp/conversa/11938092524?contato=Ana Maria"
            },
            {
                "id": 6,
                "Route": "/v1/whatsapp/mensagens/filtro/:num?contato=&busca=",
                "Method": "GET",
                "Description": "Retorna mensagens filtradas por palavra-chave na conversa de um usuário com um contato",
                "Exemplo": "/v1/whatsapp/mensagens/filtro/11955577796?contato=Peter Wilsen&busca=bem"
            }
        ]
    }

    response.status(200)
    response.json(docAPI)
})

app.listen(3030, function(){
    console.log('API funcionando e aguardando novas requsições ...')
})