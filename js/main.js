let bodyElement = document.querySelector("body")
let audioObj = new Audio()
let videoObj = document.querySelector(".videoShot")
let playerElement = document.querySelector(".player")
let buttonPlayPauseElement = document.querySelector(".buttonPlayPause")
let buttonTextElement = document.querySelector(".buttonText")
let buttonNextTrack = document.querySelector(".buttonNextTrack")
let buttonVolumeElement = document.querySelector(".buttonVolume")
let progressBar = document.querySelector(".progressBar")
let currentTimeElement = document.querySelector(".currentTime")
let durationTimeElement = document.querySelector(".durationTime")
let trackHeaderElement = document.querySelector(".trackHeader")
let coverElement = document.querySelector(".cover")
let titleElement = document.querySelector(".title")
let artistAlbumElement = document.querySelector(".artistAlbum")
let coverMiniElement = document.querySelector(".coverMini")
let titleMiniElement = document.querySelector(".titleMini")
let artistAlbumMiniElement =document.querySelector(".artistAlbumMini")
let trackHeaderMiniElement = document.querySelector(".trackHeaderMini")
let textElement = document.querySelector(".text")
let durationTimeout = setTimeout(durationTimeF, 100)
let interfaceOpacityTimeout = setTimeout(() => {}, 0)
let currentTimeInterval = setInterval(currentTimeF, 100)
let textTimeInterval = setInterval(() => {}, 0)
let activeLine = 0
let interfaceOpacity = 1
let videoObjOpacity = 0
let textSingleData = ""
let videoObjStatus = "yes"
let textStatus = "off"
let playbackState = "pause"
let mousedown = false

bodyElement.addEventListener("mousemove",interfaceOpacityOn)
buttonPlayPauseElement.addEventListener("click", buttonPlayPause)
buttonVolumeElement.addEventListener("click", volume)
buttonTextElement.addEventListener("click", text)
progressBar.addEventListener("mousedown", () => {
    clearInterval(currentTimeInterval)
    mousedown = true
    if (playbackState === "play") {
        pause()
    }
})
progressBar.addEventListener("mousemove", () => {
    if (mousedown === true) {
        let rewind = progressBar.value
        let onePercent = audioObj.duration / 100
        let percentageOfRewind = rewind * onePercent
        let timeFormat = timeObj(percentageOfRewind)
        if (timeFormat["seconds"] < 10) {
            timeFormat["seconds"] = "0" + timeFormat["seconds"]
        }
        currentTimeElement.textContent = timeFormat["minutes"] + ":" + timeFormat["seconds"]
    }
})
progressBar.addEventListener("mouseup", () => {
    mousedown = false
    let rewind = progressBar.value
    let onePercent = audioObj.duration / 100
    let percentageOfRewind = rewind * onePercent

    audioObj.currentTime = percentageOfRewind
    currentTimeInterval = setInterval(currentTimeF, 100)

    if (playbackState === "pause") {
        play()
    }
})
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
function getTrack(data) {
    data =JSON.parse(data)
    titleElement.textContent = data["title"]
    titleMiniElement.textContent = data["title"]
    artistAlbumElement.textContent = data["musical group"] + " - " + data["album"]
    artistAlbumMiniElement.textContent = data["musical group"] + " - " + data["album"]
    coverElement.src = data["cover SRC"]
    coverMiniElement.src = data["cover SRC"]
    bodyElement.style.backgroundImage = "url(" + data["cover SRC"] + ")"
    audioObj = new Audio(data["audio SRC"])
    videoObj.src = data["video shot SRC"]
    textSingleData = JSON.parse(data["text"])
}

function buttonPlayPause() {
    if (audioObj.paused === true) {
        play()
    } else {
        pause()
    }
}

function play() {
    audioObj.play()
    if (videoObjStatus === "no"){
        console.log("No video")
    } else {
        videoObj.play()
    }
    playbackState = "play"
    buttonPlayPauseElement.src = "/src/ico/pause.svg"
    videoObjOpacityOn()
    clearTimeout(interfaceOpacityTimeout)
    interfaceOpacityTimeout = setTimeout(interfaceOpacityOff, 5000)

}

function pause() {
    audioObj.pause()
    playbackState = "pause"
    buttonPlayPauseElement.src = "/src/ico/play.svg"
    videoObjOpacityOff()
    interfaceOpacityOn()
}

function interfaceOpacityOn() {
    if (textStatus === "off") {
    trackHeaderElement.style.opacity = 1
    }
    trackHeaderMiniElement.style.opacity = 0
    playerElement.style.opacity = 1
        clearTimeout(interfaceOpacityTimeout)
        interfaceOpacityTimeout = setTimeout(interfaceOpacityOff, 5000)
}

function interfaceOpacityOff() {
    if (playbackState === "play" && videoObjStatus !== "no") {
    trackHeaderElement.style.opacity = 0
        trackHeaderMiniElement.style.opacity = 1
    playerElement.style.opacity = 0
    }
}

function videoObjOpacityOff() {
    videoObj.style.opacity = 0
}

function videoObjOpacityOn() {
    videoObj.style.opacity = 1
}

function timeObj(seconds) {

    // если время в формате mm:ss
    if (seconds <= 3599) {
        return {
            minutes: (seconds / 60) | 0, // минуты
            seconds: (seconds % 60) | 0  // секунды
        }
    }

    // если время в формате hh:mm:ss
    return {
        hours: (seconds / 3600) | 0,        // часы
        minutes: ((seconds / 60) | 0) % 60, // минуты
        seconds: (seconds % 60) | 0         // секунды
    }
}

function currentTimeF() {
    let timeFormat = timeObj(audioObj.currentTime)

    if (audioObj.currentTime === audioObj.duration && videoObj.paused !== true) {
        pause()
        textElement.textContent = ""
        activeLine = ""
    }

    if (timeFormat["seconds"] < 10) {
        timeFormat["seconds"] = "0" + timeFormat["seconds"]
    }

    currentTimeElement.textContent = timeFormat["minutes"] + ":" + timeFormat["seconds"]
    progressBarF()
}

function durationTimeF() {
    let timeFormat = timeObj(audioObj.duration)

    if (timeFormat["seconds"] < 10) {
        timeFormat["seconds"] = "0" + timeFormat["seconds"]
    }

    durationTimeElement.textContent = timeFormat["minutes"] + ":" + timeFormat["seconds"]
}

function progressBarF() {
    let onePercent = audioObj.duration / 100
    let percentageOfProgress = audioObj.currentTime / onePercent

    progressBar.value = percentageOfProgress
}


function volume () {
    if (audioObj.volume === 1) {
        audioObj.volume = 0
        buttonVolumeElement.src = "/src/ico/mute.svg"
    }
    else {
        audioObj.volume = 1
        buttonVolumeElement.src = "/src/ico/audio.svg"
    }
}

function text () {
    if (textStatus === "on") {
        textStatus = "off"
        clearInterval(textTimeInterval)
        textElement.textContent = ""
        textElement.style.zIndex = -50
        console.log("off")
        buttonTextElement.style.transform = "rotate(0deg)"
        trackHeaderElement.style.opacity = 1
    } else if (textStatus === "off") {
        textStatus = "on"
        textSingleData.forEach(textOn)
        textElement.style.zIndex = 1000
        textTimeInterval = setInterval(textSinch, 100)
        console.log("on")
        buttonTextElement.style.transform = "rotate(180deg)"
        trackHeaderElement.style.opacity = 0
    }
}

function textSinch () {
    textSingleData.forEach(textSingle)
}

