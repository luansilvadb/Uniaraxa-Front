// Aguarda o carregamento completo da página antes de adicionar o evento de clique
document.addEventListener("DOMContentLoaded", function() {
  function fazerLogin(event) {
    event.preventDefault(); // Impede o envio do formulário e o recarregamento da página

    var cpf = document.getElementById("cpf").value;
    var senha = document.getElementById("senha").value;
    var gdprCheckbox = document.getElementById("gdpr-form4-3");

    // Verifica se algum campo está em branco
    if (cpf === "" || senha === "") {
      alert("Por favor, preencha todos os campos.");
      return; // Interrompe o login se houver campos em branco
    }

    // Verifica se a checkbox de consentimento foi marcada
    if (!gdprCheckbox.checked) {
      alert("Por favor, aceite os termos de serviço e a política de privacidade.");
      return; // Interrompe o login se a checkbox não estiver marcada
    }

    // Fazer uma requisição para a API para realizar o login
    fetch("https://faculdadedb-faculdadeapi.yykemf.easypanel.host/api/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cpf, senha }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Lógica após a resposta da API
        console.log(data);
        if (data.success) {
          // Login bem-sucedido
          window.location.replace("campanhas.html");
        } else {
          // Login falhou
          alert("CPF ou senha inválidos. Tente novamente.");
        }
      })
      .catch((error) => {
        // Tratar erros
        console.error(error);
        alert("Ocorreu um erro durante o login. Por favor, tente novamente mais tarde.");
      });
  }

  // Evento de clique no botão de login
  document.getElementById("login-btn").addEventListener("click", fazerLogin);
});
