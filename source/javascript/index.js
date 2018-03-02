/* global $ */
/* global google*/
/* global moment*/


$(document).ready(function() {
    'use strict';
    initializePage();
});

function initializePage() {
    'use strict';
    var date = moment();
    var userInfo = {};

    if (sessionStorage && sessionStorage.getItem('welcomeString')) {
        localStorage.setItem('lastAccess', date.format('LLLL'));
        document.getElementById('ultimo-accesso').innerText = localStorage.getItem('lastAccess');
        document.getElementById('nome-utente').innerText = localStorage.getItem('welcomeString');
    } else {
        $.getJSON('https://randomuser.me/api/', function(data) {
            if (data.results[0].gender === 'male') {
                var welcomeString = `Benvenuto, ${data.results[0].name.first} ${data.results[0].name.first}`;
            } else {
                var welcomeString = `Benvenuta, ${data.results[0].name.first} ${data.results[0].name.last}`;
            }
            localStorage.setItem('welcomeString', welcomeString);
            localStorage.setItem('gender', data.results[0].gender);
            userInfo.lastAccess = localStorage.lastAccess || 'Mai';
            localStorage.setItem('lastAccess' , date.format('LLLL'));
            document.getElementById('nome-utente').innerText = welcomeString;
            document.getElementById('ultimo-accesso').innerText = userInfo.lastAccess;
        });
    }
    //miaFunzioneCallback();
}

function miaFunzioneCallback() {
    'use strict';
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(funzioneOk, funzioneErrore);
    } else {
        $('body').loading('stop');
        alert('La geolocalizzazione non è disponibile');
    }
}

function funzioneOk(position) {
    'use strict';
    if (position && position.coords) {
        var mapProp = {
            center:new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            zoom:16
        };
        
        var map = new google.maps.Map(document.getElementById('mappa'), mapProp);
        new google.maps.Marker({position: mapProp.center, map: map});
        new google.maps.Geocoder().geocode({'location': {lat: position.coords.latitude, lng: position.coords.longitude}}, function(results) {
            if( results && results[0] ) {
                document.getElementById('address').innerText = results[0].formatted_address;
            }
        });

        oggetto.generaOggetto(position, function(weatherObj) {
            document.getElementById('posizione').innerText = weatherObj.name;
            //document.getElementById('weather-img').setAttribute('src', 'https://openweathermap.org/img/w/' + weatherObj.weather[0].icon + '.png');
            //document.getElementById('temp').innerText = weatherObj.main.temp+' °';
            //document.getElementById('wind-deg').innerText = ( weatherObj.wind.deg || '0' )+' °';
            //document.getElementById('wind-speed').innerText = weatherObj.wind.speed+' m/s';
            //document.getElementById('pressure').innerText = weatherObj.main.pressure+' hpa';
            //document.getElementById('humidity').innerText = weatherObj.main.humidity+' %';
            document.getElementById('cloudiness').innerText = weatherObj.weather[0].description;
            //document.getElementById('sunrise').innerText = moment.unix(weatherObj.sys.sunrise).format('HH:MM');
            //document.getElementById('sunset').innerText = moment.unix(weatherObj.sys.sunset).format('HH:MM');
            //document.getElementById('long').innerText = Math.round(weatherObj.coord.lon * 100) / 100;
            //document.getElementById('lat').innerText = Math.round(weatherObj.coord.lat * 100)   / 100;
            $('body').loading('stop');
        });
    }
}

function funzioneErrore() {
    'use strict';
    $('body').loading('stop');
    alert("L'utente ha negato la geolocalizzazione");
}
