document.addEventListener('DOMContentLoaded', () => {
    const dados = JSON.parse(localStorage.getItem('dadosCheckout')) || {};

    // Preenche os campos com os dados do localStorage, caso existam
    ['nome', 'email', 'telefone', 'endereco', 'cep'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = dados[id] || '';
        }
    });

    // Exibe o total da compra
    const totalSpan = document.querySelector('.total span');
    if (totalSpan && dados.total) {
        totalSpan.textContent = dados.total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    // Mostra o método de pagamento
    if (dados.pagamento) {
        console.log("Método selecionado:", dados.pagamento);
    }
});

// Exibe o total no checkout
const total = parseFloat(localStorage.getItem('carrinho_total') || "0.00");
document.getElementById('valor-total').textContent = `R$ ${total.toFixed(2)}`;

// Função chamada ao concluir o pagamento
async function PedidoFeito(event) {
    event.preventDefault(); // Impede o reload do form

    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const dadosCheckout = JSON.parse(localStorage.getItem('dadosCheckout')) || {};
    const total = parseFloat(localStorage.getItem('carrinho_total') || "0.00");

    const pedido = {
        ...dadosCheckout,
        total,
        produtos: carrinho,
        pagamento: dadosCheckout.pagamento || "não informado"
    };

    try {
        
        if (!resposta.ok) throw new Error("Erro ao enviar pedido!");

        alert("Pedido enviado com sucesso! ✔️");
        window.location.href = "/front/web/entrega.html";

    } catch (erro) {
        console.error(erro);
        alert("Erro ao enviar o pedido. Tente novamente mais tarde.");
    }
}

document.getElementById("parcelas").addEventListener("change", function () {
    const parcelas = Number(this.value);
    const totalOriginal = parseFloat(localStorage.getItem("carrinho_total") || "0");
    let totalComJuros = totalOriginal;

    // Tabela de juros
    const jurosTabela = {
        7: 1.05,
        8: 1.07,
        9: 1.10,
        10: 1.12,
        12: 1.15
    };

    // Aplica juros se existir
    if (jurosTabela[parcelas]) {
        totalComJuros = totalOriginal * jurosTabela[parcelas];
    }

    // Atualiza o valor no HTML
    atualizarTotal(totalComJuros);

    // Salva o total final (com ou sem juros)
    localStorage.setItem("totalFinal", totalComJuros);

    // Mostra o valor da parcela
    if (parcelas > 0) {
        const valorParcela = totalComJuros / parcelas;
        alert(`${parcelas}x de ${valorParcela.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })}`);
    }
});
