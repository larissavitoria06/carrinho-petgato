async function Cadastrar() {
    const email = document.getElementById("Email").value;
    const senha = document.getElementById("Senha").value;

    if (!email || !senha) {
        alert("Por favor, preencha os campos de email e senha.");
        return;
    }

    try {
        const response = await fetch("https://backend-tcc-petshop-petgato-2025.vercel.app/cadastro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        if (response.ok) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "index.html";
        } else {
            const erro = await response.text();
            alert(`Erro ao cadastrar: ${erro}`);
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