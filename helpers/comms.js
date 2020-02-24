var socket=null;

export function initialize_socketio() {
    socket = io.connect('http://127.0.0.1:5000/');

    socket.on('connect', () => {
        console.log('Socket-io connected!');
    });
    socket.on('disconnect', () => {
        alert('Disconnected to server! Try refreshing...');
    }); 
    
    
    
}




