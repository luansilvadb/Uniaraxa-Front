document.addEventListener("DOMContentLoaded", function () {
  const cadastrarBtn = document.getElementById("cadastrarBtn");

  cadastrarBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;
    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;

    // Verificar se todos os campos foram preenchidos
    if (!login || !senha || !nome || !cpf) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const data = {
      login: login,
      senha: senha,
      nome: nome,
      cpf: cpf,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("http://softwarehouse.ddns.net:62617/api/Funcionario", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          document.getElementById("login").value = ""; // Limpar campo de login
          document.getElementById("senha").value = ""; // Limpar campo de senha
          document.getElementById("nome").value = ""; // Limpar campo de nome
          document.getElementById("cpf").value = ""; // Limpar campo de CPF

          // Redirecionar para a página "login.html"
          window.location.href = "login.html";
        } else {
          alert("Ocorreu um erro durante o cadastro."); // Exibir alerta de erro
        }
      })
      .catch((error) => {
        console.log("error", error);
        alert("Ocorreu um erro durante o cadastro."); // Exibir alerta de erro
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const entrarBtn = document.getElementById("entrarBtn");

  entrarBtn.addEventListener("click", (event) => {
    event.preventDefault();

    const cpf = document.getElementById("cpf").value;
    const senha = document.getElementById("senha").value;

    const data = {
      cpf: cpf,
      senha: senha,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch("http://softwarehouse.ddns.net:62617/api/Login", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          document.getElementById("cpf").value = ""; // Limpar campo de CPF
          document.getElementById("senha").value = ""; // Limpar campo de senha

          // Redirecionar para a página "login.html"
          window.location.href = "campanhas.html";
        } else {
          alert("Ocorreu um erro durante o cadastro."); // Exibir alerta de erro
        }
      })
      .catch((error) => {
        console.log("error", error);
        alert("Ocorreu um erro durante o cadastro."); // Exibir alerta de erro
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cadastrarAvaliador = document.getElementById("cadastrarAvaliador");

  cadastrarAvaliador.addEventListener("click", (event) => {
    event.preventDefault();

    const nome = document.getElementById("nomeAvaliador").value;
    const cpf = document.getElementById("cpfAvaliador").value;

    const data = {
      id: 0,
      nome: nome,
      cpf: cpf,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      redirect: "follow",
    };

    fetch("http://softwarehouse.ddns.net:62617/api/Avaliador", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          document.getElementById("nomeAvaliador").value = ""; // Limpar campo de nome
          document.getElementById("cpfAvaliador").value = ""; // Limpar campo de CPF

          alert("Cadastro realizado com sucesso!"); // Exibir alerta de sucesso
        } else {
          alert("Ocorreu um erro durante o cadastro."); // Exibir alerta de erro
        }
      })
      .catch((error) => {
        console.log("error", error);
        alert("Ocorreu um erro durante o cadastro."); // Exibir alerta de erro
      });
  });
});
var newUrl =
  window.location.protocol +
  "//" +
  window.location.host +
  window.location.pathname;
history.replaceState({}, document.title, newUrl);
