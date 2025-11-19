 let produtos = [];

  function buscarProdutos() {
    fetch(urlVercel)
      .then(response => response.json())
      .then(data => {
        produtos = data;
        exibirProdutos();
      })
      .catch(error => {
        console.error('Erro ao carregar os produtos:', error);
        document.getElementById('produtosLista').innerHTML = '<p>Erro ao carregar produtos.</p>';
      });
  }

  function exibirProdutos() {
    const container = document.getElementById('produtosLista');
    container.innerHTML = '';

    produtos.forEach(produto => {
      const card = document.createElement('div');
      card.className = 'produto-card';

      card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <div class="info">
          <h3>${produto.nome}</h3>
          <p>${produto.descricao}</p>
          <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
          <div class="acoes">
            <button onclick="excluirProduto(${produto.id})">Excluir</button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  }

  function excluirProduto(id) {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;

    Promise.all([
      fetch(`${urlVercel}/${id}`, { method: "DELETE" })
    ])
      .then(([res1]) => {
        if (!res1.ok) throw new Error("Erro ao excluir");
        alert("Produto excluído com sucesso!");
        buscarProdutos();
      })
      .catch(error => {
        console.error(error);
        alert("Erro ao excluir produto.");
      });
  }

  document.getElementById("novoProdutoBtn").onclick = function () {
    document.getElementById("novoProdutoModal").style.display = "block";
  };

  function closeModal() {
    document.getElementById("novoProdutoModal").style.display = "none";
  }

  document.getElementById("produtoForm").onsubmit = function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const preco = parseFloat(document.getElementById("preco").value);
    const imagem = document.getElementById("imagem").value;
    const categoria = document.getElementById("categoria").value;

    const produtoData = {
      nome,
      descricao,
      preco,
      imagem,
      categoria
    };

    Promise.all([
      fetch(urlVercel, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produtoData),
      })
    ])
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(() => {
        alert("Produto cadastrado com sucesso!");
        closeModal();
        buscarProdutos();
      })
      .catch(error => {
        console.error("Erro ao cadastrar:", error);
        alert("Erro ao cadastrar produto.");
      });
  };
  window.onload = buscarProdutos;