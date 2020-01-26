
$('.pop-up').resizable({
    handles: 'n,w,s,e',
    minWidth: $( window ).width() / 10,
    maxWidth: $( window ).width()
});

$('.settings-content').hide();

$('.cog-background i').on('click', () => {
    if ($('.settings').hasClass('closed')) {
        $('.settings').removeClass('closed');
        $('.cog-background').removeClass('expand');
        $('.settings-content').hide();
    } else {
        $('.settings').addClass('closed');
        $('.cog-background').addClass('expand');
        $('.settings-content').show();
    }
});

// import {MDCSwitch} from '@material/switch';

const switchControl = new mdc.switchControl.MDCSwitch(document.querySelector('.mdc-switch'));
const textField1 = new mdc.textField.MDCTextField(document.querySelector('.mdc-text-field#LAT'));
const textField2 = new mdc.textField.MDCTextField(document.querySelector('.mdc-text-field#LNG'));

$('#night-switch').on('change', () => {
    if ($('#night-switch').is(':checked')) {
        changeTheme(true);
    } else {
        changeTheme(false);
    }
});

var map;
var drawingManager;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 34.0689, lng: -118.4452},
        zoom: 16
    });
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
        }
      });
}

function changeTheme(isNight) {
    if (isNight) {
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
    } else { 
        map.setOptions({styles: []});
    }
}




function changeFocus(lat, lng, zoom=map.zoom) {
    var position = new google.maps.LatLng(lat, lng);
    map.setCenter(position);
    map.setZoom(zoom);
}






/*
var socket = io.connect('http://127.0.0.1:5000/');

socket.on('connect', () => {
    socket.emit('success', {data: 'Connected!'});
});

socket.on('disconnect', () => {
    alert('Disconnected to server! Try refreshing...');
}); 

function getPhotoStream(wayPoint) {

}
*/  
