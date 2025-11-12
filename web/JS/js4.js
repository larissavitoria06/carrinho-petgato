function renderizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [
        { id: 1, nome: "Brinquedo", imagem: "https://dcdn-us.mitiendanube.com/stores/002/456/384/products/faa41714c52ecbd254419c6f6e3c4e08-5f1ec1a5b10b9f187c16868545821376-1024-1024.jpg", preco: 25.00, quantidade: 1 },
        { id: 2, nome: "Roupinha", imagem: "https://cdn.awsli.com.br/2500x2500/1012/1012421/produto/267511746/moletom-vaca-para-cachorros-6vlpki2lvv.jpg", preco: 40.00, quantidade: 1 },
        { id: 3, nome: "Cama", imagem: "https://images.tcdn.com.br/img/img_prod/748584/cama_pet_para_cachorro_tamanho_gg_80x80_31_4_687f2bfd6cc2dec5fa7a566de7a1e678.jpg", preco: 205.73, quantidade: 1 },
        { id: 4, nome: "Ração", imagem: "https://images.tcdn.com.br/img/img_prod/1118151/racao_pet_life_para_caes_adultos_racas_medias_e_grandes_sabor_frango_eamp_arroz_2621_1_b09f08328e6e2b23300e01af36e849f7.png", preco: 20.31, quantidade: 2 },
        { id: 5, nome: "Requisão", imagem: "https://www.cecpet.com.br/imagens/informacoes/fabrica-produtos-pet-sao-paulo-01.jpg", preco: 10.15, quantidade: 1 }
    ];

    const cardContainer = document.getElementById('card-container');
    if (!cardContainer) return;

    cardContainer.innerHTML = ''; // Limpar o container para evitar duplicação de itens.
    let subtotal = 0;

    // Renderizar todos os itens do carrinho
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
}

function atualizarTotal(subtotal) {
    const taxaElement = document.querySelector('.Valor-taxa');
    const subtotalElement = document.querySelector('.Subtotal-compra');
    const totalElement = document.getElementById('totalValor');
    const totalFinalElement = document.getElementById('totalValorFinal');

    if (!subtotalElement || !totalElement) return;

    const taxa = subtotal >= 150 ? 0 : 25.10;
    const total = subtotal + taxa;

    // Atualizar a interface com o subtotal
    subtotalElement.innerHTML = `R$ ${subtotal.toFixed(2)}<p>SubTotal</p>`;
    if (taxaElement) {
        taxaElement.style.display = taxa > 0 ? 'block' : 'none';
        if (taxa > 0) {
            taxaElement.innerHTML = `R$ ${taxa.toFixed(2)}<p>Taxa</p>`;
        }
    }

    totalElement.textContent = `R$ ${total.toFixed(2)}`;
    if (totalFinalElement) totalFinalElement.textContent = `R$ ${total.toFixed(2)}`;
}

function aplicarCupom() {
    const cupom = document.getElementById('text').value.toUpperCase();
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let subtotal = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    let desconto = 0;

    // Lógica de aplicação dos cupons
    if (cupom === "CUPOM10") {
        desconto = 0.10 * subtotal;
    } else if (cupom === "FRETEGRATIS" && subtotal >= 100) {
        desconto = 25.10; // Frete grátis
    } else if (cupom === "DESCONTO15" && subtotal >= 170) {
        desconto = 15; // Desconto fixo de R$ 15
    } else if (cupom === "DESCONTO25" && subtotal >= 200) {
        desconto = 25; // Desconto fixo de R$ 25
    } else if (cupom === "GEIOB940Z6") {
        desconto = 0.05 * subtotal; // 5% de desconto
    } else if (cupom === "SUPER50" && subtotal >= 310) {
        desconto = 0.50 * subtotal; // 50% de desconto
    } else {
        alert("Cupom inválido ou não aplicável");
        return;
    }

    // Atualiza o valor do desconto e total final
    const totalComDesconto = subtotal - desconto;
    atualizarTotalComDesconto(subtotal, desconto, totalComDesconto); // Passa todos os valores para a função de atualização
}

