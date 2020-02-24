var map;
var drawingManager;

// Add initalizer callback from Google API
google.maps.event.addDomListener(window, 'load', initMap);
export var currentLocation = {lat: 34.0689, lng: -118.4452};


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: currentLocation,
        zoom: 16
    });
    console.log(map);
    
    drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
        },
        markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
        circleOptions: {
        fillColor: '#ffff00',
        fillOpacity: 1,
        strokeWeight: 5,
        clickable: false,
        editable: true,
        zIndex: 1
        }
    });
    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
        console.log(event.type);
        if (event.type == 'circle') {
            var radius = event.overlay.getRadius();
        } else if (event.type == 'marker') {
            console.log(event.overlay.position.lat() + "  " + event.overlay.position.lng() );
        }
      });
}


export function changeDrawing(hide) {
    if (hide) {
        drawingManager.setOptions({
            drawingControl: false
          });
    } else {
        drawingManager.setOptions({
            drawingControl: true
          });
    }
}

export const themes = {
    DAY: 'day',
    NIGHT: 'night'
}

export function changeTheme(theme) {
    console.log(map);
    switch (theme) {
        case themes.NIGHT:
        console.log("set options");
        map.setOptions({styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
            },
            {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
            },
            {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
            },
            {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
            },
            {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
            },
            {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
            },
            {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
            },
            {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
            },
            {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
            },
            {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
            },
            {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
            },
            {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
            },
            {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
            },
            {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
            },
            {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
            }
        ]});
        break;
        case themes.DAY:
        map.setOptions({styles: []});
        break;
    }
}




export function changeFocus(lat=currentLocation.lat, lng=currentLocation.lng, zoom=map.zoom) {
    currentLocation = {lat: lat, lng: lng};
    var position = new google.maps.LatLng(lat, lng);
    map.setCenter(position);
    map.setZoom(zoom);
}

var pieceOfShit;
