var targetLat = 49.695764;
var targetLong = -112.895013;
var deviceLat;
var deviceLong;
var videoVisible = 0;
var distanceFrom = 0.00014;

var geoOpt = { 
    maximumAge: 1000,
    timeout: 5000,
    enableHighAccuracy: true
}

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() { 
    navigator.geolocation.getCurrentPosition(onSuccess, onError, geoOpt);
}

function onSuccess(postion) { 
    var element = document.getElementById('geolocation');
    var video = document.getElementById('videoPlayer');
    element.innerHTML = 'Latitude: '           + postion.coords.latitude    + '<br / >' + 
                        'Longitude: '          + postion.coords.longitude   + '<br / >' +
                        'Altitude: '           + postion.coords.altitude    + '<br / >' +
                        'Accuracy: '           + postion.coords.accuracy    + '<br / >' + 
                        'Target Latitude: '    + targetLat                  + '<br / >' +
                        'Target Longitude: '   + targetLong                 + '<br / >';
    
                        deviceLat = postion.coords.latitude;
                        deviceLong = postion.coords.longitude;
                        //targetLat = deviceLat;
                        //targetLong = deviceLong;
                        getMap(deviceLat,deviceLong);
    
    
                        if (((deviceLat < targetLat + distanceFrom) && (deviceLat > targetLat - distanceFrom)) && ((deviceLong > targetLong - distanceFrom) && (deviceLong < targetLong + distanceFrom))) { 
                            element.innerHTML = "";
                            if (videoVisible == false) { 
                                document.location.href = 'pages/player.html';
                                //element.innerHTML = 'You have found the TARGET'; 
                                videoVisible = true;
                            }
                        } else { 
                        videoVisible = false;
                        video.innerHTML = "";
                        }
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

    var marker = new google.maps.Marker({
        position: latLong
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

    var updatedLatitude = position.coords.latitude;
    var updatedLongitude = position.coords.longitude;

    if (updatedLatitude != deviceLat && updatedLongitude != deviceLong) {

        deviceLat = updatedLatitude;
        deviceLong= updatedLongitude;

        getMap(updatedLatitude, updatedLongitude);
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



