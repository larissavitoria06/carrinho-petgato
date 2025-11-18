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
        const resposta = await fetch("http://localhost:3000/pedidos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pedido)
        });

        if (!resposta.ok) throw new Error("Erro ao enviar pedido!");

        await resposta.json();
        console.log("Pedido salvo no banco.");

        // Limpa os dados do localStorage
        ['carrinho', 'carrinho_total', 'dadosCheckout'].forEach(key => localStorage.removeItem(key));

        alert("Pedido enviado com sucesso! ✔️");
        window.location.href = "/front/web/entrega.html";

    } catch (erro) {
        console.error(erro);
        alert("Erro ao enviar o pedido. Tente novamente mais tarde.");
    }
}



function PedidoFeito(event) {
    event.preventDefault();

    // pegar valores da página
    let total = document.querySelector(".total span").innerText;

    // número da loja (SUBSTITUA PELO SEU)
    let numeroLoja = "5519988943311"; // 55 + DDD + numero

    // mensagem formatada
    let mensagem = 
`📦 *NOVO PEDIDO*

🧾 Total sem juros: ${total}
💳 Forma de pagamento: Cartão de Débito
📅 Data: ${new Date().toLocaleString()}

Por favor, preparar o pedido.`;

    // encode para URL
    let msg = encodeURIComponent(mensagem);

    // abrir WhatsApp
    let link = `https://wa.me/${numeroLoja}?text=${msg}`;
    window.location.href = link;
}
