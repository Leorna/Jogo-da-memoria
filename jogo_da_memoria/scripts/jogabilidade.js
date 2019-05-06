'use strict'

/*JOGABILIDADE */


/*querySelectorAll 
retorna uma lista 
de elementos 
presentes no documento, uma lista com os elementos que tem a classe .carta*/ 
const cartas = document.querySelectorAll('.carta') 
console.log(cartas)

const numeroDeCartas = cartas.length

const p = document.getElementById('pontos')


const totalPontos = 10
let pontos = 0


let possuiCartaGirada = false
let bloquearJogoContent = false

let primeiraCarta 
let segundaCarta

const audio = new ControladorDeAudio
let jogo = new ControladorDeJogo(pontos, totalPontos, restartJogo, p)

function restartJogo() {
    cartas.forEach(carta=> {
        carta.classList.remove('visivel')
    })
    pontos = 0
    p.innerHTML = pontos

    jogo = new ControladorDeJogo(pontos, totalPontos, restartJogo, p)
    
    embaralhar()
    main()
}


//remove os eventos das cartas que sao iguais
function removerEventoDasCartas() {
    primeiraCarta.removeEventListener('click', girarCarta)
    segundaCarta.removeEventListener('click', girarCarta)

    audio.somMatch()

    //adiciona os pontos
    jogo.addPontos()

    //reseta primeira e segunda carta, e tambem possuiCartaGirada e bloquearJogoContent
    resetJogoContent()
}

function desgirarCartas() {
    bloquearJogoContent = true

    setTimeout(()=> {
        //remove a classe 'girar' das divs com classe .carta
        primeiraCarta.classList.remove('visivel')
        segundaCarta.classList.remove('visivel')

        //redefine os valores de jogoContent
        resetJogoContent()
    }, 500)
}

function conferirIgualdade() {
     //confere se as cartas sao iguais
     let carta1 = primeiraCarta.dataset.iguais
     let carta2 = segundaCarta.dataset.iguais

     let iguais = carta1 === carta2

     //se forem iguais removemos os eventos, se nao desgiramos as cartas
     iguais? removerEventoDasCartas() : desgirarCartas()
}

function girarCarta() {
    //se houver uma carta virada
    if(bloquearJogoContent) return

    //se a carta ja foi clicada, ou seja, é a primeira carta novamente
    if(this === primeiraCarta) return

    //this referencia um elemento com a classe carta
    //classList.toggle adiciona se nao tiver e remove se tiver a classe girar a classe carta
    //this.classList.toggle('girar')
    this.classList.add('visivel') // add apenas adiciona a classe girar
    //this é o elemento que disparou o evento

    //audio de quando a carta é clicada
    audio.somFlip()

    if(!possuiCartaGirada) {
        //primeira vez que o jogador clicou
        possuiCartaGirada = true
        primeiraCarta = this

        return
    }
    
    //segundo clique
    possuiCartaGirada = false
    segundaCarta = this

    conferirIgualdade()
    
}

function resetJogoContent() {
    //[var1, var2] = [valor1, valor2] é o mesmo que
    //let var1 = valor1
    //let var2 = valor2

    [possuiCartaGirada, bloquearJogoContent] = [false, false]
    [primeiraCarta, segundaCarta] = [undefined, undefined]
}

// uma immediately invoked function
//embaralha as cartas, mudando o valor default de order 
function embaralhar() {
    const rand = Math.random
    
    //para cada item da lista de cartas, muda o style.order para um numero aleatorio de 0 a 19
    cartas.forEach(carta=> {
        let posicao = ~~(rand() * numeroDeCartas)
        carta.style.order = posicao
    })
    console.log('embaralhar()')
}


//main, para cada carta dentro da lista de cartas
function main() {
    cartas.forEach(carta=> {
        carta.addEventListener('click', girarCarta)
    })
}

embaralhar()
main()
