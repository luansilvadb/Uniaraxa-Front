// Função para cadastrar um avaliador
function cadastrarAvaliador() {
    var nome = document.getElementById("nome-avaliador").value;
    var cpf = document.getElementById("cpf-avaliador").value;
  
    // Fazer uma requisição para a API para inserir os dados do funcionário
    fetch("http://softwarehouse.ddns.net:62617/api/Avaliador", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, cpf }),
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
  