document.getElementById("avaliadorForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var nomeAvaliador = document.getElementById("nomeAvaliador").value;
  var cpfAvaliador = document.getElementById("cpfAvaliador").value;

  var avaliador = {
    nome: nomeAvaliador,
    cpf: cpfAvaliador
  };

  // Fazer uma requisição para a API para cadastrar o avaliador
  fetch("https://faculdadedb-faculdadeapi.yykemf.easypanel.host/api/Avaliador", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(avaliador),
  })
    .then((response) => response.json())
    .then((data) => {
      // Lógica após a resposta da API
      console.log(data);
      // Exibir uma mensagem de sucesso ou redirecionar para outra página, se necessário
    })
    .catch((error) => {
      // Tratar erros
      console.error(error);
      // Exibir uma mensagem de erro ao usuário
    });
});
