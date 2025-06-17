// Seletores de elementos HTML
const elementoCartaJogador = document.getElementById('carta-jogador');
const elementoCartaIA = document.getElementById('carta-ia');
const elementoBotoesAtributos = document.getElementById('botoes-atributos');
const elementoMensagem = document.getElementById('mensagem');
const elementoPlacarJogador = document.getElementById('placar-jogador');
const elementoPlacarIA = document.getElementById('placar-ia');
const botaoProximaRodada = document.getElementById('botao-proxima-rodada');
const botaoReiniciar = document.getElementById('botao-reiniciar');

// Variáveis de estado do jogo
let baralhoPrincipal = [];
let baralhoJogador = [];
let baralhoIA = [];
let cartaJogador;
let cartaIA;
let placarJogador = 0;
let placarIA = 0;
let rodadaAtiva = false; // Controla se uma rodada está em andamento para evitar cliques múltiplos

// Mapeamento de nomes de atributos para exibição
const nomesAtributos = {
    velocidade: "Velocidade Máxima (km/h)",
    potencia: "Potência (cv)",
    aceleracao: "Aceleração 0-100 km/h (s)",
    consumo: "Consumo (km/l)",
    preco: "Preço (R$ mil)"
};

// --- Funções de Lógica do Jogo ---

/**
 * Embaralha um array (algoritmo Fisher-Yates).
 * @param {Array} array - O array a ser embaralhado.
 * @returns {Array} O array embaralhado.
 */
