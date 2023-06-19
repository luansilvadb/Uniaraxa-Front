document.addEventListener("DOMContentLoaded", function () {
  const openFormButton = document.getElementById("openFormButton");
  const sugestaoForm = document.getElementById("sugestaoForm");
  const campanhaRelacionadaSelect = document.getElementById("campanha-relacionada");

  openFormButton.addEventListener("click", function () {
    openFormButton.style.display = "none";
    sugestaoForm.classList.remove("hidden");
    fetchCampanhas(campanhaRelacionadaSelect);
  });

  document.getElementById("sugestaoForm").addEventListener("submit", function (event) {
    event.preventDefault();

    cadastrarSugestao();
    clearFormFields();
  });

  carregarSugestoes();
});

function fetchCampanhas(selectElement) {
  fetch("https://api.luansilva.com.br/api/Campanha")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((campanha) => {
        const option = document.createElement("option");
        option.value = campanha.id;
        option.textContent = campanha.nome;
        selectElement.appendChild(option);
      });
    })
    .catch((error) => {
      console.error(error);
      alert("Ocorreu um erro ao obter a lista de campanhas. Por favor, tente novamente mais tarde.");
    });
}

function clearFormFields() {
  document.getElementById("descricao-sugestao").value = "";
  document.getElementById("custos-sugestao").value = "";
  document.getElementById("campanha-relacionada").value = "";
}
