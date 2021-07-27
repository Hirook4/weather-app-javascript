// Quando o formulario for enviado sera executado essa função
document.querySelector('.busca').addEventListener('submit', async (event) => {
    // Previne o comportamento padrao que o formulario deveria ter (no caso nao ira deixar a pagina ser redirecionada)
    event.preventDefault();

    // Pega o que foi digitado
    let input = document.querySelector('#searchInput').value;

    // Verificando se algo foi digitado na barra de busca
    if (input != '') {
        clearInfo();
        showWaning("Carregando...");

        // url da API Open Weather
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=05c4b5aa7c61dded804861604e531a7d&units=metric&lang=pt_br`

        // Await espera o resultado chegar antes de ser ativado
        let results = await fetch(url);
        let json = await results.json();
        console.log(json);

        // Verifica de a cidade existe
        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
            });
        } else {
            clearInfo();
            showWaning("Cidade Não Encontrada")
        }

    } else {
        clearInfo();
    }
});

// Função que mostra as informações na tela
function showInfo(json) {

    showWaning("");

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`

    // Trocando a src da imagem
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    // Trocando angulo do vento
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`

    document.querySelector('.resultado').style.display = 'block';
}

// Função que limpa o resultado
function clearInfo() {
    showWaning('');
    document.querySelector('.resultado').style.display = 'none';
}

// Função responsavel por controlar os avisos
function showWaning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}