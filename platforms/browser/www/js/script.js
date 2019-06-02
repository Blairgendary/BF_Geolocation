var targetLat = 49.695491;
var targetLong = -112.897221;
var deviceLat;
var deviceLong;
var distanceFrom = 0.00025;
var marker = 0;

var geoOpt = { 
    maximumAge: 1000,
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
                        'Target Latitude: '    + targetLat                  + '<br / >' +
                        'Target Longitude: '   + targetLong                 + '<br / >' ;
    
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
    var tlatLong = new google.maps.LatLng(targetLat, targetLong);

    marker = new google.maps.Marker({
        position: latLong,
        icon: 'http://earth.google.com/images/kml-icons/track-directional/track-0.png'
    });
    
    var targetMarker = new google.maps.Marker({
    position: tlatLong,
    title:"Reach this Point"
    });

    marker.setMap(map);
    targetMarker.setMap(map);
    map.setZoom(16.5);
    map.setCenter(marker.getPosition());
    
}

var onMapWatchSuccess = function (position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: '           + position.coords.latitude    + '<br / >' + 
                        'Longitude: '          + position.coords.longitude   + '<br / >' +
                        'Altitude: '           + position.coords.altitude    + '<br / >' +
                        'Accuracy: '           + position.coords.accuracy    + '<br / >' + 
                        'Target Latitude: '    + targetLat                  + '<br / >' +
                        'Target Longitude: '   + targetLong                 + '<br / >' ;
    
    
    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;
    deviceLat = updatedLatitude;
    deviceLong = updatedLongitude;
    var latLong = new google.maps.LatLng(updatedLatitude, updatedLongitude);
    marker.setPosition(latLong);
    
    var upperBoundLat = targetLat + distanceFrom;
    var lowerBoundLat = targetLat - distanceFrom;
    var upperBoundLong = targetLong + distanceFrom;
    var lowerBoundLong = targetLong - distanceFrom;
    
    if ((deviceLat > lowerBoundLat) && (deviceLat < upperBoundLat) && (deviceLong > lowerBoundLong) && (deviceLong < upperBoundLong)) { 
    location.href = 'pages/player.html'
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





