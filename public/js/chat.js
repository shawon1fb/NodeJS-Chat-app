const socket = io()
socket.on('countUpdated', (count) => {
    console.log("count has been updated " + count.toString())

})
socket.on('message', (message) => {
    console.log(message.toString())

})


document.querySelector('#increment').addEventListener(
    'click', () => {
        console.log("clicked")
        socket.emit('increment')
    }
)

document.querySelector('#send-location').addEventListener(
    'click', () => {
        if (!navigator.geolocation) {
            return alert('GeoLocation is not supported by your browser.')
        }
        navigator.geolocation.getCurrentPosition((position) => {

            socket.emit('sendLocation', {
                'latitude': position.coords.latitude,
                'longitude': position.coords.longitude

            })

        })
    }
)