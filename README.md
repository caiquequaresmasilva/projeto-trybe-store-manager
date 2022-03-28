# Projeto Store Manager API

# Contexto

O objetivo do projeto foi arquitetar e desenvolver uma API **REST** de gerenciamento de vendas que faça **CRUD (Create, Read, Update e Delete)** de vendas e produtos. A API segue a arquitetura **MSC (Models, Service e Controllers)**, e se comunica com um banco de dados  **MySQL** através de queries **SQL**.

## Tecnologias usadas
* Node.js;
* Express.js;
* MySQL;

## Instalando Dependências

* Clone o repositório:
```bash
git clone git@github.com:caiquequaresmasilva/projeto-trybe-store-manager.git
``` 

* Entre na pasta do repositório clonado e instale as dependências:

```bash
cd projeto-trybe-store-manager
npm install
``` 


## Executando a aplicação

Para rodar a API, é necessário configurar as variáveis de ambiente no arquivo `.env`

```
HOSTNAME=dbHost # Host do banco de dados
MYSQL_USER=user # Usuário de acesso ao banco de dados
MYSQL_PASSWORD=userPassword # Senha do usuário
PORT=3000 # Porta de comunicação da API
``` 
---

* Em seguida, crie o banco de dados e suas tabelas no **MySQL** a partir do arquivo `StoreManager.sql`

A API pode ser acessada pelo endereço http://localhost:3000/, ou por outra porta configurada.

---