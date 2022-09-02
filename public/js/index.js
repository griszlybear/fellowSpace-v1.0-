let socket = io();

socket.on('connect', function () {
    console.log('Connected to the server.');
    
});

socket.on('disconnect', function () {
    console.log('Disconnected from the server.');
})

socket.on('newMessage', function (message) {
    console.log("newMessage", message);
});

socket.on('createStar', function (star) {
    console.log("createStar", star);
});

socket.emit('createMessage', {
    from: 'Carl',
    text: 'Hi!'
}, function (message) {
    console.log('Got it!', message);
})

document.querySelector('#submit-btn').addEventListener('click', function(e) {
    e.preventDefault();


    socket.emit("createMessage", {
        from: "User",
        text: 
        document.querySelector('#message').value
    }, function () {

    })

})
