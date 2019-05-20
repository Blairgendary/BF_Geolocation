var targetLat = 49.695939;
var targetLong = -112.896976;
var deviceLat;
var deviceLong;
var videoVisible = 0;
var distanceFrom = 0.00014;
var dWidth = window.innerWidth;
var dHeight = window.innerHeight;

var geoOpt = { 
    maximumAge: 3000,
    timeout: 5000,
    enableHighAccuracy: true
}
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() { 
    navigator.geolocation.watchPosition(onSuccess, onError, geoOpt);
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
                        if (((deviceLat < targetLat + distanceFrom) && (deviceLat > targetLat - distanceFrom)) && ((deviceLong > targetLong - distanceFrom) && (deviceLong < targetLong + distanceFrom))) { 
                            element.innerHTML = "";
                            if (videoVisible == false) { 
                                video.innerHTML = '<iframe width="1920" height="1080" src="https://www.youtube.com/embed/tgbNymZ7vqY?"></iframe>';
                                //element.innerHTML = 'You have found the TARGET'; 
                                videoVisible = true;
                            }
                        } else { 
                        videoVisible = false;
                        video.innerHTML = "";
                        }
}   
    
function onError(error) { 
    aler('code: ' + error.code + '\n' + 
         'message: ' + error.message + '\n');
}


