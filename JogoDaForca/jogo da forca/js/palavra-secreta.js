let palavras = [
    'CARRO',    'PRAIA',    'BONECA',     'MOSTARDA',    'CALIBRE',
    'COQUETEL', 'CORRIDA',  'MORTADELA',  'POUSADA',     'TERRA',
    'COMIDA',   'VESTIDO',  'CADERNO',    'MAQUIAGEM',   'DIA',
    'ESTRADA',  'ESTACIONAMENTO', 'OLHO', 'CASTELO',     'MOTO',
    'BARBATANA','HOSPITAL', 'CASAMENTO',  'TRABALHO',    'DIAGRAMA',
    'MATERNIDADE','ELEFANTE', 'PROFESSOR', 'ADVOGADO',    'TECLADO'   
];
let letrasUsadas = [];
let letrasCorretas = [];
let palavraCorreta = '';
let tentativas = 0;
let sorteiaPalavra;

function palavraSecreta(palavras) {
    // Sorteia uma palavra do array
    sorteiaPalavra = palavras[Math.floor(Math.random() * palavras.length)];
    // Divide a palavra sorteada em letras separadas
    letrasSeparadas = sorteiaPalavra;

    return letrasSeparadas;
}

function verificaLetras(key) {
    // Chave de teste para caracteres especiais
    let re = new RegExp("^[A-Z/s]+$");

    //Checar condição valida

    if (letrasCorretas.includes(key) || key.length > 1 ||
        letrasUsadas.includes(key) || !re.test(key)) {
        return false;
    } else {
        return true;
    }
}

// Função para verificar se a letra está correta
function letraCorreta(i) {
    // Função para verificar se a letra está correta
    palavraCorreta += letrasSeparadas[i];
}

function letraIncorreta() {
    // adiciona tentativas
    tentativas += 1;
    // desenha partes do corpo
    if (tentativas == 1) {
        desenhaCabeca();
    }
    if (tentativas == 2) {
        desenhaCorpo();
    }
    if (tentativas == 3) {
        desenhaBracoEsquerdo();
    }
    if (tentativas == 4) {
        desenhaBracoDireito();
    }
    if (tentativas == 5) {
        desenhaPernaEsquerda();
    }
    if (tentativas == 6) {
        desenhaPernaDireita();
        fimDeJogo();
    }
}

function fimDeJogo() {
    // Mostrar o botão para iniciar um novo jogo
    let botaoNovoJogo = document.querySelector("#botao-novo-jogo");
    botaoNovoJogo.style.display = "block";
    // Desenha a mensagem de fim de jogo
    pincel.font = "bold 40px Inter";
    pincel.fillStyle = "red";
    pincel.fillText("Você perdeu! A palavra escolhida era: " + letrasSeparadas,100,150);
}

function ganharJogo() {
    //Mostrar botão novo jogo
    let botaoNovoJogo = document.querySelector("#botao-novo-jogo");
    botaoNovoJogo.style.display = "block";
    // Exibir mensagem de parabéns
    pincel.font = "bold 40px Inter";
    pincel.fillStyle = "purple";
    pincel.fillText("Parabéns! Você ganhou!", 400, 150);
}

document.addEventListener("keydown", function (evento) {
    if (evento.target == inputPalavras) {return;}

    let teclas = evento.key;
    teclas = evento.key.toUpperCase();
    if (verificaLetras(teclas)) {
        for (let i = 0; i < letrasSeparadas.length; i++) {
            if (letrasSeparadas[i] === teclas) {
                desenhaLetras(i);
                letrasCorretas.push(teclas.toUpperCase());
                if (letrasSeparadas.length === letrasCorretas.length) {
                    ganharJogo();
                }
            }
        }
        if (!letrasSeparadas.includes(teclas) &&
            !letrasUsadas.includes(teclas)) {
            letrasUsadas.push(teclas.toUpperCase());
            letraIncorreta();
            desenhaLetraIncorreta(teclas, tentativas);
        }
    }
});