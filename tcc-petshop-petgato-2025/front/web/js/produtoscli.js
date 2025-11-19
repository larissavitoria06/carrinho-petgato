 async function buscarTodosProdutos() {
      try {
        const [resVercel] = await Promise.all([
          fetch(urlVercel)
        ]);
        const dadosVercel = resVercel.ok ? await resVercel.json() : [];

        const todos = [...dadosVercel];

        return todos;
      } catch (erro) {
        console.error('Erro ao buscar produtos das APIs:', erro);
        return [];  
      }
    }
    async function exibirProdutos(categoria = 'todos') {
      const todosProdutos = await buscarTodosProdutos();
      let produtosFiltrados = todosProdutos;
      if (categoria && categoria !== 'todos') {
        produtosFiltrados = todosProdutos.filter(p => {
          return p.categoria === categoria;
        });
      }

      const container = document.getElementById('produtosLista');
      container.innerHTML = '';

      if (produtosFiltrados.length === 0) {
        container.innerHTML = `<p>Nenhum produto encontrado para a categoria "${categoria}".</p>`;
        return;
      }

      produtosFiltrados.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('produto-card');

        card.innerHTML = `
          <img src="${produto.imagem}" alt="${produto.nome}">
          <div class="info">
            <h3>${produto.nome}</h3>
            <p>${produto.descricao || ''}</p>
            <p class="preco">R$ ${produto.preco}</p>
          </div>
        `;

        container.appendChild(card);
      });
    }
    document.getElementById('categoriaFilter').addEventListener('change', function() {
      const cat = this.value;
      exibirProdutos(cat);
    });
    window.addEventListener('DOMContentLoaded', (event) => {
      exibirProdutos('todos');
    });