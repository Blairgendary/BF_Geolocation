var deviceLat;
var deviceLong;
var distanceFrom = 0.0003;
var marker = 0;

// ----------------------------------All target locations----------------------------------------
var research = {latitude:49.67771, longitude:-112.85961};
var uhall = {latitude:49.677897,longitude:-112.859061};

//-----------------------------------End of target locations--------------------------------------
var geoOpt = { 
    maximumAge: 500,
    timeout: 5000,
    enableHighAccuracy: true
}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() { 
    navigator.geolocation.getCurrentPosition(onSuccess, onError, geoOpt);
    navigator.geolocation.watchPosition(onMapWatchSuccess, onMapError, geoOpt);
}


function onSuccess(position) { 
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: '           + position.coords.latitude    + '<br / >' + 
                        'Longitude: '          + position.coords.longitude   + '<br / >' +
                        'Altitude: '           + position.coords.altitude    + '<br / >' +
                        'Accuracy: '           + position.coords.accuracy    + '<br / >' + 
                        'Direction: '          + position.coords.heading    + '<br / >';
    
                        deviceLat = position.coords.latitude;
                        deviceLong = position.coords.longitude;
                        getMap(deviceLat,deviceLong);
                        
}  

function getMap(deviceLat,deviceLong) { 
    
    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    map = new google.maps.Map(document.getElementById("map"), mapOptions);


    var latLong = new google.maps.LatLng(deviceLat, deviceLong);
    var target1 = new google.maps.LatLng(research.latitude, research.longitude);
    var target2 = new google.maps.LatLng(uhall.latitude, uhall.longitude);

    marker = new google.maps.Marker({
        position: latLong
    });
    
    var target1Marker = new google.maps.Marker({
    position: target1,
    title:"Reach this Point"
    });
    
    var target2Marker = new google.maps.Marker({
    position: target2,
    title:"Reach this Point"
    });

    marker.setMap(map);
    target1Marker.setMap(map);
    target2Marker.setMap(map);
    map.setZoom(16.5);
    map.setCenter(marker.getPosition());
    
}

var onMapWatchSuccess = function (position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: '           + position.coords.latitude    + '<br / >' + 
                        'Longitude: '          + position.coords.longitude   + '<br / >' +
                        'Altitude: '           + position.coords.altitude    + '<br / >' +
                        'Accuracy: '           + position.coords.accuracy    + '<br / >' + 
                        'Direction: '          + position.coords.heading    + '<br / >';
    
    
    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;
    
    deviceLat = updatedLatitude;
    deviceLong = updatedLongitude;
    
    zValue = position.coords.heading;
    
    var latLong = new google.maps.LatLng(updatedLatitude, updatedLongitude);
    marker.setPosition(latLong);
    
    t1UpLat = research.latitude + distanceFrom;
    t1LoLat = research.latitude - distanceFrom;
    t1UpLng = research.longitude + distanceFrom;
    t1LoLng = research.longitude - distanceFrom;
    
    t2UpLat = uhall.latitude + distanceFrom;
    t2LoLat = uhall.latitude - distanceFrom;
    t2UpLng = uhall.longitude + distanceFrom;
    t2LoLng = uhall.longitude - distanceFrom;
    
    if (deviceLat <= t1UpLat && deviceLat >= t1LoLat && deviceLong <= t1UpLng && deviceLong >= t1LoLng) {
    localStorage.clear();
    localStorage.setItem("videoID",'fnHQZJcBy9Q');
    location.href = 'pages/player.html';
    }
    if (deviceLat <= t2UpLat && deviceLat >= t2LoLat && deviceLong <= t2UpLng && deviceLong >= t2LoLng) {
    localStorage.clear();
    localStorage.setItem("videoID",'sQwMI4hkIPs');
    location.href = 'pages/player.html';
    }
}

// Error Checking
function onError(error) { 
    alert('code: ' + error.code + '\n' + 
         'message: ' + error.message + '\n');
}

function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

function watchMapPosition() {
    return navigator.geolocation.watchPosition(onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
}




