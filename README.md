# workshop-api-rest-frisby-base

Este projeto é base de um workshop de automação de teste para serviços REST utilizando a ferramenta [Frisby.js](http://frisbyjs.com/)
Qualquer um pode usar este projeto para __fins educativos__.

A API foi desenvolvida utilizando [restify](http://restify.com/).

### Instar o executor dos testes
1. Abra o Prompt de Comando ou terminal e digite `npm install -g jasmine-node`
2. Aguarde até ser exibido uma lista de todas as dependências instaladas

### Instalar as dependências do projeto
1. Abra o Prompt de Comando e navegue até a pasta do projeto
2. Execute o seguinte comando `npm install` e pressione ENTER
3. Aguarde até ser exibido uma lista de todas as dependências instaladas

### Iniciando o servidor
1. Abra o Prompt de Comando e navegue até a pasta do projeto
2. Execute o seguinte comando `npm start` e pressione ENTER
3. O Prompt de Comando ou Terminal vai apresentar o texto _restify escutando em http://[::]:3000_
4. Pressione CTRL + C para terminar a execução

#### Observação
No sistema operacional Windows você receberá uma mensagem do boqueio de acesso. Na tela com esta informação clique no botão _Permitir acesso_


### Pre-condições para execução
As pré-condições para executar toda a estutura pode ser visualizada em: [https://eliasnogueira.github.io/workshop-api-rest-frisby-base/](https://eliasnogueira.github.io/workshop-api-rest-frisby-base/)

### Execução em diferentes ambientes
Para executar em diferentes ambientes (teste e produção) está sendo usado o [config](https://www.npmjs.com/package/config) para que seja possível direcionar os testes para o ambiente correto sem a necessidade de alterá-lo.

Dentro da pasta _config_ há três arquivos:
* default.json:  configurações quando não é informando o ambiente
* production.json: configurações para o ambiente de produção
* test.json: configurações para o ambiente de teste

O ambiente é informado através do parâmetro `NODE_ENV`.
Exemplo para execução do teste em ambiente de produção:

`NODE_ENV=production jasmine-node spec/api/ --verbose`


