import { changeDrawing, changeFocus, changeTheme, themes, currentLocation} from './gmap.js'

export function addCallBacks() {
  // Resizable handlers
  $(".panel-left").resizable({
    handleSelector: ".splitter",
    resizeHeight: false
  });

  $('.pop-up#container').resizable({
    handles: 'n,w,nw',
    minWidth: $(window).width() / 10,
    maxWidth: $(window).width()
  });

  $('.photo-list').resizable({
    handleSelector: ".splitter",
    resizeHeight: false
  });

  // Settings panel
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

  // Dynamic loading of images

  $('.photo-list').on('scroll', function () {
    if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
      addImages(20);
    }
  });


}

var current_image_count = 1;
const image_num = 129;
const image_load_count = 20;


export function addImages(count) {
  for (var i=current_image_count; (i<(current_image_count + count)) || (i<=image_num); i++) {
      $('.photo-list').append("<div class=\"wrapper\" id=\""+i+"\" tabindex=\"" + i + "\"><img class=\"image\" src=\"assets/Real World Data/2019-04-27 Flight Test/Video 4665 1Hz/image-" + ((i<10) ? ("0" + i) : ("" + i)) + ".jpeg\" alt=\"\" id=\"" + i + "\"></div>");
  }
  current_image_count += count;

  $('.wrapper').click( (e) => {
      loadImageDetails(e.target.id);
  });
}



export function loadImageDetails(n) {
  $('.details').empty();
  var str = `<img class="large-image" src="assets/Real World Data/2019-04-27 Flight Test/Video 4665 1Hz/image-` + ((n < 10) ? ("0" + n) : ("" + n)) + `.jpeg" alt="" >
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

// import {MDCSwitch} from '@material/switch';

// Google Materials components declaration

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
        changeFocus(parseFloat(lat), parseFloat(lng));
        changeFocus(currentLocation);
    } else {
      alert("Your coordinates are invalid");
    }
    // alert( $(this).name );

});

var drawing = true;

$('.mdc-switch#drawing-mode').on('click', () => {
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
        changeTheme(themes.NIGHT);
    } else {
        changeTheme(themes.DAY);
    }
});

addImages(image_load_count);
// addCallBacks();

window.addEventListener("resize", function(event) {
  console.log(document.body.clientWidth + ' wide by ' + document.body.clientHeight+' high');
})