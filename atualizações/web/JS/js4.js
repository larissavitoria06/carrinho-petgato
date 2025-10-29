// ======== Renderiza produtos do carrinho ======== //
function renderizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [
        { id: 1, nome: "brinquedo ", imagem: "https://via.placeholder.com/100", preco: 25.00, quantidade: 1 },
        { id: 2, nome: "roupinha ", imagem: "https://via.placeholder.com/100", preco: 40.00, quantidade: 1 },
        { id: 3, nome: "cama", imagem: "https://via.placeholder.com/100", preco: 205.73, quantidade: 1 },
        { id: 4, nome: "ração", imagem: "https://via.placeholder.com/100", preco: 50.31, quantidade: 1 }
    ];

    const cardContainer = document.getElementById('card-container');
    if (!cardContainer) return; // Garante que o container existe
    
    cardContainer.innerHTML = '';
    let subtotal = 0;

    carrinho.forEach((item, index) => {
        subtotal += item.preco * item.quantidade;

        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <div class="card-info">
                <h3>${item.nome}</h3>
                <p>R$ ${item.preco.toFixed(2)}</p>
                <div class="quantity-container">
                    <button class="quantity-btn" onclick="alterarQuantidade(${index}, -1)">-</button>
                    <p>${item.quantidade}</p>
                    <button class="quantity-btn" onclick="alterarQuantidade(${index}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removerProduto(${index})">×</button>
            </div>
        `;
        cardContainer.appendChild(card);
    });

    atualizarTotal(subtotal);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// ======== Atualiza subtotal, taxa e total ======== //
function atualizarTotal(subtotal) {
    const taxaElement = document.querySelector('.Valor-taxa');
    const subtotalElement = document.querySelector('.Subtotal-compra');
    const totalElement = document.getElementById('totalValor');
    const totalFinalElement = document.getElementById('totalValorFinal');

    if (!totalElement || !subtotalElement) return;

    let taxa = subtotal >= 150 ? 0 : 25.10;
    let total = subtotal + taxa;

    subtotalElement.innerHTML = `R$ ${subtotal.toFixed(2)}<p>SubTotal</p>`;
    
    if (taxaElement) {
        if (taxa > 0) {
            taxaElement.style.display = 'block';
            taxaElement.innerHTML = `R$ ${taxa.toFixed(2)}<p>Taxa</p>`;
        } else {
            taxaElement.style.display = 'none';
        }
    }
    
    totalElement.innerText = `${total.toFixed(2)}`;
    if (totalFinalElement) {
        totalFinalElement.innerText = `${total.toFixed(2)}`;
    }
}

// ======== Alterar quantidade ======== //
function alterarQuantidade(index, delta) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho[index].quantidade += delta;
    if (carrinho[index].quantidade < 1) carrinho[index].quantidade = 1;
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    renderizarCarrinho();
}

// ======== Remover produto ======== //
function removerProduto(index) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    renderizarCarrinho();
}

// ======== Enviar pedido ======== //
function enviarPedido() {
    localStorage.removeItem('carrinho');
    renderizarCarrinho();
}

function copiarCupom(id) {
    const texto = document.getElementById(id).innerText;
    navigator.clipboard.writeText(texto).then(() => {
        alert("Cupom copiado: " + texto);
    });
}

function finalizarCompra() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const endereco = document.getElementById('endereco').value;
    const cep = document.getElementById('cep').value;
    const pagamento = document.getElementById('pagamento').value;

    if (!nome || !email || !telefone || !endereco || !cep || !pagamento) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    alert(`Compra finalizada com sucesso!\n\nNome: ${nome}\nEmail: ${email}\nPagamento: ${pagamento}`);
    document.getElementById('checkoutForm').reset();
    
    document.querySelector('.checkout-card').classList.remove('visible');
    document.getElementById('enviarPedido').textContent = 'Fazer pedido';
}

// ======== Abrir/Fechar formulário ======== //
document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrinho(); 

    const openFormButton = document.getElementById('enviarPedido');
    const checkoutForm = document.querySelector('.checkout-card');
    const closeFormButton = document.getElementById('closeCheckoutBtn');

    if (openFormButton && checkoutForm) {
        const closeCheckout = () => {
            checkoutForm.classList.remove('visible');
            openFormButton.textContent = 'Fazer pedido';
        };

        openFormButton.addEventListener('click', (event) => {
            event.preventDefault();
            checkoutForm.classList.toggle('visible'); 
            openFormButton.textContent = checkoutForm.classList.contains('visible')
                ? 'Fechar Pagamento'
                : 'Fazer pedido';
        });

        if (closeFormButton) closeFormButton.addEventListener('click', closeCheckout);
    }
    
    // ======== Lógica do pagamento (modificada para redirecionar) ======== //
    const paymentItems = document.querySelectorAll('.metodo-item');
    paymentItems.forEach(item => {
        item.addEventListener('click', function() {
            paymentItems.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                console.log('Método de pagamento selecionado:', radio.value);
            }
        });
    });
    
    const continueButton = document.querySelector('.btn-continue');
    if (continueButton) {
        continueButton.addEventListener('click', () => {
            const selectedMethod = document.querySelector('.metodo-item.selected input[type="radio"]');
            if (selectedMethod) {
                // Redireciona para outra página
                window.location.href = "pix.html";
            } else {
                alert("Por favor, selecione um método de pagamento antes de continuar.");
            }
        });
    }
});
