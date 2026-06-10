import { codeToText } from "./weatherText.js"; // weatherText.jsからcodeToText関数をインポートする

document.getElementById("getBtn").addEventListener("click", () => {
    getweather();
});

let url;
async function getweather() {
    const city = document.querySelector("select").value;
    //各都市の現在の天気を取得するURL
    if (city === "nagoya") {
        url = "https://api.open-meteo.com/v1/forecast?latitude=35.18&longitude=136.91&current_weather=true";
    } else if (city === "tokyo") {
        url = "https://api.open-meteo.com/v1/forecast?latitude=35.68&longitude=139.76&current_weather=true";
    } else if (city === "osaka") {
        url= "https://api.open-meteo.com/v1/forecast?latitude=34.69&longitude=135.50&current_weather=true";
    }

    const response = await fetch(url); //URLにアクセスしてデータをお願いする
    const data = await response.json(); //送ってきたデータをjsonとして取り出す

    //必要な値を取る
    const temp = data.current_weather.temperature;
    const wind = data.current_weather.windspeed;
    const code = data.current_weather.weather_code;
    const weather = codeToText(code);

    //DOMに表示する
    document.getElementById("temp").textContent = `${weather} /気温: ${temp}°C/風速: ${wind} km/h`;

    //デバッグ用にコンソールにも表示する
    console.log(data);
}