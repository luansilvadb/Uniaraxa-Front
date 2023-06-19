document.addEventListener("DOMContentLoaded", function () {
  const openFormButton = document.getElementById("openFormButton");
  const campaignForm = document.getElementById("campaignForm");
  const avaliadorSelect = document.getElementById("avaliadorCampanha");

  openFormButton.addEventListener("click", function () {
    openFormButton.style.display = "none";
    campaignForm.classList.remove("hidden");
    fetchAvaliadores(avaliadorSelect);
  });

  document.getElementById("campaignForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const responsavel = document.getElementById("responsavel").value;
    const nome = document.getElementById("nomeCampanha").value;
    const descricao = document.getElementById("descricaoCampanha").value;
    const periodo = document.getElementById("periodo").value;
    const premio = document.getElementById("premio").value;
    const avaliador = avaliadorSelect.value;

    const campanha = {
      responsavel: responsavel,
      nome: nome,
      descricao: descricao,
      periodo: periodo,
      valor_Premio: premio,
      avaliador_Id: avaliador,
      avaliador: null,
    };
    

    cadastrarCampanha(campanha);
    clearFormFields();
  });

  function fetchAvaliadores(selectElement) {
    fetch("https://api.luansilva.com.br/api/Avaliador")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((avaliador) => {
          const option = document.createElement("option");
          option.value = avaliador.id;
          option.textContent = avaliador.nome;
          selectElement.appendChild(option);
        });
      })
      .catch((error) => {
        console.error(error);
        alert("Ocorreu um erro ao obter a lista de avaliadores. Por favor, tente novamente mais tarde.");
      });
  }
  

  function cadastrarCampanha(campanha) {
    fetch("https://api.luansilva.com.br/api/Campanha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(campanha),
    })
      .then(response => {
        if (response.ok) {
          alert("Campanha cadastrada com sucesso!");
          carregarCampanhas(); // Atualizar a lista de cards após o cadastro bem-sucedido
        } else {
          throw new Error("Erro ao cadastrar campanha. Verifique os dados e tente novamente.");
        }
      })
      .catch(error => {
        console.error(error);
        alert("Ocorreu um erro durante o cadastro da campanha. Por favor, tente novamente mais tarde.");
      });
  }
  
  

  function clearFormFields() {
    document.getElementById("responsavel").value = "";
    document.getElementById("nomeCampanha").value = "";
    document.getElementById("descricaoCampanha").value = "";
    document.getElementById("periodo").value = "";
    document.getElementById("premio").value = "";
    avaliadorSelect.value = "";
  }
});
