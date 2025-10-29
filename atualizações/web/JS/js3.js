function mostrarProdutos(produtos) {
    const container = document.getElementById('produtos-container');
    container.innerHTML = ''; 
    produtos.forEach((produto) => {
        const card = `
            <div class="card">
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h2>${produto.nome}</h2>
                <p>R$ ${produto.preco.toFixed(2)}</p>
                <p>${produto.descricao}</p>
                <div class="button-group">
                    <button class="botao1" onclick="mostrarDetalhes(${produto.id})">
                        <i class="fa fa-info-circle"></i> Detalhes
                    </button>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}

function atualizarPagina() {
  window.location.reload();
}

const urlLocal = "http://localhost:3000/produto";
const urlVercel = "https://back-end-tcc-gamma.vercel.app/produto";

async function buscarProdutos() {
    try {
        const [responseLocal, responseVercel] = await Promise.all([
            fetch(urlLocal),
            fetch(urlVercel)
        ]);
        
        if (!responseLocal.ok && !responseVercel.ok) {
            throw new Error('Ambas as APIs falharam ao buscar os produtos');
        }

        const produtosLocal = responseLocal.ok ? await responseLocal.json() : [];
        const produtosVercel = responseVercel.ok ? await responseVercel.json() : [];

        const produtos = [...produtosLocal, ...produtosVercel];
        
        mostrarProdutos(produtos);  
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

function mostrarDetalhes(id) {
    const produto = produtos.find(p => p.id === id);
    alert(`Detalhes do produto: ${produto.nome}\nPreço: R$ ${produto.preco.toFixed(2)}\nDescrição: ${produto.descricao}`);
}

function adicionarCarrinho() {
    const idProduto = document.getElementById('adicionarCarrinho').getAttribute('data-id');
    const produto = produtos.find(p => p.id == idProduto);

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtoNoCarrinho = carrinho.find(p => p.id === produto.id);

    if (produtoNoCarrinho) {
        produtoNoCarrinho.quantidade += 1;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    fecharModal();
}

const imgs = document.querySelectorAll('.carousel img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const indicatorsContainer = document.querySelector('.carousel-indicators');

let index = 0; // índice da imagem central
let autoSlide; // autoplay

// Cria as bolinhas de acordo com a quantidade de imagens
imgs.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active-dot'); // primeira bolinha ativa
    dot.addEventListener('click', () => {
        index = i;
        updateCarousel();
        resetAuto();
    });
    indicatorsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateCarousel() {
    imgs.forEach((img, i) => {
        img.classList.remove('active', 'left', 'right', 'hidden');

        if (i === index) {
            img.classList.add('active'); // central
        } else if (i === (index - 1 + imgs.length) % imgs.length) {
            img.classList.add('left'); // esquerda
        } else if (i === (index + 1) % imgs.length) {
            img.classList.add('right'); // direita
        } else {
            img.classList.add('hidden'); // fora do foco
        }
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active-dot', i === index);
    });
}

function next() {
    index = (index + 1) % imgs.length;
    updateCarousel();
}

function prev() {
    index = (index - 1 + imgs.length) % imgs.length;
    updateCarousel();
}

function resetAuto() {
    clearInterval(autoSlide);
    autoSlide = setInterval(next, 4000);
}

nextBtn.addEventListener('click', () => {
    next();
    resetAuto();
});
prevBtn.addEventListener('click', () => {
    prev();
    resetAuto();
});

autoSlide = setInterval(next, 4000);
updateCarousel();

const texts = document.querySelectorAll('.banner-text');
let currentIndex = 0;

function changeText() {
    texts.forEach((text) => {
        text.classList.remove('active');
        text.style.color = '#f7f7f7ff';
    });
    texts[currentIndex].classList.add('active');
    texts[currentIndex].style.color = getRandomColor();
    currentIndex = (currentIndex + 1) % texts.length;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

changeText();
setInterval(changeText, 3000);
const banner = document.querySelector(".banner");
const bannerTexts = document.querySelectorAll(".banner-text");
let bannerIndex = 0;

function showNextText() {
    bannerTexts.forEach(text => text.classList.remove("active"));
    bannerTexts[bannerIndex].classList.add("active");
    if (bannerIndex === 0) banner.style.backgroundColor = "#00a6f3f6";
    else if (bannerIndex === 1) banner.style.backgroundColor = "#0303fffb";
    else if (bannerIndex === 2) banner.style.backgroundColor = "#eeff00ff";

    bannerIndex = (bannerIndex + 1) % bannerTexts.length;
}

setInterval(showNextText, 3000);
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const produtosContainer = document.getElementById('produtos-container');

let currentPage = 0;
const cardsPerPage = 4;

function updateView() {
  const totalCards = produtosContainer.children.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  if (currentPage < 0) currentPage = 0;
  if (currentPage >= totalPages) currentPage = totalPages - 1;

  const card = produtosContainer.querySelector('.card');
  if (!card) return;

  const cardWidth = card.offsetWidth;
  const gap = 10;
  const offset = currentPage * (cardWidth + gap) * cardsPerPage;

  produtosContainer.style.transform = `translateX(-${offset}px)`;

  btnPrev.disabled = currentPage === 0;
  btnNext.disabled = currentPage === totalPages - 1;
}

btnPrev.addEventListener('click', () => {
  currentPage--;
  updateView();
});

btnNext.addEventListener('click', () => {
  currentPage++;
  updateView();
});

 const apiUrl = 'http://localhost:3000/produto'; // Substitua pela sua URL da API
  const productsPerPage = 4;
  let produtos = [];
  function fetchProdutos(categoria = 'todos') {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Armazenando os produtos
        produtos = categoria === 'todos' ? data : data.filter(produto => produto.categoria === categoria);
        renderProdutos();
      })
      .catch(error => {
        console.error('Erro ao carregar os produtos:', error);
      });
  }
  function renderProdutos() {
    const start = currentPage * productsPerPage;
    const end = start + productsPerPage;
    const produtosParaMostrar = produtos.slice(start, end);

    const container = document.getElementById("produtos-container");
    container.innerHTML = ''; // Limpa os produtos antigos

    produtosParaMostrar.forEach(produto => {
      const cardHTML = `
        <div class="produto-card">
          <img src="${produto.imagem}" alt="${produto.nome}">
          <h3>${produto.nome}</h3>
          <p>${produto.descricao}</p>
          <p class="preco">R$ ${produto.preco}</p>
        </div>
      `;
      container.innerHTML += cardHTML;
    });

    // Atualiza a navegação
    document.getElementById('btn-prev').disabled = currentPage === 0;
    document.getElementById('btn-next').disabled = (currentPage + 1) * productsPerPage >= produtos.length;
  }

  // Função para ir para a próxima página
  document.getElementById('btn-next').onclick = function() {
    if ((currentPage + 1) * productsPerPage < produtos.length) {
      currentPage++;
      renderProdutos();
    }
  };

  // Função para ir para a página anterior
  document.getElementById('btn-prev').onclick = function() {
    if (currentPage > 0) {
      currentPage--;
      renderProdutos();
    }
  };

  // Função para quando a categoria for alterada
  document.getElementById('categoriaFilter').onchange = function() {
    const categoriaSelecionada = this.value;
    currentPage = 0; // Reseta para a primeira página
    fetchProdutos(categoriaSelecionada);
  };

  // Exemplo de produtos (você pode gerar dinamicamente)
const produtos = [
  {
    id: 1,
    nome: "Ração Premium",
    preco: 45.90,
    imagem: "../web/images/racao.gif",
    categoria: "cachorro"
  },
  {
    id: 2,
    nome: "Petisco Natural",
    preco: 19.50,
    imagem: "../web/images/petisco.gif",
    categoria: "gato"
  }
];

// Renderiza os produtos na tela
function renderizarProdutos() {
  const container = document.getElementById("produtos-container");
  container.innerHTML = "";

  produtos.forEach((produto) => {
    const card = document.createElement("div");
    card.classList.add("produto-card");
    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao carrinho</button>
    `;
    container.appendChild(card);
  });
}

// Adiciona produto ao carrinho
function adicionarAoCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const existente = carrinho.find(item => item.id === produto.id);
  if (existente) {
    existente.quantidade += 1;
  } else {
    carrinho.push({ ...produto, quantidade: 1 });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert(`${produto.nome} foi adicionado ao carrinho!`);
}

document.addEventListener("DOMContentLoaded", renderizarProdutos);


  fetchProdutos();
buscarProdutos();
adicionarProduto();