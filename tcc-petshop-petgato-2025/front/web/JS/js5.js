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

 const urlLocal = 'http://localhost:3000/consultas';
    const urlVercel = 'https://back-end-tcc-gamma.vercel.app/consultas';

    try {
        // Cria as promessas para as duas requisições
        const promiseLocal = fetch(urlLocal, {
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

        const promiseVercel = fetch(urlVercel, {
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
        const [responseLocal, responseVercel] = await Promise.all([promiseLocal, promiseVercel]);

        // Verifica se ambas as respostas foram bem-sucedidas
        if (responseLocal.ok || responseVercel.ok) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "index.html";
        } else {
            // Se ambas as requisições falharem
            const erroLocal = await responseLocal.text();
            const erroVercel = await responseVercel.text();
            alert(`Erro ao cadastrar na local: ${erroLocal}\nErro ao cadastrar na Vercel: ${erroVercel}`);
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

  // Fecha ao clicar fora
  window.addEventListener('click', function(event) {
    if (!popup.contains(event.target) && event.target !== openButton) {
      popup.classList.remove('show');
    }
  });

  const menuToggle = document.getElementById('menu-toggle');
const slideMenu = document.getElementById('slide-menu');

menuToggle.addEventListener('click',() => {
   slideMenu.classList.toggle('active');
   menuToggle.classList.toggle('active');
});