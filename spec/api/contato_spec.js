var config = require('config');

var user = config.get('user.username');
var password = config.get('user.password');
var url = config.get('environment.url');
var port = config.get('environment.port');

var completeURL = url + ":" + port;


var frisby = require('frisby');

/*
 * Teste: Validar dados de contato pelo ID
 *
 * Um get é efetuado para a api com o ID do contato diretamenta na URL (1)
 */ 
frisby.create('Validar dados de contato pelo ID')
    .get(completeURL + '/api/v1/contact/1')
    .auth(user, password)
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSON({
        id: 1,
        nome: 'João',
        email: 'joao@gmail.com',
        idade: 46,
        restricao: false

    })
    .toss();

/*
 * Teste: Validar o cadastro de um contato
 *
 * Para inserir uma novo contato usamos o método post e também
 * enviamos para a api os dados do contato no formato json (true)
 */
frisby.create('Validar o cadastro de um contato')
    .post(completeURL + '/api/v1/contact',
          {
            nome: 'Elias',
            email: 'elias@gmail.com',
            idade: 35,
            restricao: true
        },
          {json: true}
    )
    .auth(user, password)
    .expectHeaderContains('Content-Type', 'json')
    .expectStatus(201)
    .expectJSON({
        status : "sucesso",
        contato :  {
            nome: 'Elias',
            email: 'elias@gmail.com',
            idade: 35,
            restricao: true    
        }
    })
    .toss();

/*
 * Teste: Validar a remoção de um contato
 * 
 * Para a remoção do contato primeiro efetuamos um post para cadastra-lo
 * sem a necessidade de validação do retorno do resultado
 * Apos encadeamos a execução com o método after efetuando um delete pegando o
 * id retornado pelo post (cadastro) do contato
 */
frisby.create('Validar a remoção de um contato')
    .post(completeURL + '/api/v1/contact', {
        nome: 'Elias',
        email: 'elias@gmail.com',
        idade: 35,
        restricao: true
      })
    .auth(user, password)
    .expectStatus(201)
    .afterJSON(function(json){
        frisby.create("Remover um contato com sucesso")
            .delete(completeURL + '/api/v1/contact/' + json.contato.id)
            .auth(user, password)
            .expectStatus(202)
            .expectHeaderContains('Content-Type', 'json')
            .expectJSON({
                status : "sucesso",
                contato: {
                    id: json.contato.id
                }
            })
            .toss();  
    })
    .toss();

/*
 * Teste: Validar a alteração de um contato
 * 
 * Para a validação do contato primeiro efetuamos um post para cadastra-lo
 * sem a necessidade de validação do retorno do resultado
 * Apos encadeamos a execução com o método after efetuando um put pegando o
 * id retornado pelo post (cadastro) do contato e alterando somente os campos necessários
 */
frisby.create('Validar a alteração de um contato')
    .post(completeURL + '/api/v1/contact', {
        nome: 'Roberto',
        email: 'roberto@gmail.com',
        idade: 27,
        restricao: false
      })
    .auth(user, password)
    .expectStatus(201)
    .afterJSON(function(json){
        frisby.create("Alterar um contato com sucesso")
            .put(completeURL + '/api/v1/contact/' + json.contato.id, {
                nome: 'Roberto Leal',
            })
            .auth(user, password)
            .inspectBody()
            .expectStatus(200)
            .expectHeaderContains('Content-Type', 'json')
            .expectJSON({
                status : 'sucesso',
                contato: {
                   id: json.contato.id
               }
            })
            .toss();  
    })
    .toss();

/*
 * Teste: Validar envio de requisição com usuario invalido
 */ 
frisby.create('Validar envio de requisição com usuario invalido')
    .get(completeURL + '/api/v1/contact/')
    .auth('elias', 'eli@sn0g1')
    .expectStatus(403)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSON({
        code: 'NotAuthorized',
        message: 'Usuário ou senha inválido'
    })
    .toss();    