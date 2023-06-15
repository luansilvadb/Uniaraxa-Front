var openFormButton = document.getElementById("openFormButton");
var campaignForm = document.getElementById("campaignForm");
var campanhasContainer = document.getElementById("campanhasContainer");

openFormButton.addEventListener("click", function () {
  openFormButton.style.display = "none"; // Esconde o botão
  campaignForm.classList.remove("hidden"); // Remove a classe hidden para exibir o formulário
});

document
  .getElementById("campaignForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio do formulário para atualizar a página

    var responsavel = document.getElementById("responsavel").value;
    var nome = document.getElementById("nome").value;
    var descricao = document.getElementById("descricao").value;
    var periodo = document.getElementById("periodo").value;
    var premio = document.getElementById("premio").value;
    var avaliador = document.getElementById("avaliador").value;

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
  card.id = campanha.nome.toLowerCase().replace(/ /g, "-"); // Adiciona um ID exclusivo ao cartão

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
  document.getElementById("nome").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("periodo").value = "";
  document.getElementById("premio").value = "";
  document.getElementById("avaliador").value = "";
}
function handleVoteButtonClick(event) {
  var card = event.target.closest(".card"); // Obtém o elemento pai do botão (o cartão)
  var votesElement = card.querySelector(".votes"); // Obtém o elemento de contagem de votos
  var votesCount = parseInt(votesElement.textContent); // Obtém a contagem atual de votos

  // Incrementa a contagem de votos e atualiza o elemento de contagem de votos
  votesCount++;
  votesElement.textContent = votesCount + " votos";

  event.target.disabled = true; // Desabilita o botão de votação após o clique
}

// ...

document
  .getElementById("campanhasContainer")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("vote-button")) {
      handleVoteButtonClick(event);
    }
  });
