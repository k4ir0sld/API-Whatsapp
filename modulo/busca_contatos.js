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

 //console.log(getListaDadosContato('11987876567'))


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


//Listar todas as mensagens trocadas de uma conta de usuário
//(Retornar todos os dados)

const getTodasMensagensUsuario = function(numeroUsuario){
    let listaMensagens = false

    listaDeContatos.contatos['whats-users'].forEach(function(usuario){
        if (usuario.number == numeroUsuario){
            listaMensagens = {
                nomeUsuario: usuario.account,
                contatos: []
            }
            usuario.contacts.forEach(function(contato){
                let conversa = {
                    contato: contato.name,
                    mensagens: contato.messages
                }

                listaMensagens.contatos.push(conversa)
            })
        }
    })

    return listaMensagens
}

//console.log(getTodasMensagensUsuario("11987876567"))

// Listar uma conversa de um usuário e um contato
// (Retornar dados como: nome, número de celular e as
// conversas). Deve obrigatoriamente encaminhar a referência
// para encontrar a conversa via Query e não via parâmetro)

const getConversasUsuario = function(numero, nomeContato){

    const usuario = listaDeContatos.contatos['whats-users'].find(function(item){
        return item.number == numero
    })

    if (usuario){
        const contato = usuario.contacts.find(function(c){
            return c.name.toLowerCase() == nomeContato.toLowerCase()
        })

        if(contato){
            return{
                nome: usuario.account,
                numero: usuario.number,
                contato_nome: contato.name,
                conversas: contato.messages
            }
        }
    }
    return false
}

//console.log(getConversasUsuario("11987876567", "Ana Maria"))

// Realizar um filtro como “pesquisa de palavra chave” com
// base em uma palavra nas conversas do usuário e do
// respectivo contato

const getMensagensFiltradas = function(numeroUsuario, nomeContato, palavraChave) {
    // 1. Localiza o usuário dono da conta [2, 3]
    const usuario = listaDeContatos.contatos['whats-users'].find(item => item.number == numeroUsuario)

    if (usuario) {
        // 2. Localiza o contato específico na lista do usuário [2]
        const contato = usuario.contacts.find(c => c.name.toLowerCase() == nomeContato.toLowerCase())

        if (contato) {
            // 3. Filtra as mensagens que contêm a palavra-chave [1]
            // Usamos .toLowerCase() para tornar a busca insensível a maiúsculas [4]
            const mensagensFiltradas = contato.messages.filter(function(mensagem) {
                return mensagem.content.toLowerCase().includes(palavraChave.toLowerCase())
            })

            // 4. Retorna o objeto formatado com os dados solicitados [5]
            return {
                usuario: usuario.account,        
                contato: contato.name,
                palavra_pesquisada: palavraChave,
                quantidade: mensagensFiltradas.length,
                mensagens: mensagensFiltradas
            }
        }
    }
    return false
}
console.log(getMensagensFiltradas("11955577796", "Peter Wilsen",  "bem"))