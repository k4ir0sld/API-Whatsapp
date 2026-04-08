/************************************************************************
 * Objetivo: Manipular dados utilizando Array e JSON para a busca de contatos
 * Data: 08/04/2026
 * Autor: Lucas Duarte
 * Versão: 1.0
*************************************************************************/

const listaDeContatos = require('./contatos.js')

// Listar todos os dados de usuário independente do número
// (Retornar todos os dados)

const getListaDadosUsuario = function(){
    return listaDeContatos.contatos
   //Pode usar a função assim que a saída dela no postman vai ser completa
}

//console.log(getListaDadosUsuario())

// Listar dados da conta do profile do usuário
// (Todos os dados do profile que podem ser alterados como nome,“nick”,
// foto, número, imagem, cor de fundo e dados da conta como criação e
// encerramento, etc)


const getListaDadosProfile = function(numero){

    if(!numero) return false

    let profile = listaDeContatos.contatos['whats-users'].find(function(item){
        return item.number === numero
    })
    
    if(profile){
        return{
            nome: profile.account,
            nickname: profile.nickname,
            foto: profile['profile-image'],
            numero: profile.number,
            corDeFundo: profile.background,
            createdSince: profile['created-since'],
        } 
   }
    return false
}

//onsole.log(getListaDadosProfile('11987876567'))


//  Listar dados de contato para cada usuário
// (Retornar apenas os dados pessoais de cada contato do usuário, como
// nome, foto e descrição)
 const getListaDadosContato = function(numero){

    if(!numero) return false

    let contatos = listaDeContatos.contatos['whats-users'].find(function(item){
        return item.number === numero
    })

    if(contatos){
        return{
            nomeContato: contatos.contacts.filter(c => c.name),
            fotoContato: contatos.contacts.filter(c => c.image),
            descricaoContato: contatos.contacts.filter(c => c.description)
        }
    }
    return false
 }

 console.log(getListaDadosContato('11987876567'))


//  const getListaDadosContato = function(numero){

//     let listaContatos = {
//         contatos: []
//     }

//     listaDeContatos.contatos['whats-users'].forEach(function(item){
//         if(item.number == numero){
//             let dadosContatos = {
//                 nomeContato: item.contacts.filter(c => c.name),
//                 fotoContato: item.contacts.filter(c => c.image),
//                 descricaoContato: item.contacts.filter(c => c.description)
//             }
//             listaContatos.contatos.push(dadosContatos)
//         }else{
//             return false
//         }
//     })
//     return listaContatos
    
//  }