function embaralhar(array) {
    let currentIndex = array.length, randomIndex;
    // Enquanto houver elementos a embaralhar.
    while (currentIndex !== 0) {
        // Pega um elemento restante.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // E o troca com o elemento atual.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

/**
 * Inicia ou reinicia o jogo.
 */
function iniciarJogo() {
    // Reseta o placar
    placarJogador = 0;
    placarIA = 0;
    atualizarPlacar();

    // Cria uma cópia do baralho original e embaralha
    baralhoPrincipal = embaralhar([...cartas]);

    // Divide as cartas igualmente entre jogador e IA
    baralhoJogador = baralhoPrincipal.slice(0, baralhoPrincipal.length / 2);
    baralhoIA = baralhoPrincipal.slice(baralhoPrincipal.length / 2);

    // Reseta a visibilidade de elementos
    botaoProximaRodada.style.display = 'none';
    elementoCartaIA.classList.add('carta-escondida'); // Esconde a carta da IA
    elementoCartaIA.innerHTML = '<img src="https://st.depositphotos.com/1257959/3100/v/950/depositphotos_31006427-stock-illustration-playing-card-back-side.jpg" alt="Carta da IA escondida">'; // Imagem genérica

    // Começa a primeira rodada
    proximaRodada();
}

/**
 * Distribui as cartas para a próxima rodada, se houver.
 */
function proximaRodada() {
    rodadaAtiva = true; // Permite que o jogador escolha um atributo
    desabilitarBotoesAtributos(false); // Habilita os botões de atributo
    elementoMensagem.textContent = "Escolha um atributo para competir!";

    // Limpa classes de animação da rodada anterior
    elementoCartaJogador.classList.remove('vencedora', 'perdedora');
    elementoCartaIA.classList.remove('vencedora', 'perdedora');

    // Esconde a carta da IA novamente
    elementoCartaIA.classList.add('carta-escondida');
    elementoCartaIA.innerHTML = '<img src="https://st.depositphotos.com/1257959/3100/v/950/depositphotos_31006427-stock-illustration-playing-card-back-side.jpg" alt="Carta da IA escondida">';

    if (baralhoJogador.length === 0) {
        finalizarJogo("A IA venceu o jogo! Suas cartas acabaram.");
        return;
    }
    if (baralhoIA.length === 0) {
        finalizarJogo("Você venceu o jogo! A IA ficou sem cartas.");
        return;
    }

    // Pega a primeira carta de cada baralho
    cartaJogador = baralhoJogador.shift();
    cartaIA = baralhoIA.shift();

    // Atualiza a interface com a carta do jogador
    exibirCarta(cartaJogador, elementoCartaJogador, true);
    // Não exibe a carta da IA ainda, apenas a moldura
    // exibirCarta(cartaIA, elementoCartaIA, false); // Comentar esta linha

    // Oculta o botão de próxima rodada
    botaoProximaRodada.style.display = 'none';
}

/**
 * Exibe uma carta na interface.
 * @param {Object} carta - O objeto da carta a ser exibido.
 * @param {HTMLElement} elementoAlvo - O elemento HTML onde a carta será exibida.
 * @param {boolean} isJogador - Indica se é a carta do jogador para exibir os botões de atributo.
 */
function exibirCarta(carta, elementoAlvo, isJogador) {
    elementoAlvo.innerHTML = `
        <h3>${carta.nome}</h3>
        <img src="${carta.imagem}" alt="${carta.nome}">
        <div class="atributos">
            <p><strong>${nomesAtributos.velocidade}:</strong> ${carta.atributos.velocidade} km/h</p>
            <p><strong>${nomesAtributos.potencia}:</strong> ${carta.atributos.potencia} cv</p>
            <p><strong>${nomesAtributos.aceleracao}:</strong> ${carta.atributos.aceleracao} s</p>
            <p><strong>${nomesAtributos.consumo}:</strong> ${carta.atributos.consumo} km/l</p>
            <p><strong>${nomesAtributos.preco}:</strong> R$ ${carta.atributos.preco}.000</p>
        </div>
    `;

    if (isJogador) {
        // Cria os botões de atributo para a carta do jogador
        elementoBotoesAtributos.innerHTML = ''; // Limpa botões anteriores
        for (const atributo in carta.atributos) {
            const botao = document.createElement('button');
            botao.textContent = nomesAtributos[atributo];
            botao.setAttribute('data-atributo', atributo);
            botao.addEventListener('click', () => {
                if (rodadaAtiva) { // Só permite clicar se a rodada estiver ativa
                    jogar(atributo);
                }
            });
            elementoBotoesAtributos.appendChild(botao);
        }
    }
}

/**
 * Desabilita/habilita os botões de atributo.
 * @param {boolean} desabilitar - True para desabilitar, false para habilitar.
 */
function desabilitarBotoesAtributos(desabilitar) {
    const botoes = elementoBotoesAtributos.querySelectorAll('button');
    botoes.forEach(botao => {
        botao.disabled = desabilitar;
    });
}

/**
 * Lógica principal da rodada do jogo.
 * @param {string} atributoEscolhido - O atributo escolhido pelo jogador.
 */
function jogar(atributoEscolhido) {
    if (!rodadaAtiva) return; // Impede múltiplas execuções

    rodadaAtiva = false; // Desabilita a rodada para evitar novos cliques
    desabilitarBotoesAtributos(true); // Desabilita os botões após a escolha

    // Lógica da IA para escolher o melhor atributo
    const atributoIA = escolherMelhorAtributoIA(cartaIA);
    // Exibe o atributo escolhido pela IA
    setTimeout(() => { // Pequeno atraso para a mensagem da IA aparecer
        alert("A IA escolheu competir em: " + nomesAtributos[atributoIA]);

        // Revela a carta da IA
        elementoCartaIA.classList.remove('carta-escondida');
        exibirCarta(cartaIA, elementoCartaIA, false);

        // Compara os atributos
        compararAtributos(atributoEscolhido, atributoIA);

        // Exibe o botão de próxima rodada
        botaoProximaRodada.style.display = 'block';
    }, 1000); // Atraso de 1 segundo para a mensagem da IA
}

/**
 * Compara os atributos das cartas e determina o vencedor da rodada.
 * @param {string} atributoJogador - O atributo escolhido pelo jogador.
 * @param {string} atributoIA - O atributo escolhido pela IA.
 */
function compararAtributos(atributoJogador, atributoIA) {
    const valorJogador = cartaJogador.atributos[atributoJogador];
    const valorIA = cartaIA.atributos[atributoIA];

    let resultado;

    // Atributos onde MAIOR valor vence: Velocidade, Potência, Preço
    if (['velocidade', 'potencia', 'preco'].includes(atributoJogador)) {
        if (valorJogador > valorIA) {
            resultado = 'jogador';
        } else if (valorIA > valorJogador) {
            resultado = 'ia';
        } else {
            resultado = 'empate';
        }
    }
    // Atributos onde MENOR valor vence: Aceleração, Consumo
    else if (['aceleracao', 'consumo'].includes(atributoJogador)) {
        if (valorJogador < valorIA) {
            resultado = 'jogador';
        } else if (valorIA < valorJogador) {
            resultado = 'ia';
        } else {
            resultado = 'empate';
        }
    }

    // Atualiza o jogo com base no resultado
    atualizarResultadoRodada(resultado);
}

/**
 * Atualiza o placar e a mensagem de status da rodada.
 * @param {string} resultado - 'jogador', 'ia' ou 'empate'.
 */
function atualizarResultadoRodada(resultado) {
    if (resultado === 'jogador') {
        elementoMensagem.textContent = "Você venceu esta rodada!";
        placarJogador++;
        baralhoJogador.push(cartaJogador, cartaIA); // Jogador leva ambas as cartas
        elementoCartaJogador.classList.add('vencedora');
        elementoCartaIA.classList.add('perdedora');
    } else if (resultado === 'ia') {
        elementoMensagem.textContent = "A IA venceu esta rodada!";
        placarIA++;
        baralhoIA.push(cartaJogador, cartaIA); // IA leva ambas as cartas
        elementoCartaIA.classList.add('vencedora');
        elementoCartaJogador.classList.add('perdedora');
    } else {
        elementoMensagem.textContent = "Empate! As cartas voltam para o baralho.";
        baralhoJogador.push(cartaJogador); // As cartas voltam para o fundo de seus baralhos
        baralhoIA.push(cartaIA);
    }
    atualizarPlacar();
}

/**
 * Atualiza a exibição do placar.
 */
function atualizarPlacar() {
    elementoPlacarJogador.textContent = placarJogador;
    elementoPlacarIA.textContent = placarIA;
}

/**
 * Lógica da IA para escolher o melhor atributo da sua carta.
 * A estratégia é simples: normaliza cada atributo e escolhe o que tem maior "score".
 * @param {Object} cartaDaIA - A carta atual da IA.
 * @returns {string} O nome do atributo escolhido pela IA.
 */
function escolherMelhorAtributoIA(cartaDaIA) {
    const scores = {
        velocidade: (cartaDaIA.atributos.velocidade / 350), // Normaliza de 0 a 1 (max aprox 350)
        potencia: (cartaDaIA.atributos.potencia / 1000),     // Normaliza de 0 a 1 (max aprox 1000)
        aceleracao: 1 - (cartaDaIA.atributos.aceleracao / 10), // Menor é melhor, então inverte (max aprox 10s)
        consumo: 1 - (cartaDaIA.atributos.consumo / 30),     // Menor é melhor, então inverte (max aprox 30km/l)
        preco: (cartaDaIA.atributos.preco / 2000)            // Normaliza de 0 a 1 (max aprox 2000)
    };

    // Retorna a chave (nome do atributo) com maior score
    return Object.keys(scores).reduce((a, b) =>
        scores[a] > scores[b] ? a : b
    );
}

/**
 * Finaliza o jogo e exibe a mensagem do vencedor.
 * @param {string} mensagemFinal - A mensagem a ser exibida no final do jogo.
 */
function finalizarJogo(mensagemFinal) {
    elementoMensagem.textContent = mensagemFinal;
    desabilitarBotoesAtributos(true); // Desabilita os botões de atributo
    botaoProximaRodada.style.display = 'none'; // Esconde o botão de próxima rodada
    rodadaAtiva = false; // Garante que nenhuma nova rodada possa começar automaticamente
}


// --- Event Listeners ---

// Evento de clique para o botão de próxima rodada
botaoProximaRodada.addEventListener('click', proximaRodada);

// Evento de clique para o botão de reiniciar jogo
botaoReiniciar.addEventListener('click', iniciarJogo);

// --- Inicialização do Jogo ---
document.addEventListener('DOMContentLoaded', iniciarJogo);