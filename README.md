# Projeto Comunicação de Notícias

Com este projeto tenho por objetivo me aperfeiçoar como desenvolvedor.

## A problemática:

Dado um arquivo **[noticias.json](files/noticias.json)** tenho por objetivo fazer com que minha API Laravel recebe este conjunto de notícias e os salve diretamente no Banco de Dados PostgreSQL. De forma síncrona, por enquanto, que ele seja salvo no Elasticsearch para consulta posterior.
Ao abrir o FrontEnd escrito em Vuejs, juntamente com o Quasar Framework, que ele faça uma requisição à API do Laravel e que este por sua vez, não consulte o Banco de Dados do Postgre e sim os diretamente os documentos salvos no Elasticsearch, exindo na tela em formato de lista e detalhes.

## Arquitetura

Atualmente estou com esta arquitetura:

![arquitetura atual](prints/arquitetura_atual.png)

E o objetivo é fazer com que os serviços se comuniquem através do RabbitMQ:

![arquitetura futura](prints/arquitetura_futura.png)

## Instalação

Caso deseje configurar e testar siga os passos abaixo:

### Pre-requisitos

- Docker
- Node

### Configurando o FrontEnd

1. Acesse o diretório **quasar**. No terminal utilize o comando:

   ```bash
   npm install
   ```

### Subindo o Docker

1. No diretório principal do projeto

   ```bash
   docker-compose up -d --build
   ```

### Configurando a API - Laravel

1. Tendo subido os conteiners do Docker, acesse o diretório **api**

2. Cria o arquivo de configuração de ambiente com base no exemplo

   ```bash
   cp .env.example .env
   ```

3. Cria uma key única para a API do Laravel

   ```bash
   php artisan key:generate
   ```

4. Instala as dependências do framework

   ```bash
   composer install
   ```

5. Cria todas as tabelas no Banco de Dados do Postgree

   ```bash
   php artisan migrate
   ```

6. [Opcional] Caso deseje visualizar a documentação da API.

   ```bash
   php artisan scribe:generate
   ```

   - Você importar para Postman ou Insomnia, gerando automaticamente todas as requisições de cada rota da API. Fique atento(a) para a variável de ambiente apontando para a localhost. Precisa configurar para localhost:8080

     ```
     .\api\public\docs\collection.json
     ```

   - Visualizar Documentação da API em uma página da web

     ```
     .\api\public\docs\index.html
     ```
