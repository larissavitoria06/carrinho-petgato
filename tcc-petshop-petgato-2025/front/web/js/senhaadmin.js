 let password = "";

    function addDigit(num) {
      if (password.length < 6) {
        password += num;
        updateDisplay();
      }
    }

    function clearPassword() {
      password = "";
      updateDisplay();
      document.getElementById("error").innerText = "";
    }

    function updateDisplay() {
      const masked = "*".repeat(password.length).padEnd(6, "-");
      document.getElementById("password").innerText = masked;
      document.getElementById("login").disabled = (password.length !== 6);
    }

    function login() {
      if (password === "101010") {
        alert("Bem Vindo Admin!");
        window.location.href = "admin.html";
      } else {
        document.getElementById("error").innerText = "Senha incorreta!";
        clearPassword();
      }
    }

    updateDisplay();