const root = document.getElementById('root')
const btnTema = document.getElementById('btnTema');
const IMG_ERRO = 'imagens/erro.png';
let lista = []


btnTema.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});

function Home() {
    let imgHTML = '';
    let textoLegenda = 'Nenhuma imagem cadastrada';

    if (lista[0]) {
        imgHTML = `<img id="principal" src="${lista[0].url}" alt="${lista[0].desc}" onerror="this.onerror=null; this.src='${IMG_ERRO}';" />`;
        textoLegenda = lista[0].desc;
    }

        root.innerHTML = `
            <h2>Galeria de Imagens</h2>
            <section class="galeria">
                <div class="visualizador">
                    ${imgHTML}
                    <p id="legenda">${textoLegenda}</p>
                </div>
                <div id="miniaturas" class="miniaturas"></div>
            </section>
        `;

        if (lista.length > 0) 
        carregarMiniaturas();
    }

function carregarMiniaturas() {
    const miniaturasDiv = document.getElementById('miniaturas');
    const imgPrincipal = document.getElementById('principal');
    const legenda = document.getElementById('legenda');

    for (let i = 0; i < lista.length; i++) {
        const min = document.createElement('img');
        min.src = lista[i].url;
        min.alt = lista[i].desc;

        min.onerror = function () {
            this.src = IMG_ERRO;
        };
        if (i === 0) {
            min.classList.add('selecionada');
        }


        min.addEventListener('click', function () {
            imgPrincipal.src = lista[i].url;
            imgPrincipal.onerror = function () {
                this.src = IMG_ERRO;
            };
            legenda.textContent = lista[i].desc;


            const todasImagens = document.querySelectorAll('#miniaturas img');
            for (let j = 0; j < todasImagens.length; j++) {
                todasImagens[j].classList.remove('selecionada');
            }
            min.classList.add('selecionada');
        });

        miniaturasDiv.appendChild(min);
    }
}

function Register() {
    root.innerHTML = `
    <h2>Cadastro de imagens</h2>
    <section>
    <form onsubmit="salvar(event)">
      <input id="desc" placeholder="Descrição" required />
      <input id="url" placeholder="URL da Imagem" required />
      <button type="submit">Salvar</button> 
      <p id="mensagem"></p>
    </form>
    </section>
  `;
}

function salvar(semReload) {
    semReload.preventDefault();

    const img = {
        desc: document.getElementById('desc').value,
        url: document.getElementById('url').value
    };

    lista.push(img);

    const msg = document.getElementById('mensagem');
    msg.textContent = 'Imagem cadastrada com sucesso!';

    semReload.target.reset();
}