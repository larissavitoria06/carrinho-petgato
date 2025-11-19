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
    console.log("Simulando envio ao servidor...");
    await new Promise(resolve => setTimeout(resolve, 1000)); // simula envio
    console.log("Pedido enviado!");


            // Limpa os dados do localStorage
            ['carrinho', 'carrinho_total', 'dadosCheckout'].forEach(key => localStorage.removeItem(key));

            alert("Pedido enviado com sucesso! ✔️");

            // Redireciona para a página de processando.html com o valor do pagamento
            window.location.href = `/front/web/procesando.html?valor=${total.toFixed(2)}`;

        } catch (erro) {
            console.error(erro);
            alert("Erro ao enviar o pedido. Tente novamente mais tarde.");
        }
    }