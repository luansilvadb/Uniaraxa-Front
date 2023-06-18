// Função para carregar avaliadores cadastrados na tela de cadastro de campanha
function carregarAvaliadores() {
    // Fazer uma requisição para a API para obter a lista de avaliadores
    fetch("https://faculdadedb-faculdadeapi.yykemf.easypanel.host/api/Avaliador")
      .then((response) => response.json())
      .then((data) => {
        var select = document.getElementById("avaliador-responsavel");
        data.forEach((avaliador) => {
          var option = document.createElement("option");
          option.value = avaliador.id;
          option.textContent = avaliador.nome;
          select.appendChild(option);
        });
      })
      .catch((error) => {
        // Tratar erros
        console.error(error);
      });
  }
  