function atualizarTotalComDesconto(subtotal, desconto, totalComDesconto) {
    const taxaElement = document.querySelector('.Valor-taxa');
    const subtotalElement = document.querySelector('.Subtotal-compra');
    const descontoElement = document.querySelector('.Subtotal-compra:last-child');
    const totalElement = document.getElementById('totalValor');

    const taxa = subtotal >= 150 ? 0 : 25.10;
    const total = totalComDesconto - taxa;

    if (subtotalElement) {
        subtotalElement.innerHTML = `R$ ${subtotal.toFixed(2)}<p>SubTotal</p>`;
    }

    if (taxaElement) {
        taxaElement.style.display = taxa > 0 ? 'block' : 'none';
        if (taxa > 0) {
            taxaElement.innerHTML = `R$ ${taxa.toFixed(2)}<p>Taxa</p>`;
        }
    }

    if (descontoElement) {
        descontoElement.innerHTML = `R$ ${desconto.toFixed(2)}<p>Desconto</p>`;
    }

    if (totalElement) {
        totalElement.textContent = `R$ ${total.toFixed(2)}`;
    }
}

 function aplicarCupom() {
    const cupom = document.getElementById('text').value.toUpperCase();
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let subtotal = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    let desconto = 0;

    // Lógica de aplicação dos cupons
    if (cupom === "CUPOM10") {
        desconto = 0.10 * subtotal;
    } else if (cupom === "FRETEGRATIS" && subtotal >= 100) {
        desconto = 25.10; // Frete grátis
    } else if (cupom === "DESCONTO15" && subtotal >= 170) {
        desconto = 15; // Desconto fixo de R$ 15
    } else if (cupom === "DESCONTO25" && subtotal >= 200) {
        desconto = 25; // Desconto fixo de R$ 25
    } else if (cupom === "GEIOB940Z6") {
        desconto = 0.05 * subtotal; // 5% de desconto
    } else if (cupom === "SUPER50" && subtotal >= 310) {
        desconto = 0.50 * subtotal; // 50% de desconto
    } else {
        alert("Cupom inválido ou não aplicável");
        return;
    }

    // Atualiza o valor do desconto e total final
    const totalComDesconto = subtotal - desconto;
    atualizarTotal(subtotal, desconto, totalComDesconto); // Passa todos os valores para a função de atualização

    if (descontoElement) {
        descontoElement.innerHTML = `R$ ${desconto.toFixed(2)}<p>Desconto</p>`;
    }

    if (totalElement) {
        totalElement.textContent = `R$ ${total.toFixed(2)}`;
    }
}

// Função para ativar o evento de aplicar o cupom
document.getElementById('atualizarTotal').addEventListener('click', (event) => {
    event.preventDefault(); // Previne o envio do formulário
    aplicarCupom(); // Chama a função para aplicar o cupom
});



function alterarQuantidade(index, delta) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (!carrinho[index]) return;

    carrinho[index].quantidade += delta;
    if (carrinho[index].quantidade < 1) carrinho[index].quantidade = 1;

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    renderizarCarrinho();
}

function removerProduto(index) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    renderizarCarrinho(); // Re-renderizar o carrinho sem o produto removido
}

