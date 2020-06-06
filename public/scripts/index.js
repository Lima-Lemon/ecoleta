const buttonSearch = document.querySelector("#page-home main a")

// quando é o All, devolve uma lista de elementos em vez de só o elemento
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
    // remove a classe hide
})

close.addEventListener("click", () => {
    //Quando clicar no a, vai executar uma função anônima (essa)
    modal.classList.add("hide")
})