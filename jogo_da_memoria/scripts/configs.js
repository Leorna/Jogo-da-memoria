'use strict'

/*CONFIGURACOES DO JOGO*/

let textosSobrepostos

class ControladorDeAudio {
    constructor() {
        //audio quando o jogador perde
        this.$perdeuAudio = new Audio('audios/Going-Different-Ways.mp3')

        //audio quando o jogador ganha
        this.$ganhouAudio = new Audio('audios/Cheering 3-SoundBible.com-1680253418.mp3')

        //audio quando a carta vira
        this.$flipAudio = new Audio('audios/Card-flip-sound-effect.mp3')

        //audio quando há duas cartas iguais
        this.$matchAudio = new Audio('audios/Strike-a-match.mp3')
    }

    somFlip() {
        //audio do flip da carta
        this.$flipAudio.play()
    } 

    somMatch() {
        //audio de quando o jogador acerta duas cartas
        this.$matchAudio.play()

        //em 1 segundo pausa o audio
        setTimeout(this.$matchAudio.pause, 1000)

        //definindo tempo atual do audio como 0
        this.$matchAudio.currentTime = 0
    }

    somGanhou() {
        //audio de quando o jogador ganha
        this.$ganhouAudio.play()

        setTimeout(this.$ganhouAudio.pause, 3000)
    }

    somPerdeu() {
        //audio de quando o jogador perde
        this.$perdeuAudio.play()

        setTimeout(()=> {
            this.$perdeuAudio.pause()
        }, 3000)
    }
}


class ControladorDeJogo {
    constructor(pontos, totalPontos, restartJogo, p) {
        this.$tempoTotal = 50
        this.$tempo = this.$tempoTotal
        this.$timer = document.getElementById('tempo')
        this.$audio = new ControladorDeAudio
        this.$pontos = pontos
        this.$totalPontos = totalPontos
        this.restartJogo = restartJogo
        this.$p = p
    }

    start() {
        setTimeout(()=> {
            this.contadorTempo = this.contarTempo()
        }, 500)
    }

    contarTempo() {
        return setInterval(()=> {
            this.$tempo--
            this.$timer.innerText = this.$tempo

            if(this.$tempo === 0)
                this.gameOver()
            else if(this.conferirVitoria())
                this.gameWin()

        }, 1000)
    }

    addPontos() {
        this.$pontos += 1
        this.$p.innerHTML = this.$pontos 
    }

    conferirVitoria() {
        if(this.$pontos === this.$totalPontos)
            return true
        return false
    }

    gameOver() {
        clearInterval(this.contadorTempo)
        this.$timer.innerText = 50
        this.$audio.somPerdeu()
        document.getElementById('texto-game-over').classList.add('visivel')
        this.restartJogo() 
    }

    gameWin() {
        clearInterval(this.contadorTempo)
        this.$timer.innerText = 50
        this.$audio.somGanhou()
        document.getElementById('texto-game-won').classList.add('visivel')
        this.restartJogo()
    }
}


function removerVisivel() {
    this.classList.remove('visivel')
    jogo.start() //objeto de jogablilidade.js
}

function loopPelosTextos() {
    textosSobrepostos.forEach(textoSobreposto=> {
        textoSobreposto.addEventListener('click', removerVisivel)
    })
}

function iniciar() {
    console.log('inicar()')
    textosSobrepostos = document.querySelectorAll('.texto-sobreposto')

    console.log(textosSobrepostos)

    loopPelosTextos()
}


//se a pag estiver carregando
if(document.readyState === 'loading') {
    //DOMContentLoaded é acionado quando todo o HTML foi completamente carregado e analisado
    document.addEventListener('DOMContentLoaded', iniciar)
}
//se a pag ja esta carregada
else {
    iniciar()
}


