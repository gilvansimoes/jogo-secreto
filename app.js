function updateDimensions() {
    const body = document.body;
    const width = window.innerWidth;
    const altura = window.innerHeight;

    body.style.height = `${altura}px`;
}
updateDimensions();
window.addEventListener('resize', updateDimensions);

let qtdMax = 100;
let listaDeNumerosSorteados = [];
let numChute = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let cont = 0;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
}

function exibirTextoNaTelaPorClass(classes, text) {
    let camp = document.querySelector(classes);
    camp.innerHTML = text;
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == "") {
        const Toast = Swal.mixin({
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: "Necessario informar um número."
          });
        }else if (parseInt(chute) <= 0) {
            const Toast = Swal.mixin({
                toast: true,
                position: "center",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "error",
                title: "Número precisa ser maior que  0."
              });
              limparCampo();
        }else if (parseInt(chute) > 100 ) {
            const Toast = Swal.mixin({
                toast: true,
                position: "center",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "error",
                title: "Número nao poder ser maior que 100."
              });
              limparCampo();    
        } else {    
        if (chute == numeroSecreto) {
            let palavraTentativa = tentativas == 1 ? "tentativa" : "tentativas";
            let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;
            exibirTextoNaTela('h1', 'Parabéns, você acertou!');
            exibirTextoNaTela('p', mensagemTentativa);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            numChute.push(chute);
            const para = document.createElement("div");
            para.className = ("sorteado");
            para.innerHTML = `${numChute[cont]}`;
            document.getElementById("meio").appendChild(para);

            if (chute > numeroSecreto) {
                exibirTextoNaTela('p', `É menor que ${chute}.`);
            } else {
                exibirTextoNaTela('p', `É maior que ${chute}.`);
            }
            tentativas++;
            limparCampo();
            cont++;
        }
    }    
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * qtdMax + 1);
    let qtdElementosNaLista = listaDeNumerosSorteados.length;

    if (qtdElementosNaLista == qtdMax) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
    chute.focus();
}

function reiniciarJogo() {
    numChute = [];
    cont = 0;
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    var elemento = document.getElementById("meio");
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }    
}

function exibirMensagemInicial() {
    let mensagem = `Escolha um número entre 1 e ${qtdMax}`;

    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', mensagem);
    exibirTextoNaTelaPorClass(".texto__titulo__chute","Números Inseridos");
    exibirTextoNaTelaPorClass(".texto__rodape","GSB - gilvan.simoesdebarros@gmail.com");
}
exibirMensagemInicial();