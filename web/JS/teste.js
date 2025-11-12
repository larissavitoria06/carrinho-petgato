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
                window.location.href = "finalizacao.html";
            } else {
                alert("Por favor, selecione um método de pagamento antes de continuar.");
            }
        });
    }
});























//*teste parapassar o valor do pagamento*//


// calcula total do carrinho (exemplo)
const total = carrinho.reduce((s, p) => s + p.preco * p.quantidade, 0);

// salvar
localStorage.setItem('carrinho_total', total.toFixed(2)); // string
// redireciona para a página de pagamento
window.location.href = '/checkout.html';

// redireciona para /pagamento.html?total=125.50
window.location.href = `/pagamento.html?total=${encodeURIComponent(total.toFixed(2))}`;

const params = new URLSearchParams(window.location.search);
const total = parseFloat(params.get('total') || '0');



































/*CARRINHO COPLETO */

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

function atualizarTotal(subtotal) {
    const taxaElement = document.querySelector('.Valor-taxa');
    const subtotalElement = document.querySelector('.Subtotal-compra');
    const totalElement = document.getElementById('totalValor');
    const totalFinalElement = document.getElementById('totalValorFinal');

    if (!subtotalElement || !totalElement) return;

    const taxa = subtotal >= 150 ? 0 : 25.10;
    const total = subtotal + taxa;

    subtotalElement.innerHTML = `R$ ${subtotal.toFixed(2)}<p>SubTotal</p>`;
    if (taxaElement) {
        if (taxa > 0) {
            taxaElement.style.display = 'block';
            taxaElement.innerHTML = `R$ ${taxa.toFixed(2)}<p>Taxa</p>`;
        } else {
            taxaElement.style.display = 'none';
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
    atualizarTotal(subtotal, desconto, totalComDesconto); // Passa todos os valores para a função de atualização
}

function atualizarTotal(subtotal, desconto, totalComDesconto) {
    // Atualiza os elementos do HTML
    const taxaElement = document.querySelector('.Valor-taxa');
    const subtotalElement = document.querySelector('.Subtotal-compra');
    const descontoElement = document.querySelector('.Subtotal-compra:last-child'); // O último elemento de Subtotal-compra
    const totalElement = document.getElementById('totalValor');
    
    // Taxa (apenas se o subtotal for menor que R$150)
    const taxa = subtotal >= 150 ? 0 : 25.10;
    const total = totalComDesconto + taxa;

    // Atualiza os valores no HTML
    if (subtotalElement) {
        subtotalElement.innerHTML = `R$ ${subtotal.toFixed(2)}<p>SubTotal</p>`;
    }

    if (taxaElement) {
        if (taxa > 0) {
            taxaElement.style.display = 'block';
            taxaElement.innerHTML = `R$ ${taxa.toFixed(2)}<p>Taxa</p>`;
        } else {
            taxaElement.style.display = 'none';
        }
    }

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
    renderizarCarrinho();
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
        });
    }
});
