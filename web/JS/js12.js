
document.addEventListener('DOMContentLoaded', () => {
    const dados = JSON.parse(localStorage.getItem('dadosCheckout'));

    if (!dados) {
        console.warn('Nenhum dado encontrado no localStorage.');
        return;
    }

    // --------- Preenche campos pessoais ---------
    if (document.getElementById('nome')) {
        document.getElementById('nome').value = dados.nome || '';
    }

    if (document.getElementById('email')) {
        document.getElementById('email').value = dados.email || '';
    }

    if (document.getElementById('telefone')) {
        document.getElementById('telefone').value = dados.telefone || '';
    }

    if (document.getElementById('endereco')) {
        document.getElementById('endereco').value = dados.endereco || '';
    }

    if (document.getElementById('cep')) {
        document.getElementById('cep').value = dados.cep || '';
    }

    // --------- Mostra o total da compra ---------
    const totalSpan = document.querySelector('.total span');
    if (totalSpan && dados.total) {
        totalSpan.textContent = dados.total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    // --------- Mostra método de pagamento (opcional) ---------
    if (dados.pagamento) {
        console.log("Método selecionado:", dados.pagamento);
    }
});

// ---------- Finalizar Compra ----------
function finalizarPagamento() {
    alert("Pagamento realizado com sucesso! 🛒");
    localStorage.removeItem('carrinho');
    localStorage.removeItem('dadosCheckout');
    window.location.href = "index.html";
}

// ---------- Pedido feito ----------
function PedidoFEito() {
    localStorage.removeItem('carrinho');
    renderizarCarrinho();
    alert("Pedido enviado com sucesso!");
}

const totalStr = localStorage.getItem('carrinho_total');
const total = totalStr ? parseFloat(totalStr) : 0.00;
document.getElementById('valor-total').textContent = `R$ ${total.toFixed(2)}`;
