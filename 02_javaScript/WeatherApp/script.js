const API = "ea1e9122ddff57c9091fa5a57683bee8";

//DOM references
const loader = document.querySelector(".loader");
const container = document.querySelector(".container")
const inputBox = document.getElementById("input_box");
const searchBtn = document.getElementById("search_button");

const cityNameEl = document.querySelector(".city_name");
const img = document.querySelector(".weather_icon img");
const tempEl = document.querySelector(".temperature");
const conditionEl = document.querySelector(".condition");

const humidityEl = document.querySelector(".humidity_unit");
const windspeedEl = document.querySelector(".windspeed_unit");
const visibilityEl = document.querySelector(".visibility_unit");
const pressureEl = document.querySelector(".pressure_unit");

//Helper Functions
function reset() {
    inputBox.value = "";
}

function clearError() {
    const errorEl = document.querySelector(".error_msg");
    if (errorEl) {
        errorEl.remove();
    }
    return;
}

function showError() {
    if (document.querySelector(".error_msg")) return;

    const inputBoxContainer = document.querySelector(".inputbox_container");

    const p = document.createElement("p")
    p.classList.add("error_msg");
    p.style.width = "100%";
    p.style.color = "red"
    p.textContent = "Enter valid city...";
    inputBoxContainer.insertAdjacentElement("afterend", p)
}

async function fetchWeather(cityName = "New Delhi") {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${API}`

    const response = await fetch(url);

    if (!response.ok) {
        showError();
        return;
    }

    clearError();

    const data = await response.json();
    const {
        name,
        main: { temp, pressure, humidity },
        weather: [{ icon, main }],
        wind: { speed },
        visibility
    } = data;

    cityNameEl.textContent = name;
    img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    tempEl.textContent = temp + "℃";
    conditionEl.textContent = main
    humidityEl.textContent = humidity + "%";
    windspeedEl.textContent = speed + "m/s";
    visibilityEl.textContent = visibility / 1000 + " km";
    pressureEl.textContent = pressure + " hpa";

    reset();

}

function handler() {
    if (!inputBox.value) {
        showError();
        return;
    }

    clearError();

    fetchWeather(inputBox.value)
}

// first load render data
window.onload = async function () {
    await fetchWeather();
    loader.style.display = "none";
    container.style.display = "flex";
}

//Attaching listeners
searchBtn.addEventListener("click", handler);
inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handler();
})