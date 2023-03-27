# Boas vindas ao Projeto Trybe Futebol Clube !

Aqui você vai encontrar os detalhes de como foi minha experiência durante o desenvolvimento deste projeto, stacks utilizadas e uma breve documentação sobre como utilizar este projeto em pleno funcionamento.

# Sobre o projeto

Este projeto teve como objetivo a construção de uma API para gerenciar um site informativo sobre partidas e classificação de alguns time de futebol utilizando os principios da Programação Orientada a Objetos (POO). Neste projeto foi feito utilizando o banco de dados MySQL e a ROM do Sequelize para a comunicação e escrita no DB, também nesse projeto utilizei a prática TDD (Test Driven Development) junto com a arquitetura MSC (model, service, controller) para maior confiabilidade e escalabilidade do código. Os testes foram feitos utilizando as libes Chai, Mocha e Sinon e são de integração, ou seja, testam a integridade do sistema e se cada câmada do software cumpre sua responsabilidade. Também neste projeto foi utilizado o ESlint para deixar o código mais coeso e de fácil manutenção/alteração.

# Stacks utilizadas

* TypeScript
* Node.js
* Chai
* Mocha
* Sinon
* Express.js
* MySQL
* Sequelize
* Docker

# Documentação

Para a execução deste propjeto é necessário ter o Docker e o Docker-Compose instalados na sua máquina. Portanto confira a documentação oficial para a instalação.
Além do node na versão 16 ou superior.

## Instalando Dependências

> Docker

[Link](https://docs.docker.com/engine/install/) para a documentação oficial

> Docker-Compose

[Link](https://docs.docker.com/compose/install/#install-compose) para a documentação oficial

## Executando aplicação

1. Clone o repositório (caso esteja usando chave SSH)
```
git clone git@github.com:Gabriel-Puttin/Trybe_Futebol_Clube.git
```
2. Entre na pasta que você acabou de clonar
```
cd Trybe_Futebol_Clube/app
```
3. instale as depedências
```
npm install
```
4. Entre no diretório back-end da aplicação
```
cd backend/
```
5. Execute o script que irá popular o banco de dados
```
npm run db:reset
```
6. Retorne para o diretório raiz da aplicação
```
cd ../../
```
7. Rode a aplicação
```
npm run compose:up
```
8. Acesse a aplicação no navegador
```
https://localhost:3000/
```
