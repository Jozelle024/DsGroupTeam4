
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






function restoreLastDate(){
    //Recupero le informazioni dalla memoria locale
    var lastDay = localStorage['lastDay'];
    var lastMonth = localStorage['lastMonth'];
    var lastYear = localStorage['lastYear'];

    //Memorizzo data ed ora attuali nella memoria locale per un futuro riutilizzo
    var data = new Date();
    localStorage.setItem('lastDay', data.getDate());
    localStorage.setItem('lastMonth', data.getMonth());
    localStorage.setItem('lastYear', data.getFullYear());

    //Mostro l'ultimo accesso a video: ricordati di vedere il tag di Nic
    lastMonth++;
    document.getElementById('data').textContent = 'Data ultimo accesso: ' + lastDay + '.' + lastMonth + '.' + lastYear;       
}