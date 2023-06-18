document.addEventListener("DOMContentLoaded", function() {
  function cadastrarFuncionario(event) {
    event.preventDefault(); // Impede o envio do formulário e o recarregamento da página

    var login = document.getElementById("login").value;
    var senha = document.getElementById("senha").value;
    var nome = document.getElementById("nome-funcionario").value;
    var cpf = document.getElementById("cpf-funcionario").value;
    var gdprCheckbox = document.getElementById("gdpr-form4-3");

    // Verifica se algum campo está em branco
    if (login === "" || senha === "" || nome === "" || cpf === "") {
      alert("Por favor, preencha todos os campos.");
      return; // Interrompe o cadastro se houver campos em branco
    }

    // Verifica se a checkbox de consentimento foi marcada
    if (!gdprCheckbox.checked) {
      alert("Por favor, aceite os termos de serviço e a política de privacidade.");
      return; // Interrompe o cadastro se a checkbox não estiver marcada
    }

    // Fazer uma requisição para a API para inserir os dados do funcionário
    fetch("https://faculdadedb-faculdadeapi.yykemf.easypanel.host/api/Funcionario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, senha, nome, cpf }),
    })
      .then((response) => {
        if (response.status === 200) {
          // Redirecionar para a página de login
          window.location.replace("login.html");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // Lógica após a resposta da API
        console.log(data);
        if (data && data.success) {
          // Cadastro bem-sucedido
          alert("Funcionário cadastrado com sucesso!");
        } else if (data && data.error) {
          // Cadastro falhou
          alert("Erro ao cadastrar o funcionário. Por favor, tente novamente.");
        }
      })
      .catch((error) => {
        // Tratar erros
        console.error(error);
        alert("Ocorreu um erro durante o cadastro do funcionário. Por favor, tente novamente mais tarde.");
      });
  }

  document.getElementById("cadastrar-btn").addEventListener("click", cadastrarFuncionario);
});
