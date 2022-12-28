"use strict";

const backgroundImg = document.querySelector(".bg-img");
const mainContainer = document.querySelector(".backgroundMain");
const locationInput = document.querySelector(".locationEnterVal");
const locationBtn = document.querySelector(".locationEnterBtn");
const dateTime = document.querySelector(".date-time");
const loc = document.querySelector(".location");
const currentImg = document.querySelector(".currentImg");
const currTempText = document.querySelector(".val");
const currMaxTempText = document.querySelector(".maxTempText");
const currMinTempText = document.querySelector(".minTempText");
const celsius = document.querySelector(".c");
const farhenheit = document.querySelector(".f");
const humidityValue = document.querySelector(".hValue");
const windSpeedValue = document.querySelector(".wValue");
const uvValue = document.querySelector(".uValue");
const forecastContainer = document.querySelector(".forecast");

//Event Listeners
locationInput.addEventListener("click", function () {
  locationInput.value = "";
});

locationBtn.addEventListener("click", function () {
  const l =
    locationInput.value.slice(0, 1).toUpperCase() +
    locationInput.value.slice(1).toLowerCase();
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=cc40e84a782f4d55bb575504222612&q=${l}&days=7&aqi=no&alerts=no`
  )
    .then(function (res) {
      if (res.ok) {
        loc.textContent = l;
        forecastContainer.innerHTML = "";
        setCurrent(l);
        setForecastedData(l);
      } else {
        alert("NO SUCH PLACE IN OUR RECORDS !!");
      }
    })
    .catch((err) => alert(err.message));
});

//Function Declarations
const setBackground = function () {
  const now = new Date();
  if (now.getHours() >= 5 && now.getHours() <= 14) {
    backgroundImg.setAttribute("src", "morning.jpg");
  } else if (now.getHours() >= 15 && now.getHours() <= 18) {
    backgroundImg.setAttribute("src", "evening.jpg");
  } else {
    backgroundImg.setAttribute("src", "night.jpg");
  }
};

const setContainerColour = function () {
  if (backgroundImg.getAttribute("src") === "evening.jpg") {
    mainContainer.style.backgroundColor = "#58373E";
  } else if (backgroundImg.getAttribute("src") === "morning.jpg") {
    mainContainer.style.backgroundColor = "rgb(18, 17, 17)";
  } else {
    mainContainer.style.backgroundColor = "rgb(53,89,133)";
  }
};

const setDateTime = function () {
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  dateTime.textContent = `${days[now.getDay()]}, ${String(
    now.getHours()
  ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
};

const getJSON = async function (url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("NO SUCH PLACE IN OUR RECORDS !!");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    alert(err.message);
  }
};

const setCurrent = async function (place) {
  const data = getJSON(
    `https://api.weatherapi.com/v1/forecast.json?key=cc40e84a782f4d55bb575504222612&q=${place}&days=7&aqi=no&alerts=no`
  );
  const fetchedData = await data;
  currTempText.textContent = fetchedData.current.temp_c;
  currMaxTempText.textContent =
    fetchedData.forecast.forecastday[0].day.maxtemp_c;
  currMinTempText.textContent =
    fetchedData.forecast.forecastday[0].day.mintemp_c;

  celsius.addEventListener("click", function () {
    celsius.style.color = "aqua";
    farhenheit.style.color = "white";
    currTempText.textContent = fetchedData.current.temp_c;
    currMaxTempText.textContent =
      fetchedData.forecast.forecastday[0].day.maxtemp_c;
    currMinTempText.textContent =
      fetchedData.forecast.forecastday[0].day.mintemp_c;
  });

  farhenheit.addEventListener("click", function () {
    celsius.style.color = "white";
    farhenheit.style.color = "aqua";
    currTempText.textContent = fetchedData.current.temp_f;
    currMaxTempText.textContent =
      fetchedData.forecast.forecastday[0].day.maxtemp_f;
    currMinTempText.textContent =
      fetchedData.forecast.forecastday[0].day.mintemp_f;
  });

  const img = document.createElement("img");
  img.classList.add("cImg");
  const ClearNight = [1000];
  const Cloudy = [1006, 1009, 1135];
  const CloudyRain = [
    1063, 1069, 1072, 1150, 1153, 1168, 1180, 1183, 1186, 1189, 1198, 1201,
    1240,
  ];
  const PartlyCloudy = [1003, 1030];
  const Snow = [
    1114, 1117, 1147, 1210, 1213, 1216, 1219, 1222, 1225, 1258, 1261,
  ];
  const SnowShower = [
    1066, 1204, 1207, 1237, 1249, 1252, 1255, 1264, 1279, 1282,
  ];
  const Sunny = [1000];
  const Thunderstorm = [1087, 1171, 1192, 1195, 1243, 1246, 1273, 1276];

  if (
    (ClearNight.includes(fetchedData.current.condition.code) &&
      backgroundImg.getAttribute("src") === "night.jpg") ||
    backgroundImg.getAttribute("src") === "evening.jpg"
  ) {
    img.src = "weather/ClearNight.png";
  } else if (Cloudy.includes(fetchedData.current.condition.code)) {
    img.src = "weather/Cloudy.png";
  } else if (CloudyRain.includes(fetchedData.current.condition.code)) {
    img.src = "weather/CloudyRain.png";
  } else if (PartlyCloudy.includes(fetchedData.current.condition.code)) {
    img.src = "weather/PartlyCloudy.png";
  } else if (Snow.includes(fetchedData.current.condition.code)) {
    img.src = "weather/Snow.png";
  } else if (SnowShower.includes(fetchedData.current.condition.code)) {
    img.src = "weather/SnowShower.png";
  } else if (Sunny.includes(fetchedData.current.condition.code)) {
    img.src = "weather/Sunny.png";
  } else if (Thunderstorm.includes(fetchedData.current.condition.code)) {
    img.src = "weather/Thunderstorm.png";
  }

  currentImg.innerHTML = "";
  currentImg.append(img);

  humidityValue.textContent = fetchedData.current.humidity;
  windSpeedValue.textContent = fetchedData.current.wind_kph;
  uvValue.textContent = fetchedData.current.uv;
};

const setForecastedData = async function (place) {
  const data = getJSON(
    `https://api.weatherapi.com/v1/forecast.json?key=cc40e84a782f4d55bb575504222612&q=${place}&days=7&aqi=no&alerts=no`
  );
  const fetchedData = await data;

  for (let i = 1; i < 3; i++) {
    let date = fetchedData.forecast.forecastday[i].date;
    date = `${date.slice(-2)}-${date.slice(5, 7)}-${date.slice(0, 4)}`;
    const html = `
    <div class="fo f1">
      <div class="time">${date}</div>
      <div class="tSeparator"></div>
      <div class="fContent">
        <div class="fTemp">
          <div class="fTempIcon"><img src="weather1/64x64/day/${fetchedData.forecast.forecastday[
            i
          ].day.condition.icon.slice(-7, -4)}.png"></img></div>
          <div class="tSeparator"></div>
          <div class="fTempText">${
            fetchedData.forecast.forecastday[i].day.avgtemp_c
          } °C</div>
        </div>
        <div class="typeSeparator"></div>
        <div class="fContentInner">
          <div class="fHumidity">
            <div class="fIcon"><img src="humidity.png" alt="" /></div>
            <div class="fVal">${
              fetchedData.forecast.forecastday[i].day.avghumidity
            }</div>
          </div>
          <div class="tSeparator"></div>
          <div class="fWindSpeed">
            <div class="fIcon"><img src="storm.png" alt="" /></div>
            <div class="fVal">${
              fetchedData.forecast.forecastday[i].day.avgvis_km
            }</div>
          </div>
          <div class="tSeparator"></div>
          <div class="fUV">
            <div class="fIcon"><img src="ultraviolet.png" alt="" /></div>
            <div class="fVal">${
              fetchedData.forecast.forecastday[i].day.uv
            }</div>
          </div>
        </div>
      </div>
    </div>
  `;
    forecastContainer.insertAdjacentHTML("beforeend", html);
  }
};

//Function Calls
setDateTime();
setInterval(setDateTime, 3000);
setBackground();
setContainerColour();

navigator.geolocation.getCurrentPosition(function (pos) {
  fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&limit=1&appid=27f1659e9d5905162b52b6e7457653bc`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const d = data[0];
      setCurrent(d.name);
      setForecastedData(d.name);
      loc.textContent = d.name;
    })
    .catch((err) => alert(err.message));
});
