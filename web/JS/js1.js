async function Cadastrar() {
    const email = document.getElementById("Email").value;
    const senha = document.getElementById("Senha").value;

    if (!email || !senha) {
        alert("Por favor, preencha os campos de email e senha.");
        return;
    }

    const urlLocal = 'http://localhost:3000/cadastro';
    const urlVercel = 'https://back-end-tcc-gamma.vercel.app/cadastro';
    
    try{
        const promiseLocal = fetch(urlLocal, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        const promiseVercel = fetch(urlVercel, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        const [responseLocal, responseVercel] = await Promise.all([promiseLocal, promiseVercel]);

        if (responseLocal.ok || responseVercel.ok) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "index.html";
        } else {
            const erroLocal = await responseLocal.text();
            const erroVercel = await responseVercel.text();
            alert(`Erro ao cadastrar na local: ${erroLocal}\nErro ao cadastrar na Vercel: ${erroVercel}`);
        }

    } catch (error) {
        console.error("Erro na solicitação:", error);
        alert("Erro ao processar o cadastro.");
    }
}








async function Voltar() {
    const email = document.getElementById("Email").value;
    const senha = document.getElementById("Senha").value;

    if (!email || !senha) {
        window.location.href = "index.html;"
    }
}
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