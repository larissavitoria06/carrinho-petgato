const urlVercel = "https://backend-tcc-gamma.vercel.app/produto";

async function buscarProdutos() {
    try {
        const [ responseVercel] = await Promise.all([
            fetch(urlVercel)
        ]);
        
        if (!responseVercel.ok) {
            throw new Error('APIs falhou ao buscar os produtos');
        }

        const produtosVercel = responseVercel.ok ? await responseVercel.json() : [];

        const produtos = [...produtosVercel];
        
        mostrarProdutos(produtos);  
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}
async function adicionarProduto(nome, descricao, preco, imagem) {
    try {

        const promiseVercel = fetch(urlVercel, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, descricao, preco, imagem })
        });
        const [responseVercel] = await Promise.all([promiseVercel]);

        if (!responseVercel.ok) {
            throw new Error('Falha ao adicionar produto na API');
        }

        alert("Produto adicionado com sucesso na API!");
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
    }
}

// Banner texto com mudança de cor
const texts = document.querySelectorAll('.banner-text');
let currentIndex = 0;

function changeText() {
    // Remove a classe 'active' de todos os textos e reseta cor
    texts.forEach((text) => {
        text.classList.remove('active');
        text.style.color = '#f7f7f7ff';
    });
    // Ativa o texto atual e muda a cor para uma cor aleatória
    texts[currentIndex].classList.add('active');
    texts[currentIndex].style.color = getRandomColor();

    // Atualiza o índice para o próximo texto
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

// Inicia o carousel de textos
changeText();
setInterval(changeText, 3000);

// Banner background color change
const banner = document.querySelector(".banner");
const bannerTexts = document.querySelectorAll(".banner-text");
let bannerIndex = 0;

function showNextText() {
    bannerTexts.forEach(text => text.classList.remove("active"));
    bannerTexts[bannerIndex].classList.add("active");

    // Muda a cor do banner conforme o texto ativo
    if (bannerIndex === 0) banner.style.backgroundColor = "#00a6f3f6";
    else if (bannerIndex === 1) banner.style.backgroundColor = "#0303fffb";
    else if (bannerIndex === 2) banner.style.backgroundColor = "#eeff00ff";

    bannerIndex = (bannerIndex + 1) % bannerTexts.length;
}
