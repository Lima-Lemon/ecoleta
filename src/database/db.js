// importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose()
// require retorna um objeto para colocar ali dentro
// Quando a função está dentro de um objeto, chamamos de método
// Verbose é um método que diz para mostrar mensagens no terminal sempre que acontecer 
//algo

// criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
// graças a essa linha de código, conseguimos usar o require para pegar o cara que está sendo
    //exportaremos o objeto para ser usado em outro local/
    // quem vai acessar o arquivo vai ser a nossa aplicação


// new => inicia um novo objeto, desde que, o seguinte, seja um constructor (classe)
//logo, inicia um objeto dessa forma
// Database(algo) => algo =argumento que é usado para criar um banco de dados para esse caminho .=raiz do projeto 
// criar um arquivo de nome database ali

// rodamos este arquivo no terminal -> criou o database.db - banco de dados sqlite3

// utilizar o objeto de banco de dados para nossas operações


//db.serialize(() => {
//     // com comando sql:
//     // 1) Criar uma tabela- dentro do database, terá várias tabelas
//     // as tabelas podem ser relacionadas - exemplo dos clientes com Estados

//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)
//     // criando uma tabela chamada places
//     // * id = identificador de um registro colocado nessa tabela - para diferenciá-los, pois não se repete
//     // INTEGER = tipo numério do sql; PRIMARY KEY = campo principal da tabela, usado para identificar o registro
//             // AUTOINCREMENT = vai ter números que vão se incrementar -> começa com 1, depois 2 e assim sucessivamente -msm se deletarmos o 5, ele não será reposto,
//             //pois deve ser único. Vírgula indicando que o campo está configurado. O último não possui vírgula!

//             //Se a tabela não existe, ele cria. Se existir, não vai fazer nada.


//     //quando a função run ler essa string, ela vai fazer o que queremos

//     // string com crase -> consegue dar uma quebra de linha sem estragar o código

//     // 2) Inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `
// // inserir, em places (nos campos de places), os valores (inserir eles nos campos)
// // ? => mais tarde trocaremos os valores de uma maneira dinâmica
//     const values = [
//         "https://img.ibxk.com.br/2020/01/30/30021141299110.jpg?w=1120&h=420&mode=crop&scale=both",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Nº 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ]

//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err)
//             // retornar um erro se tiver
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this) // usando essa palavra, a lógica fica grande => não pode usar a arrow function
//         // this é um objeto dentro dessa função que está referenciando a resposta que o run está trazendo
//     }

//     db.run(query, values, afterInsertData)
//         // não colocamos o parênteses, pois estamos passando como referência. Se tivesse o parênteses, iria executar
//         // a função. Queremos que execute como uma callback e não imediatamente.

//         // função executada assim que rodar a inserção no banco de dados
//         // callback - estilo dessa função = chame essa função de volta após realizar o anterior (?)
//         // ela é chamada depois de um certo tempo - fica guardada para executar mais tarde, somente depois de terminar o código anterior
//         // é como se chegasse em uma loja de roupas e pedir para alguém pegar uma no depósito -> a pessoa vai lá, 
//         //mas você não vai ficar parado e, quando a roupa voltasse, você faria a avaliação da roupa
//         // a aplicação continua ocorrendo e, quando voltar, executa a função
        

//     // segundo argumento para atribuir aqueles valores - inserindo um registro na tabela
//     // quando rodar o arquivo, criar o db, como já foi criado, não cria dnv, cria a tabela se não existe ainda
//     // e inste um dado

    


//     // 3) Consultar os dados da tabela
//     //db.all(`SELECT * FROM places`, function(err, rows) {
//     //    if (err) {
//     //        return console.log(err)
//     //    }


//     //    console.log("Aqui estão seus registros")
//     //    console.log(rows)
//         // array com os objetos - cada objeto com uma inserção
//     //})

//     //rows = registros da  tabela => vêm no formato de array
//     // * = todos os campos


    //4) Deletar um dado da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [4], function(err) {
    //    if (err) {
    //        return console.log(err)
    //    }

    //    console.log("Registros deletado com sucesso!")
    // })
//     // quando usamos interrogação, o valor dela é passado depois em uma coleção


//})
//     // serialize => rodará uma sequência de código
