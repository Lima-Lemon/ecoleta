// Utilizando o express aqui - o nome da constante pode ser qualquer um

const express = require("express")
// require é uma função -> express -> está pedindo o express, o qual será armazenado
//na variável
//Entendendo -> funciona do mesmo jeito que fizemos com o db -=> como estamos conseguindo acessar,
// o express está, em algum lugar, usando o module.exports

// Com essa linha já pode usar o express para começar um servidor

const server = express()
// como aquela variável recebeu uma função, podemos executar essa função

// pegar o banco de dados
const db = require("./database/db")

// db -> a constante não precisa ter o mesmo nome
// . = pasta local onde estou - pode ter .js ou não

// configurar pasta pública
server.use(express.static("public"))
// Usando use(), estamos fazendo uma confiração do servidor também
// Fazendo como se as pastas do public estivessem disponíveis na raiz do projeo

// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

// Utilizando template engine - estamos pedindo um módulo - instalado já
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    //propriedades do objeto:
    express: server, // é o nosso servidor express
    noCache: true
    // noCache = evita que ele salve versões velhas do front-end: às vezes o numjucks deixa uma versão velha
    //no Cache e devolve ela. Asim, colocando como inativo, evitamos isso.
})
// Configurando ele. Primeiro argumento que ele pede, é qual pasta estão os HTMLs e o segundo argumento 
//é um objeto



// Configurar caminhos da minha aplicação
// página inicial
server.get("/", (req, res) => {
    // get -> é um verbo http -> usamos o protocolo http, o qual trabalha com verbos -> entra no
    //localhost:3000 procurando / -> vai ser respondido como verbo get - é um jeito de conversar
    //por meio do http. É um jeito de fazer o pedido -> via get vai receber uma página 
    // configura um caminho/rota da aplicação -> / via get vai responder uma função

    // coloca lá no local host a barra. Logo, está pedindo a barra
    // Quando pede a barra, executa uma função que definimos ali
    // (req, res) -> req = requisição (pedido)
    // res -> é uma resposta
    return res.render("index.html", { title: "Um título"})

    // vai passar o index.html pelo motor do numjucks e retornar o html puro

    // esse segundo argumento é um objeto - a chave do objeto vai ser como se fosse a variável

    //tirei a parte que falava do dirname + views e rtals, pois configuramos, ali em cima
    //o numjucks com a pasta que estão os htmls

    // Até aqui: iniciamos o servidor e configuramos um caminho / para que esse servidor execute essa função -> vai ter uma resposta a ser enviada
    // Estamos enviando a resposta por meio da função send - mutei a função send para render!
    // para renderizar

    //__dirname = variável global do node => não precisa ser declarada -> devolve qual 
    //é o nome do diretório que estou - ou seja, como o server.js está na pasta src, ele vai passar o caminho que tem até essa pasta

    // concatenamos ela com o caminho do index.html
})

server.get("/create-point", (req, res) => {

    // Essa é a rota que está recebendo os dados do formulário
    // o req vai vir com mais informaç~eos ->/create-point + alguma coisa
    // req.query: Query strings da nossa url -=> ?&=, etc
    // é um objeto com todos os inputs 

    // console.log(req.query)

    
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    // o req query não funciona aqui, logo usamos outro:

    // req.body: o corpo do nosso formulário, mas, por padrão, o express não está habilitado para receber o body
    // Portanto, deve-se habilitar o uso do req.body na aplicação
    //console.log(req.body)

    // inserir dados no banco de dados
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items

    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.render("create-point.html", { error: true })
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        // retorna ok somente demos que a callback for chamada, ou seja, somente depois
        //que fizer o cadastro
        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)


    
})

server.get("/search", (req, res) => {

    const search = req.query.search

    if (search == "") {
        // pesquisa vazia
        return res.render("search-results.html", { total: 0})
        // o total vai ser igual a 0
    }


    // pegar os dados do database
    // tem que colocar aspas simples ali, pois está no sql
    // com o like e as porcentagens, ele acha valores parecidos - qualquer coisa antes e qualquer coisa depois da palavra digitada - só importa a palavra pesquisada
    // igual pesquisa do google e tals -TOP DEMAIS
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        console.log("Aqui estão seus registros: ")
        console.log(rows)
        // Vamos colocar os dados do database dentro do rows
        // o rows só existe aqui dentro! E essa função está guardada para ser chamada mais tarde!
        // Logo, como vamos enviar ele como objeto?
        // basta colocar a linha de código aqui ;)

        // mostrar a página HTML com os dados do banco de dados
        // os dados estão na propriedade do objeto, tendo, essa propriedade, o nome places
        return res.render("search-results.html", { places: rows, total: total})
        // No JS, quanod o nome da proprieade é igual ao nome do valor, pode-se usar apenas total - deixarei sm ser abreviado 
    })


})

// Retornará um objeto de servidor, podendo, como por exemplo,
//ligar o servidor:
server.listen(3000)
// função que ouve a porta 3000 - conseguiremos abrir o localhost com uma porta 3000 sem precisar do live server eu acho
// Há, com isso, uma porta de entrada 3000 aberta - um servidor rodando
