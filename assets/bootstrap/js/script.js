document.addEventListener("DOMContentLoaded", function() {
  const openFormButton = document.getElementById("openFormButton");
  const openAvaliadorFormButton = document.getElementById("openAvaliadorFormButton");
  const campaignForm = document.getElementById("campaignForm");
  const avaliadorForm = document.getElementById("avaliadorForm");
  const campanhasContainer = document.getElementById("campanhasContainer");

  openFormButton.addEventListener("click", function() {
    openFormButton.style.display = "none";
    campaignForm.classList.remove("hidden");
  });

  openAvaliadorFormButton.addEventListener("click", function() {
    openAvaliadorFormButton.style.display = "none";
    avaliadorForm.classList.remove("hidden");
  });

  campaignForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const responsavel = document.getElementById("responsavel").value;
    const nome = document.getElementById("nomeCampanha").value;
    const descricao = document.getElementById("descricaoCampanha").value;
    const periodo = document.getElementById("periodo").value;
    const premio = document.getElementById("premio").value;
    const avaliador = document.getElementById("avaliadorCampanha").value;

    const campanha = {
      responsavel,
      nome,
      descricao,
      periodo,
      premio,
      avaliador
    };

    const card = createCard(campanha);
    campanhasContainer.appendChild(card);

    clearFormFields(campaignForm);
  });

  avaliadorForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nomeAvaliador = document.getElementById("nomeAvaliador").value;
    const cpfAvaliador = document.getElementById("cpfAvaliador").value;

    const avaliador = {
      nome: nomeAvaliador,
      cpf: cpfAvaliador
    };

    cadastrarAvaliador(avaliador);
    clearFormFields(avaliadorForm);
  });

  campanhasContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("vote-button")) {
      handleVoteButtonClick(event);
    }
  });
});

function createCard(campanha) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.id = campanha.nome.toLowerCase().replace(/ /g, "-");

  const cardContent = `
    <h2>${campanha.nome}</h2>
    <p><span class="label label--info">Responsável:</span> ${campanha.responsavel}</p>
    <p><span class="label label--info">Descrição:</span> ${campanha.descricao}</p>
    <p><span class="label label--info">Período:</span> ${campanha.periodo}</p>
    <p><span class="label label--info">Valor do Prêmio:</span> ${campanha.premio}</p>
    <p><span class="label label--info">Avaliador:</span> ${campanha.avaliador}</p>
    <div class="voting">
      <button class="button vote-button">Votar</button>
      <span class="votes">0 votos</span>
    </div>
  `;

  card.innerHTML = cardContent;

  return card;
}

function clearFormFields(form) {
  const formInputs = form.querySelectorAll("input, textarea");

  formInputs.forEach(input => {
    input.value = "";
  });
}

function handleVoteButtonClick(event) {
  const card = event.target.closest(".card");
  const votesElement = card.querySelector(".votes");
  let votesCount = parseInt(votesElement.textContent);

  votesCount++;
  votesElement.textContent = votesCount + " votos";

  event.target.disabled = true;
}

function cadastrarAvaliador(avaliador) {
  // Fazer uma requisição para a API para cadastrar o avaliador
  fetch("https://api.luansilva.com.br/api/Avaliador", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(avaliador)
  })
    .then(response => {
      if (response.ok) {
        alert("Avaliador cadastrado com sucesso!");
      } else {
        throw new Error("Erro ao cadastrar o avaliador.");
      }
    })
    .catch(error => {
      console.error(error);
      alert("Ocorreu um erro ao cadastrar o avaliador. Por favor, tente novamente mais tarde.");
    });
}
