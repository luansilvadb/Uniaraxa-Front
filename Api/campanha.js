// Função para cadastrar uma campanha
function cadastrarCampanha() {
    var responsavel = document.getElementById("responsavel-campanha").value;
    var nome = document.getElementById("nome-campanha").value;
    var descricao = document.getElementById("descricao-campanha").value;
    var periodo = document.getElementById("periodo-campanha").value;
    var valorPremio = document.getElementById("valor-premio").value;
    var avaliadorResponsavel = document.getElementById("avaliador-responsavel").value;
  
    // Montar o objeto de requisição
    var campanha = {
      responsavel,
      nome,
      descricao,
      periodo,
      valor_Premio: parseFloat(valorPremio),
      avaliador_Id: parseInt(avaliadorResponsavel),
    };
  
    // Fazer uma requisição para a API para inserir os dados da campanha
    fetch("http://softwarehouse.ddns.net:62617/api/Campanha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(campanha),
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
  