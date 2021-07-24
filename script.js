// Quando o formulario for enviado sera executado essa função
document.querySelector('.busca').addEventListener('submit', (event) => {
    // Previne o comportamento padrao que o formulario deveria ter (no caso nao ira deixar a pagina ser redirecionada)
    event.preventDefault();
    // Pega o que foi digitado
    let input = document.querySelector('#searchInput').value;
    // Verificando se algo foi digitado na barra de busca
    if (input != '') {
        showWaning("Carregando...");
    } else { }
});

// Função responsavel por controlar os avisos
function showWaning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}