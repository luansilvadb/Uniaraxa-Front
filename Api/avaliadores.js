// Array de avaliadores
var avaliadores = [];

// Função para carregar os avaliadores
function carregarAvaliadores() {
  // Código para carregar os avaliadores
  avaliadores.forEach(function(avaliador) {
    // Criação e adição dos elementos HTML na página
    var option = document.createElement("option");
    option.value = avaliador.id;
    option.textContent = avaliador.nome;

    var selectElement = document.getElementById("avaliadorCampanha");
    selectElement.appendChild(option);
  });
}

// Espera que o DOM esteja pronto para executar o código
document.addEventListener("DOMContentLoaded", function() {
  carregarAvaliadores();
});
