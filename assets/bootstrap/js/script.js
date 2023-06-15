var openFormButton = document.getElementById("openFormButton");
var openAvaliadorFormButton = document.getElementById(
  "openAvaliadorFormButton"
);
var campaignForm = document.getElementById("campaignForm");
var avaliadorForm = document.getElementById("avaliadorForm");
var campanhasContainer = document.getElementById("campanhasContainer");

openFormButton.addEventListener("click", function () {
  openFormButton.style.display = "none";
  campaignForm.classList.remove("hidden");
});

openAvaliadorFormButton.addEventListener("click", function () {
  openAvaliadorFormButton.style.display = "none";
  avaliadorForm.classList.remove("hidden");
});

document
  .getElementById("campaignForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var responsavel = document.getElementById("responsavel").value;
    var nome = document.getElementById("nomeCampanha").value;
    var descricao = document.getElementById("descricaoCampanha").value;
    var periodo = document.getElementById("periodo").value;
    var premio = document.getElementById("premio").value;
    var avaliador = document.getElementById("avaliadorCampanha").value;

    var campanha = {
      responsavel: responsavel,
      nome: nome,
      descricao: descricao,
      periodo: periodo,
      premio: premio,
      avaliador: avaliador,
    };

    var card = createCard(campanha);
    campanhasContainer.appendChild(card);

    clearFormFields();
  });

function createCard(campanha) {
  var card = document.createElement("div");
  card.classList.add("card");
  card.id = campanha.nome.toLowerCase().replace(/ /g, "-");

  var cardContent = `
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

function clearFormFields() {
  document.getElementById("responsavel").value = "";
  document.getElementById("nomeCampanha").value = "";
  document.getElementById("descricaoCampanha").value = "";
  document.getElementById("periodo").value = "";
  document.getElementById("premio").value = "";
  document.getElementById("avaliadorCampanha").value = "";
}

function handleVoteButtonClick(event) {
  var card = event.target.closest(".card");
  var votesElement = card.querySelector(".votes");
  var votesCount = parseInt(votesElement.textContent);

  votesCount++;
  votesElement.textContent = votesCount + " votos";

  event.target.disabled = true;
}

document
  .getElementById("campanhasContainer")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("vote-button")) {
      handleVoteButtonClick(event);
    }
  });
