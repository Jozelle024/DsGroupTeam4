
function funzioneCallbackMaps(){
    if('geolocation' in navigator){
        navigator.geolocation.getCurrentPosition(funzionePosizioneTrovata, funzioneErrorePosizione);
    } else {
        window.alert('Geolocalizzazione non disponibile');
    }
}


function funzionePosizioneTrovata(position){
    if(position && position.coords){
        var latitudine = position.coords.latitude;
        var longitudine = position.coords.longitude;

        var mapProperties = {
            center: new google.maps.LatLng(latitudine, longitudine),
            zoom: 16
        };

        var map = new google.maps.Map(document.getElementById('mappa'), mapProperties); //Devi vedere come la chiama Nic nell'HTML
        var marker = new google.maps.Marker({
            position: mapProperties.center,
            map: map
        });
    }
}


function funzioneErrorePosizione(){
    window.alert(error.message);
}



function storageLastDate(){
    localStorage.setItem('date', Date.now());
}


function restoreLastDate(){
    var lastDate = localStorage['date'];
    var year = lastDate.substr(0,4);
    var month = lastDate.substr(5,2);
    var day = lastDate.substr(8,2);
    document.getElementById('data').textContent = day + '.' + month + '.' + year;       
}