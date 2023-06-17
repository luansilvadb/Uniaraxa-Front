// Função para cadastrar uma sugestão
function cadastrarSugestao() {
    var descricao = document.getElementById("descricao-sugestao").value;
    var custosEnvolvidos = parseFloat(document.getElementById("custos-sugestao").value);
    var campanhaRelacionada = parseInt(document.getElementById("campanha-relacionada").value);
  
    // Montar o objeto de requisição
    var sugestao = {
      descricao,
      custos_Envolvidos: custosEnvolvidos,
      campanha_Id: campanhaRelacionada,
    };
  
    // Fazer uma requisição para a API para inserir os dados da sugestão
    fetch("http://softwarehouse.ddns.net:62617/api/Sugestao", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sugestao),
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
  
  // Função para carregar campanhas cadastradas na tela de cadastro de sugestão
  function carregarCampanhas() {
    // Fazer uma requisição para a API para obter a lista de campanhas
    fetch("http://softwarehouse.ddns.net:62617/api/Campanha")
      .then((response) => response.json())
      .then((data) => {
        var select = document.getElementById("campanha-relacionada");
        data.forEach((campanha) => {
          var option = document.createElement("option");
          option.value = campanha.id;
          option.textContent = campanha.nome;
          select.appendChild(option);
        });
      })
      .catch((error) => {
        // Tratar erros
        console.error(error);
      });
  }
  
  // Função para carregar sugestões cadastradas na tela de avaliação de sugestões
  function carregarSugestoes() {
    // Fazer uma requisição para a API para obter a lista de sugestões
    fetch("http://softwarehouse.ddns.net:62617/api/Sugestao")
      .then((response) => response.json())
      .then((data) => {
        var lista = document.getElementById("lista-sugestoes");
        data.forEach((sugestao) => {
          var item = document.createElement("li");
          item.dataset.id = sugestao.id;
          var descricao = document.createElement("p");
          descricao.textContent = sugestao.descricao;
          item.appendChild(descricao);
          var criatividadeInput = document.createElement("input");
          criatividadeInput.className = "criatividade";
          criatividadeInput.type = "number";
          item.appendChild(criatividadeInput);
          var investimentoInput = document.createElement("input");
          investimentoInput.className = "investimento";
          investimentoInput.type = "number";
          item.appendChild(investimentoInput);
          var tempoImplantacaoInput = document.createElement("input");
          tempoImplantacaoInput.className = "tempo-implantacao";
          tempoImplantacaoInput.type = "number";
          item.appendChild(tempoImplantacaoInput);
          var reducaoCustoInput = document.createElement("input");
          reducaoCustoInput.className = "reducao-custo";
          reducaoCustoInput.type = "number";
          item.appendChild(reducaoCustoInput);
          lista.appendChild(item);
        });
      })
      .catch((error) => {
        // Tratar erros
        console.error(error);
      });
  }
  
  // Função para enviar avaliação de sugestões
  function enviarAvaliacao() {
    var sugestoes = document.querySelectorAll("#lista-sugestoes li");
  
    sugestoes.forEach(function (sugestao) {
      var sugestaoId = sugestao.dataset.id;
      var criatividade = parseInt(sugestao.querySelector(".criatividade").value);
      var investimento = parseInt(sugestao.querySelector(".investimento").value);
      var tempoImplantacao = parseInt(sugestao.querySelector(".tempo-implantacao").value);
      var reducaoCusto = parseInt(sugestao.querySelector(".reducao-custo").value);
  
      // Montar o objeto de requisição
      var avaliacao = {
        criatividade,
        investimento,
        tempo_Implantacao: tempoImplantacao,
        reducao_Custo: reducaoCusto,
        vencedora: false, // Definir de acordo com a lógica do sistema
        sugestao_Id: sugestaoId,
      };
  
      // Fazer uma requisição para a API para inserir os dados de avaliação da sugestão
      fetch(`http://softwarehouse.ddns.net:62617/api/Sugestao/${sugestaoId}/Avaliacao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(avaliacao),
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
    });
  }
  