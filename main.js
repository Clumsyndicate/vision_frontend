// import * as ui from "./helpers/ui.js"
// import * as soc from "./helpers/comms.js"
// import * as gmaps from "./helpers/g_materials.js"
import { addCallBacks } from './helpers/ui.js'

var current_image_count = 1;

addCallBacks();



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
