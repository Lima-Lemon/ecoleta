function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            // estamos selecionando, no states pego do site, valores para adicionar às opções,
            // mudando o valor para state.id e mudando o nome que aparece na opção para state.nome
            // Então: ele foi no site, buscou eles, transformou em um jason e rodou a função,
            // a qual ele faz uma estrutura de repetição para colocar no HTML vários options para nós
        }
    } )
}

populateUFs()

function getCities(event) {
    // sempre que ele entrar, no change, o evento pode ser passado para dentro da função (chamar ele como parâmetro)
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    // fala qual o número do target do evento
    stateInput.value = event.target.options[indexOfSelectedState].text

    // target - seleciona o select e pega todos os options e pega, de uma maneira dinâmica
    //os dados do valor do estado selecionado - pega o texto dele
    // seleciona o input state e adiciona ele em uma constante stateInput - caso queira apagar
    //, para deixar o código mais enxuto, o select e o input, funciona do mesmo jeito

    // como a função é chamada sempre que o ufValue é alterado, alteraremos o stateInput aqui.

    // o que é o evento? o evento é o change - mudar - ele é um objeto que traz várias informações
    // uma dessas informações é o target =>  onde que o evento foi executado -> foi exectutado naquele select
    // no caso, o select "uf". Com isso, podemos olhar qual é o valor desse target - logo
    //, vai ser o state id

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    //estamos colocando, no link padrão do IBGE, o valor do estado adquirido e armazenado na constante
    //assim, temos uma url dinâmica

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    // Limpando o conteúdo antes de adicionar algum novo valor
    //Como nada foi colocado para o value, ele fica vazio

    citySelect.disabled = true
    //  Bloqueando a cidade de novo, para liberar apenas quando atualizar as cidades para o Estao correto

    fetch(url)
    .then( res => res.json())
    .then( cities => {

        
        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        // alteramos o city.id para city.nome (primeira aparição), pois optamos
        // por guardar o nome ao invés do id no banco de dados

        citySelect.disabled = false
    })
}


document
    .querySelector("select[name=uf]")
    
    .addEventListener("change", getCities)
    
    
    //procura o seletor que possui o nome uf
    //estamos passando a função getCities por referência -> não abre e fecha parênteses, pois
    // não é para executar. Quando mudar que ela será executada
    // meio que está apenas registrando aquela função no local
    //ouvidor de eventos -> vai estar ouvindo algum evento -> js possui vários eventos
    // um dos eventos: mudança
    // recebe dois parâmetros -> o que está ouvindo e o que vai executar
    // () => {} : é a mesma coisa que escrever uma função anônima ali -> =function(){}
    // Isso é chamado de arrow function
    // Parece que ele também pode receber um evento quando essa função for executada - não mexeremos com isso agora


// Ítens de coleta
// pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")
// Coloca todos os li's encontrados dentro do itemsToCollect

for (const item of itemsToCollect ) {
    item.addEventListener("click", handleSelectedItem)
    // adicionando o ouvidor de evento "click" para cada item
    // Coloca uma função por referência
}

let selectedItems = []
// Toda vez que o evento é disparado, ele passa, para dentro da função, um evento

const collectedItems = document.querySelector("input[name=items]")
function handleSelectedItem(event) {

    const itemLi = event.target

    // adicionar ou remover uma classe com JS
    itemLi.classList.toggle("selected")
    // propriedade de classList que tem a funcionalidade de adicionar ou remover

    const itemId = itemLi.dataset.id
    
    // O li é o elemento pai e, como ele está sendo selecionado no geral, todos os filhos 
    // do li também estão recebendo a propriedade de click - essa linguagem de pai e filho
    // é realmente utilizada na área
    // Para evitar essa situação, fizemos uma alteração no css para mudar a situação de resposta
    // a eventos para a imagem e o span

    // criamos um input:hidden para armazenar os valores de click

    // verificar se existem itens selecionados. Caso positivo, pegar os itens selecionados.

    const alreadySelected = selectedItems.findIndex( function(item) {
        // o item recebido => pega o selected e faz o dinIndex. Para cada item que ele pegar, ele executa
        // essa função.

        // o alreadySelected recebe, então, o índice do elemento que for encontrado
        const itemFound = item == itemId
        return itemFound
    })

    if ( alreadySelected != -1 ) {
        // Se já estiver selecionado, tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            // quando retornar falso, ele vai identificar que o item que 
            // está sendo analisado deve ser removido - filtrado - do array
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        // filter => vai entrar na lista e rodar uma função para cada item do array, assim
        // como o anterior que eu fiquei confuso
        
        selectedItems = filteredItems

    } else {
        // Caso não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
        // o push coloca um elemento dentro do array
    }

    // Atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems


}