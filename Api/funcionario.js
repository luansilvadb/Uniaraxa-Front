// Função para cadastrar um funcionário
function cadastrarFuncionario() {
    var login = document.getElementById("login").value;
    var senha = document.getElementById("senha").value;
    var nome = document.getElementById("nome-funcionario").value;
    var cpf = document.getElementById("cpf-funcionario").value;
  
    // Fazer uma requisição para a API para inserir os dados do funcionário
    fetch("https://faculdadedb-faculdadeapi.yykemf.easypanel.host/api/Funcionario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, senha, nome, cpf }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Lógica após a resposta da API
        console.log(data);
      })
      .catch((error) => {
        // Tratar erros
        console.error(error);
      });
  }
  