async function Cadastrar() {
    const emailProprietario = document.getElementById("emailProprietario").value;
    const nomePet = document.getElementById("nomePet").value;
    const especiePet = document.querySelector('input[name="especiePet"]:checked').value; 
    const racaPet = document.getElementById("racaPet").value;
    const nomeProprietario = document.getElementById("nomeProprietario").value;
    const nascpet = document.getElementById("nascpet").value;
    const dados = document.getElementById("dados").value;

    if (!nomePet || !especiePet || !racaPet || !nomeProprietario || !nascpet || !emailProprietario || !dados) {
        alert("Por favor, preencha os campos corretamente.");
        return;
    }

    try {
        const promiseVercel = fetch(apiVercel, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                emailProprietario, 
                nomePet, 
                especiePet, 
                racaPet, 
                nomeProprietario, 
                nascpet, 
                dados 
            })
        });

        // Espera as duas promessas serem resolvidas
        const [responseVercel] = await Promise.all([promiseVercel]);

        // Verifica se ambas as respostas foram bem-sucedidas
        if (responseVercel.ok) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "index.html";
        } else {
            const erroVercel = await responseVercel.text();
            alert(`Erro ao cadastrar na Vercel: ${erroVercel}`);
        }

    } catch (error) {
        console.error("Erro na solicitação:", error);
        alert("Erro ao processar o cadastro.");
    }
}


 const openButton = document.getElementById('open-button');
  const closeButton = document.getElementById('close-button');
  const popup = document.getElementById('popup');

  openButton.addEventListener('click', () => {
    popup.classList.add('show');
  });

  closeButton.addEventListener('click', () => {
    popup.classList.remove('show');
  });