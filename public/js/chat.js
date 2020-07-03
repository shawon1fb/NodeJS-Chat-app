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