function copiarCupom(id) {
    const texto = document.getElementById(id)?.innerText;
    if (!texto) return;

    navigator.clipboard.writeText(texto)
        .then(() => alert("Cupom copiado: " + texto))
        .catch(() => alert("Erro ao copiar o cupom."));
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrinho();

    // Formulário de checkout
    const openFormButton = document.getElementById('enviarPedido');
    const checkoutForm = document.querySelector('.checkout-card');
    const closeFormButton = document.getElementById('closeCheckoutBtn');
    const continueButton = document.querySelector('.btn-continue');
    const paymentItems = document.querySelectorAll('.metodo-item');
    let metodoSelecionado = null;

    if (openFormButton && checkoutForm) {
        openFormButton.addEventListener('click', (event) => {
            event.preventDefault();
            checkoutForm.classList.toggle('visible');
            openFormButton.textContent = checkoutForm.classList.contains('visible')
                ? 'Fechar Pagamento'
                : 'Fazer Pedido';
        });

        if (closeFormButton) {
            closeFormButton.addEventListener('click', () => {
                checkoutForm.classList.remove('visible');
                openFormButton.textContent = 'Fazer Pedido';
            });
        }
    }

    paymentItems.forEach(item => {
        item.addEventListener('click', () => {
            paymentItems.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            const radio = item.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                metodoSelecionado = radio.value;
            }
        });
    });

    if (continueButton) {
        continueButton.addEventListener('click', (e) => {
            e.preventDefault();

            if (!metodoSelecionado) {
                alert("Selecione um método de pagamento!");
                return;
            }

            const dados = {
                nome: document.getElementById('nome')?.value || '',
                email: document.getElementById('email')?.value || '',
                telefone: document.getElementById('telefone')?.value || '',
                endereco: document.getElementById('endereco')?.value || '',
                cep: document.getElementById('cep')?.value || '',
                pagamento: metodoSelecionado
            };

            const totalElement = document.getElementById('totalValor');
            if (totalElement) {
                const totalTexto = totalElement.textContent.replace('R$', '').trim();
                dados.total = parseFloat(totalTexto.replace(',', '.')) || 0;
            } else {
                dados.total = 0;
            }

            localStorage.setItem('dadosCheckout', JSON.stringify(dados));

            const paginasPagamento = {
                pix: "pix.html",
                credito: "credito.html",
                debito: "debito.html",
            };

            const destino = paginasPagamento[metodoSelecionado];
            if (destino) {
                window.location.href = destino;
            } else {
                alert("Método de pagamento inválido!");
            }

            function aplicarCupom() {
    const cupom = document.getElementById('text').value.toUpperCase();
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let subtotal = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    let desconto = 0;

    // Lógica de aplicação dos cupons
    if (cupom === "CUPOM10") {
        desconto = 0.10 * subtotal;
    } else if (cupom === "FRETEGRATIS" && subtotal >= 100) {
        desconto = 25.10; // Frete grátis
    } else if (cupom === "DESCONTO15" && subtotal >= 170) {
        desconto = 15; // Desconto fixo de R$ 15
    } else if (cupom === "DESCONTO25" && subtotal >= 200) {
        desconto = 25; // Desconto fixo de R$ 25
    } else if (cupom === "GEIOB940Z6") {
        desconto = 0.05 * subtotal; // 5% de desconto
    } else if (cupom === "SUPER50" && subtotal >= 310) {
        desconto = 0.50 * subtotal; // 50% de desconto
    } else {
        alert("Cupom inválido ou não aplicável");
        return;
    }

    // Aplicar o desconto no subtotal e na taxa (se houver)
    const taxa = subtotal >= 150 ? 0 : 25.10;
    const totalComDesconto = (subtotal + taxa) - desconto; // Aplicando o desconto no total (que inclui a taxa)

    // Atualiza o valor do desconto e total final
    atualizarTotalComDesconto(subtotal, taxa, desconto, totalComDesconto);
}

function atualizarTotalComDesconto(subtotal, taxa, desconto, totalComDesconto) {
    const taxaElement = document.querySelector('.Valor-taxa');
    const subtotalElement = document.querySelector('.Subtotal-compra');
    const descontoElement = document.querySelector('.Subtotal-compra:last-child');
    const totalElement = document.getElementById('totalValor');

    // Exibir o subtotal e a taxa
    if (subtotalElement) {
        subtotalElement.innerHTML = `R$ ${subtotal.toFixed(2)}<p>SubTotal</p>`;
    }

    if (taxaElement) {
        taxaElement.style.display = taxa > 0 ? 'block' : 'none';
        if (taxa > 0) {
            taxaElement.innerHTML = `R$ ${taxa.toFixed(2)}<p>Taxa</p>`;
        }
    }

    // Mostrar o desconto aplicado
    if (descontoElement) {
        descontoElement.innerHTML = `R$ ${desconto.toFixed(2)}<p>Desconto</p>`;
    }

    // Exibir o total final
    if (totalElement) {
        totalElement.textContent = `R$ ${totalComDesconto.toFixed(2)}`;
    }
}


        });
    }
});


