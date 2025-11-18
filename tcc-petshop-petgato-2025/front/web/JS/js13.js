    function confirmarEntrega() {
      const opcaoSelecionada = document.querySelector('input[name="entrega"]:checked').value;
      localStorage.setItem('tipo_entrega', opcaoSelecionada);
      alert(`✅ ${opcaoSelecionada}\n\nEntrega selecionada com sucesso!`);
      // Redireciona para a página de pagamento
      window.location.href = '/front/web/index.html';
    }
    localStorage.setItem('tipo_entrega', "Entrega Expressa - 2 dias úteis - R$ 25,00");
    const entrega = localStorage.getItem('tipo_entrega');
    document.getElementById('info-entrega').textContent = entrega;

    // Função para simular o avanço de status
    function avancarEtapa() {
      const etapas = document.querySelectorAll('.etapa');
      for (let i = 0; i < etapas.length; i++) {
        if (!etapas[i].classList.contains('ativa')) {
          etapas[i].classList.add('ativa');
          break;
        }
      }

      // Se chegou no final
      if ([...etapas].every(e => e.classList.contains('ativa'))) {
        alert("🐾 Pedido entregue com sucesso! Obrigado por comprar na Pet Gato!");
      }

localStorage.setItem('status_pedido', 3); 
    }
