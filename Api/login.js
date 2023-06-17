// Função para realizar o login
function fazerLogin() {
  var cpf = document.getElementById("cpf").value;
  var senha = document.getElementById("senha").value;

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
      }
    })
    .catch((error) => {
      // Tratar erros
      console.error(error);
    });
}

// ...

// Evento de clique no botão de login
document.getElementById("login-btn").addEventListener("click", fazerLogin);