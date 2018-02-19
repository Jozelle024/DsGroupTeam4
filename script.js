
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





//Questa funzione mi permette di andare a recuperare l'ultima data a cui ho fatto accesso
function restoreLastDate(){
    var lastDay;
    var lastMonth;
    var lastYear;
    var data = new Date();

    if(localStorage && localStorage['lastDay'] && localStorage['lastMonth'] && localStorage['lastYear']){
        //Recupero le informazioni dalla memoria locale se sono presenti
        lastDay = localStorage['lastDay'];
        lastMonth = localStorage['lastMonth'];
        lastYear = localStorage['lastYear'];
    } else {
        //In caso contrario inserisco quelle attuali
        lastDay = data.getDate();
        lastMonth = data.getMonth();
        lastYear = data.getFullYear();
    }

    //Memorizzo data ed ora attuali nella memoria locale per un futuro riutilizzo
    localStorage.setItem('lastDay', data.getDate());
    localStorage.setItem('lastMonth', data.getMonth());
    localStorage.setItem('lastYear', data.getFullYear());

    //Mostro l'ultimo accesso a video: ricordati di vedere il tag di Nic
    lastMonth++;
    document.getElementById('data').textContent = 'Data ultimo accesso: ' + lastDay + '.' + lastMonth + '.' + lastYear;       
}



//Questa funzione mi permette di andare a recuperare il nome della persona se esiste
function restoreName(){
    if(localStorage && localStorage['name']){
        document.getElementById('name').textContent = localStorage['name'];     //Ricordati di andare a vedere il nome come lo ha fatto Nic
    } else{
        localStorage['name'] = 'Giovanni';
        document.getElementById('name').textContent = 'Giovanni';
    }
}

//Funzione che mi permette di inizializzare la mia pagina: funge da funzione wrapper per le singole funzioni
function initFunction(){
    restoreName();
    restoreLastDate();
}