const musica = [
    {
        nome: "Minha música",
        artista: "Sotan",
        arquivo: "musicas/musica1.mp3",
        imagem: "musica1.mp3"
    },
    {
        nome: "Outra música",
        artista: "Leon s kennedy",
        arquivo: "musicas/musica2.mp3",
        imagem: "musica2.mp3"
    },
    {
        nome: "Terceira música",
        artista: "Link do Zap",
        arquivo: "musicas/musica3.mp3",
        imagem: "musica3.mp3"
    }
];

const listaMusicas = document.querySelector("#Musicas");

let musicaAtual = 0;

const audio = new Audio(musica[musicaAtual].arquivo);


const nomeMusica = document.querySelector("#NomeMusica");
const nomeArtista = document.querySelector("#NomeArtista");

let botaoMusicaAtual = null;

const botoesMusicas = [];

musica.forEach(function(item, index) {

    const div = document.createElement("div");

    div.classList.add("musica");

    const nome = document.createElement("h3");
    nome.textContent = item.nome;

    const artista = document.createElement("p");
    artista.textContent = item.artista;

    div.appendChild(nome);
    div.appendChild(artista);

    const imagem = document.createElement("img");
    imagem.src = "Spotify_App_Logo.svg.webp";

    div.appendChild(imagem);

    const botaoMusica = document.createElement("button");
    botaoMusica.textContent = "play";

    botoesMusicas.push(botaoMusica);

    botaoMusica.addEventListener("click", function() {

       if (musicaAtual === index) {

    if (audio.paused) {
        audio.play();
        botaoMusica.textContent = "Pause";
    } else {
        audio.pause();
        botaoMusica.textContent = "Play";
    }

} else {

    musicaAtual = index;
    audio.src = item.arquivo;
    audio.play();

}

        nomeMusica.textContent = item.nome;
        nomeArtista.textContent = item.artista;

        if (botaoMusicaAtual && botaoMusicaAtual !== botaoMusica) {
            botaoMusicaAtual.textContent = "Play";
        }

        botaoMusicaAtual = botaoMusica;

    });

    div.appendChild(botaoMusica);
    listaMusicas.appendChild(div);

    });


const botao = document.querySelector("#PlayPause");
const botaoProxima = document.querySelector("#Proxima");
const botaoAnterior = document.querySelector("#Anterior");
const progresso = document.querySelector("#progresso");
const tempo = document.querySelector("#tempo");
const volume = document.querySelector("#volume");
let duracaoTotal = 0;

nomeMusica.textContent = musica[musicaAtual].nome;
nomeArtista.textContent = musica[musicaAtual].artista;

botao.addEventListener("click", function() {

    if (audio.paused) {
        audio.play();
        botao.textContent = "Pause";
    } else {
        audio.pause();
        botao.textContent = "Play";
    }

});

botaoProxima.addEventListener("click", function() {

    if (musicaAtual < musica.length - 1) {

        musicaAtual++;

        botoesMusicas[musicaAtual].textContent = "Pause";

        if (botaoMusicaAtual) {
            botaoMusicaAtual.textContent = "Play";
        }

        audio.src = musica[musicaAtual].arquivo;
        nomeMusica.textContent = musica[musicaAtual].nome;
        nomeArtista.textContent = musica[musicaAtual].artista;

        audio.play();
        botao.textContent = "Pause";
    }

});

botaoAnterior.addEventListener("click", function() {

    if (musicaAtual > 0) {

        musicaAtual--;

        if (botaoMusicaAtual) {
            botaoMusicaAtual.textContent = "Play";
        }
        audio.src = musica[musicaAtual].arquivo;
        nomeMusica.textContent = musica[musicaAtual].nome;
        nomeArtista.textContent = musica[musicaAtual].artista;

        audio.play();
        botao.textContent = "Pause";
    }

});

audio.addEventListener("ended", function() {
    if (musicaAtual < musica.length - 1) {
        musicaAtual++;
        audio.src = musica[musicaAtual].arquivo;
        nomeMusica.textContent = musica[musicaAtual].nome;
        nomeArtista.textContent = musica[musicaAtual].artista;
        audio.play();
        botao.textContent = "Pause";
    }
});

audio.addEventListener("timeupdate", function() {
    const progressoAtual = (audio.currentTime / audio.duration) * 100;
    progresso.value = progressoAtual;

    const minutos = Math.floor(audio.currentTime / 60);
    const segundos = Math.floor(audio.currentTime % 60);

    const segundosFormatados = segundos < 10 ? "0" + segundos : segundos;

    const minutosTotal = Math.floor(duracaoTotal / 60);
    const segundosTotal = Math.floor(duracaoTotal % 60);

    const segundosTotalFormatados = segundosTotal < 10 ? "0" + segundosTotal : segundosTotal;

    tempo.textContent = minutos + ":" + segundosFormatados + " / " + minutosTotal + ":" + segundosTotalFormatados;
});

audio.addEventListener("loadedmetadata", function() {
    const minutosTotal = Math.floor(audio.duration / 60);

    const segundosTotal = Math.floor(audio.duration % 60);

    const segundosFormatados = segundosTotal < 10 ? "0" + segundosTotal : segundosTotal;
    tempo.textContent = minutosTotal + ":" + segundosFormatados;

    duracaoTotal = audio.duration;
    
});

progresso.addEventListener("input", function() {
    const novoTempo = (progresso.value / 100) * audio.duration;
    audio.currentTime = novoTempo;
});

volume.addEventListener("input", function() {
    audio.volume = volume.value / 100;
});

document.addEventListener("keydown", function(event) {

    if (event.code === "Space") {

        if (audio.paused) {
            audio.play();
            botao.textContent = "Pause";
        } else {
            audio.pause();
            botao.textContent = "Play";
        }

    }

});