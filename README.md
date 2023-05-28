<h1 align="center" font-weight: bold;">Autenticação e Segurança 🔐</h1>

<p align="center">
    <b>Compartilhe seus segredos mais íntimos em anonimato!</b>
</p>

<p align="center">
    <a href="#tech">Tecnologias</a> • 
    <a href="#clone">Clone</a>
</p>

# Descrição do Projeto

>Este projeto é um app web construído com Node.js e Express com Passaport como middleware, utilizando autenticação de usuário e banco de dados com MongoDB. O aplicativo permite que os usuários registrem-se, façam login, compartilhem segredos e visualizem segredos de outros usuários de forma 100% anônima.
>
>O projeto foi feito e pensado para ser bem seguro, contendo `Bcrypt` como algoritmo de `hash com salt` para armazenar as senhas dos usuários de uma forma que seja impossível de descriptografar

## Uso

<div align="center">
    <p>A seguir um exemplo de como os dados do usuário são salvos no banco de dados e um pequeno vídeo exemplo da usabilidade do site: </p>
    <p>
        <img src="assets\Database-pic.png" width="400px" height="215"/>
        <video width="400" autoplay muted>
            <source src="assets\site-sample.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </p>
</div>

<div align="center">
    <p>• Registra-se • Faça login</p>
    <p>• Compartilhe seus segredos • Visualize segredos de outras pessoas</p>
</div>



<h2 id="tech">Tecnologias</h2>

- Node.js
- Express
- EJS
- Express Session
- Passport
- Passport-local
- Mongoose

<h2 id="clone">Clone</h2>

### Pré-requisitos

- Node e npm

### Instalação

1. Clone o repositório.

```
    git clone https://github.com/EmanuelGCosta/Autenticacao-seguranca.git
```
2. Dentro da pasta do projeto instale as dependências.
```
    npm install
```
3. Inicie o servidor.
```
    node app.js
```
4. Acesse a aplicação em seu navegador através do endereço `http://localhost:3000`.


# Ressalvas
## Curso: "The complete web development bootcamp" pela Dr. Angela Yu

Nesse projeto não fiz nenhum HTML e CSS das páginas, o mesmos já foram fornecidos pelo curso para eu poder apenas me concentrar em realizar a autenticação e segurança do usuário com exceção de modificações e adições que eu mesmo fiz.