


document.addEventListener('keydown', function (event) {
    interfaceOpacityOn()
    if (event.key === " ") {
        buttonPlayPause()
    } else if (event.key === "ArrowRight") {
        audioObj.currentTime = audioObj.currentTime + 5
    } else if (event.key === "ArrowLeft") {
        audioObj.currentTime = audioObj.currentTime - 5
    } else if (event.key === "m" || event.key === "ь" || event.key === "M" || event.key === "Ь"){
        volume()
    }
})











