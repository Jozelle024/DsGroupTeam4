/* global google */
/* global moment */
/* global extractWeather */
/* exported initFunction */

//global variable
var map, infoWindow;
var pos = {
    lat: 43.325231,
    lng: 23.412342
};
//function onload
$(document).ready(function() {
    'use strict';
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + pos.lat + "&lon=" + pos.lng + "&APPID=ee6b293d773f4fcd7e434f79bbc341f2";
    $.getJSON(url, function(dataw) {
        $(document).delay(2000);
        addTable (dataw);
        //functionGo ();
    });
    /*var url = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + pos.lat + "&lon=" + pos.lng + "&APPID=ee6b293d773f4fcd7e434f79bbc341f2&";
    $.getJSON(url, function(dataf) {
        $(document).delay(2000);
        addTableForecast (dataf);
    });*/
    $.getJSON("https://randomuser.me/api/?results=1", function(datap) {
        addName (datap);
    });
    setTimeout( function() {
        url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + pos.lat + "," + pos.lng + "&key=AIzaSyD-fxKwF1sWWcV49zr9q0cT97l6fIqZj-E";
        $.getJSON(url, function(datal) {
            addLocation (datal);
        });
    }, 10000);
});
//function callback
function initMap() {
    'use strict';
    map = new google.maps.Map(document.getElementById('mappa'), {
        center: {
            lat: pos.lat,
            lng: pos.lng
        },
        zoom: 15
    });
    infoWindow = new google.maps.InfoWindow;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            pos.lat = position.coords.latitude;
            pos.lng = position.coords.longitude;
            var marker = new google.maps.Marker({
                position: pos,
                draggable: false,
                map: map,
                icon: "../images/location.png"
            });
            map.setCenter(pos);
            /*setTimeout( function() {
                $("#loader").css("display", "none");
            }, 5000);*/
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}
//Questa funzione mi permette di gestire il caso in cui c'è un errore sulla posizione della Geolocalizzazione
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    'use strict';
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? window.location.replace("../html/error.html") : 'Errore: Il tuo Browser non sopporta Geolocalizzazione');
    infoWindow.open(map);
}
//function add text
function addTable (app) {
    'use strict';
    var sunrise = moment(app.sys.sunrise*1000);
    sunrise.locale('it');
    var sunset = moment(app.sys.sunset*1000);
    sunset.locale('it');
    /*$("#wind").text(app.wind.speed + " m/s " + windDirection((app.wind.deg).toFixed (2)));
    $("#description").text(app.weather[0].description);
    $("#pressure").text(app.main.pressure + " hpa");
    $("#humidity").text(app.main.humidity + "%");
    $("#iconimg").attr("src","https://openweathermap.org/img/w/" + app.weather[0].icon + ".png");
    $("#sunset").text(sunset);
    $("#sunrise").text(sunrise);
    $("#temperature").text((app.main.temp-274.15).toFixed (0) + "°C");*/
} 
function addName (app) {
    'use strict';
    var storage = createStorage (app);
    if (app.results[0].gender=="male") {
        $("#nome-utente").text("Benvenuto, " + storage.nomeUtente);
    } else {
        $("#nome-utente").text("Benvenuta, " + storage.nomeUtente);
    }
    $("#ultimo-accesso").text(storage.ultimoAccesso);
}
function createStorage (app) {
    'use strict';
    var date = moment();
    var data = {
        nomeUtente: app.results[0].name.first + " " + app.results[0].name.last,
        ultimoAccesso: date.format('LLLL')
        /*nomeUtente: "dwayne smith",
        ultimoAccesso: "sssss"*/
    };
    var vet = [];
    if (localStorage) {
        if (localStorage.getItem('sessione')) {
            vet = JSON.parse(localStorage.getItem('sessione'));
            var indice = controlName (vet, data);
            if (indice!=-1) {
                vet[indice].ultimoAccesso = date.format('LLLL');
                localStorage.setItem('sessione', JSON.stringify(vet));
                return vet[indice];
            } else {
                vet.push(data);
                localStorage.setItem('sessione', JSON.stringify(vet));
                console.log ("new indice");
                return data;
            }
        } else {
            vet.push(data);
            // Re-serialize the array back into a string and store it in localStorage
            localStorage.setItem('sessione', JSON.stringify(vet));
            console.log ("primo");
            return data;
        }
    } else {
    }
}
function controlName (vet, data) {
    for (var cont=0; cont<vet.length;cont++) {
        if (vet[cont].nomeUtente === data.nomeUtente) {
            return cont;
        }
    }
    return -1;
}
function windDirection (deg) {
    'use strict';
    var north = "North";
    var est = "Est";
    var south = "South";
    var west = "West";
    if (deg>348.75 && deg<11.25) {
        return north+"("+deg+")";
    }
    if (deg>11.25 && deg<33.75) {
        return north+"-"+north+"-"+est+"("+deg+")";
    }
    if (deg>33.75 && deg<56.25) {
        return north+"-"+est+"("+deg+")";
    }
    if (deg>56.25 && deg<78.75) {
        return est+"-"+north+"-"+est+"("+deg+")";
    }
    if (deg>78.75 && deg<101.25) {
        return est+"("+deg+")";
    }
    if (deg>101.25 && deg<123.75) {
        return est+"-"+south+"-"+est+"("+deg+")";
    }
    if (deg>123.75 && deg<146.25) {
        return south+"-"+est+"("+deg+")";
    }
    if (deg>146.25 && deg<168.75) {
        return south+"-"+south+"-"+est+"("+deg+")";
    }
    if (deg>168.75 && deg<191.25) {
        return south+"("+deg+")";
    }
    if (deg>191.25 && deg<213.75) {
        return south+"-"+south+"-"+west+"("+deg+")";
    }
    if (deg>213.75 && deg<236.25) {
        return south+"-"+west+"("+deg+")";
    }
    if (deg>236.25 && deg<258.75) {
        return west+"-"+south+"-"+west+"("+deg+")";
    }
    if (deg>258.75 && deg<281.25) {
        return west+"("+deg+")";
    }
    if (deg>281.25 && deg<303.75) {
        return west+"-"+north+"-"+west+"("+deg+")";
    }
    if (deg>303.75 && deg<326.25) {
        return north+"-"+west+"("+deg+")";
    }
    if (deg>326.25 && deg<348.75) {
        return north+"-"+north+"-"+west+"("+deg+")";
    }
}
function addLocation (app) {
    'use strict';
    $("#city").text(app.results[0].address_components[2].long_name);
    $("#country").text(app.results[0].address_components[6].long_name);
}
/*
$(document).ready(function() {
    'use strict';
    initializePage();
});
function initializePage() {
    'use strict';
    var date = moment();
    var userInfo = {};
    if (localStorage && localStorage.getItem('name')) {
        userInfo.name = localStorage.getItem('name');
        userInfo.lastAccess = localStorage.getItem('lastAccess');
        localStorage.setItem('lastAccess', date.format('LLLL'));
    } else {
        userInfo.name = 'Mario Rossi';
        localStorage.setItem('name', userInfo.name);
        userInfo.lastAccess = localStorage.lastAccess || 'Mai';
        localStorage.setItem('lastAccess' , date.format('LLLL'));
    }
    document.getElementById('nome-utente').innerText = userInfo.name;
    document.getElementById('ultimo-accesso').innerText = userInfo.lastAccess;
    miaFunzioneCallback();
}
 */

