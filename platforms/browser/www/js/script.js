var deviceLat;
var deviceLong;
var R = Math.pow(6367,3);
var distanceFrom = 0.0003;
var latLong;
var marker = 0;
var targets = [];
var targetsMarkers = [];
var videoReady = false;
var latUrl = "https://sheets.googleapis.com/v4/spreadsheets/1KhDmsypOJHUxTTQ7cmeX9H8IuLs7eccFxa2HYuG8wBo/values/Loc!B2:B?key=AIzaSyBc9ttoVtKdarz1FQ8KgnGjhlVmSLx5GSY";
var lonUrl = "https://sheets.googleapis.com/v4/spreadsheets/1KhDmsypOJHUxTTQ7cmeX9H8IuLs7eccFxa2HYuG8wBo/values/Loc!C2:C?key=AIzaSyBc9ttoVtKdarz1FQ8KgnGjhlVmSLx5GSY";
var vidUrl = "https://sheets.googleapis.com/v4/spreadsheets/1KhDmsypOJHUxTTQ7cmeX9H8IuLs7eccFxa2HYuG8wBo/values/Loc!D2:D?key=AIzaSyBc9ttoVtKdarz1FQ8KgnGjhlVmSLx5GSY";

var latData;
var lonData;
var vidData;

var latitudes = [];
var longitudes = [];
var videoUrls = [];

// ----------------------------------RETRIEVE ALL LATITUDES---------------------------------------- 
var xhr = new XMLHttpRequest();
var xhr2 = new XMLHttpRequest();
var xhr3 = new XMLHttpRequest();

xhr.onreadystatechange = function() { 
    if (this.readyState == 4 & this.status == 200) {
        latData = jQuery.parseJSON(xhr.responseText);
        for(var i = 0; i < latData.values.length; i++) {
        latitudes[i] = parseFloat(latData.values[i]);
        console.log(latitudes[i]);
        }  
    }
};
xhr.open('GET', latUrl);
xhr.send();

// ----------------------------------RETRIEVE ALL LONGITUDES----------------------------------------  
xhr2.onreadystatechange = function() { 
    if (this.readyState == 4 & this.status == 200) {
        lonData = jQuery.parseJSON(xhr2.responseText);
        for(var i = 0; i < lonData.values.length; i++) {
        longitudes[i] = parseFloat(lonData.values[i]);
        console.log(longitudes[i]);
        }
    }
};
xhr2.open('GET', lonUrl);
xhr2.send();

// ----------------------------------RETRIEVE ALL VIDEO LINKS----------------------------------------
xhr3.onreadystatechange = function() { 
    if (this.readyState == 4 & this.status == 200) {
        vidData = jQuery.parseJSON(xhr3.responseText);
        for(var i = 0; i < vidData.values.length; i++) {
        videoUrls[i] = vidData.values[i];
        console.log(videoUrls[i]);
        }
    }
};
xhr3.open('GET', vidUrl);
xhr3.send();

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

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

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
                        //research.latitude = deviceLat;
                        //research.longitude = deviceLong;
                        getMap(deviceLat,deviceLong);
                        
}  

function getMap(deviceLat,deviceLong) { 
    
    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    map = new google.maps.Map(document.getElementById("map"), mapOptions);


    latLong = new google.maps.LatLng(deviceLat, deviceLong);
    
    marker = new google.maps.Marker({
        position: latLong,
        map: map
    });
    
    for(var i = 0; i < latitudes.length; i++) { 
    targets[i] = new google.maps.LatLng(latitudes[i],longitudes[i]);
    }
    
    for(var i = 0; i < latitudes.length; i++) { 
        targetsMarkers[i] = new google.maps.Marker({
        position: targets[i],
        map: map
        });
    }

    marker.setMap(map);
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
    
    var dlat = Math.radians(latitudes[0] - deviceLat);
    var dlon = Math.radians(longitudes[0] - deviceLong);
    var a = Math.sin(dlat/2) * Math.sin(dlat/2) + Math.radians(Math.cos(deviceLat)) * Math.radians(Math.cos(latitudes[0])) * Math.sin(dlon/2) * Math.sin(dlon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    console.log(d);
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




