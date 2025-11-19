
async function buscarConsultas() {
    try{
        const [resVercel] = await Promise.all([
            fetch(apiVercel)
        ]);
        const dadosVercel = resVercel.ok ? await resVercel.json() : [];
        const todasConsultas = [...dadosVercel];
        return todasConsultas;
    }catch(erro){
        console.error('Erro ao buscar consultas', erro);
        return [];
    }
}

async function exibirConsultas() {
    const todasConsultas = await buscarConsultas();
    const container = document.getElementById('consultasLista');
    container.innerHTML = '';

    if(todasConsultas.length === 0){
        container.innerHTML = `<p>Nenhuma consulta encontrada.</p>`;
        return;
    } else {
        todasConsultas.forEach(consulta => {
            const card = document.createElement('div');
            card.classList.add('consulta-card');

            card.innerHTML = `
                <div class="info">
                    <h3>Nome do pet: ${consulta.nomePet}</h3>
                    <p>Especie: ${consulta.especiePet}</p>
                    <p>Raça: ${consulta.racaPet}</p>
                    <p>Nome do Proprietário: ${consulta.nomeProprietario}</p>
                    <p>Nascimento do Pet: ${consulta.nascpet}</p>
                    <p>Email do Proprietário: ${consulta.emailProprietario}</p>
                    <p>Problemas de saúde: ${consulta.dados}</p>
                </div>
            `;
            container.appendChild(card);
        })
    }
}
document.addEventListener('DOMContentLoaded', exibirConsultas);