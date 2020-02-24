var currentLocation = {lat: 34.0689, lng: -118.4452};
const image_load_count = 20;
var current_image_count = 1;
const image_num = 129;
addImages(40);


$('.photo-list').on('scroll', function() {
    if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        addImages(20);
    }
});

function loadImageDetails(n) {
    $('.details').empty();
    var str = `<img class="large-image" src="assets/Real World Data/2019-04-27 Flight Test/Video 4665 1Hz/image-` + ((n<10) ? ("0" + n) : ("" + n)) + `.jpeg" alt="" >
    <p>Latitude: 1000</p>
    <p>Longitude: 1000</p>
    <div class="mdc-text-field" id="shape">
      <input type="text" id="my-text-field" class="mdc-text-field__input">
      <label class="mdc-floating-label" for="my-text-field">Shape</label>
      <div class="mdc-line-ripple"></div>
    </div>
    <div class="mdc-text-field" id="color">
      <input type="text" id="my-text-field" class="mdc-text-field__input">
      <label class="mdc-floating-label" for="my-text-field">Color</label>
      <div class="mdc-line-ripple"></div>
    </div>
    <button class="mdc-button" id="save">
      <div class="mdc-button__ripple"></div>
      <span class="mdc-button__label">Save</span>
    </button>`
    $('.details').append(str);
    const textFieldShape = new mdc.textField.MDCTextField(document.querySelector('.mdc-text-field#shape'));
    const textFieldColor = new mdc.textField.MDCTextField(document.querySelector('.mdc-text-field#color'));
}

$(".panel-left").resizable({
    handleSelector: ".splitter",
    resizeHeight: false
  });

$('.pop-up#container').resizable({
    handles: 'n,w,nw',
    minWidth: $( window ).width() / 10,
    maxWidth: $( window ).width()
});

$('.photo-list').resizable({
    handleSelector: ".splitter",
    resizeHeight: false
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
    $(this).toggleClass('rotate');

});

// import {MDCSwitch} from '@material/switch';

const switchControl = new mdc.switchControl.MDCSwitch(document.querySelector('.mdc-switch#night-mode'));
const textField1 = new mdc.textField.MDCTextField(document.querySelector('.mdc-text-field#LAT'));
const textField2 = new mdc.textField.MDCTextField(document.querySelector('.mdc-text-field#LNG'));
const coordinateButton = new mdc.ripple.MDCRipple(document.querySelector('.mdc-button#coordinate'));
const saveButton = new mdc.ripple.MDCRipple(document.querySelector('.mdc-button#save'));
const switchControl1 = new mdc.switchControl.MDCSwitch(document.querySelector('.mdc-switch#drawing-mode'));
var textFieldShape = new mdc.textField.MDCTextField(document.querySelector('.mdc-text-field#shape'));
var textFieldColor = new mdc.textField.MDCTextField(document.querySelector('.mdc-text-field#color'));


$('.mdc-button#coordinate').on('click', () => {
    var lat = $('.mdc-text-field#LAT input').val();
    var lng = $('.mdc-text-field#LNG input').val();
    if ((parseFloat(lat)) && (parseFloat(lng))) {
        currentLocation = {lat: parseFloat(lat), lng: parseFloat(lng)};
        changeFocus(currentLocation);
    }
    // alert( $(this).name );

});

var drawing = true;

$('.mdc-button#drawing-mode').on('click', () => {
    console.log($(this));
    if (drawing) {
        drawing = false;
        changeDrawing(drawing);
    } else {
        drawing = true;
        changeDrawing(drawing);
    }
});

$('.mdc-text-field#LAT input').val(currentLocation.lat);
$('.mdc-text-field#LNG input').val(currentLocation.lng);

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
        center: currentLocation,
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
        } else if (event.type == 'marker') {
            console.log(event.overlay.position.lat() + "  " + event.overlay.position.lng() );
        }
      });
}


function changeDrawing(hide) {
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

var pieceOfShit;
function addImages(count) {
    for (i=current_image_count; (i<(current_image_count + count)) || (i<=image_num); i++) {
        $('.photo-list').append("<div class=\"wrapper\" id=\""+i+"\" tabindex=\"" + i + "\"><img class=\"image\" src=\"assets/Real World Data/2019-04-27 Flight Test/Video 4665 1Hz/image-" + ((i<10) ? ("0" + i) : ("" + i)) + ".jpeg\" alt=\"\" id=\"" + i + "\"></div>");
    }
    current_image_count += count;

    $('.wrapper').click( (e) => {
        loadImageDetails(e.target.id);
    });
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

function random(x1, x2) {
    var diff = x2 - x1;
    return x1 + diff * Math.random();
}
