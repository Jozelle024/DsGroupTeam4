var Coord = {
    lon: -0.13,
    lat: 51.51
};

var Weather = [{
    id: 300,
    main: 'Drizzle',
    description: 'light intensity drizzle',
    icon: '09d'
}];

var Main = {
    temp: 280.32,
    pressure: 1012,
    humidity: 81,
    temp_min: 279.15,
    temp_max: 281.15
};

var Wind = {
    speed: 4.1,
    deg: 80
};

var Clouds = {
    all: 90
};

var Sys = {
    type: 1,
    id: 5091, 
    message: 0.0103,
    country: 'GB',
    sunrise: 1485762037,
    sunset: 1485794875
};

var Meteo = {
    coord: Coord,
    weather: Weather,
    base: 'stations',
    main: Main,
    visibility: 10000,
    wind: Wind,
    clouds: Clouds,
    dt: 1485789600,
    sys: Sys,
    id: 2643743,
    name: 'London',
    cod: 200
};

/* exported extractWeather */
function extractWeather(){
    'use strict';
    return Meteo;
}