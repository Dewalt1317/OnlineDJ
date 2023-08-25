let bodyElement = document.querySelector("body")
let audioObj = new Audio()
let videoObj = document.querySelector(".videoShot")
let playerElement = document.querySelector(".player")
let buttonPlayPauseElement = document.querySelector(".buttonPlayPause")
let buttonNextTrack = document.querySelector(".buttonNextTrack")
let buttonVolumeElement = document.querySelector(".buttonVolume")
let progressBar = document.querySelector(".progressBar")
let currentTimeElement = document.querySelector(".currentTime")
let durationTimeElement = document.querySelector(".durationTime")
let trackHeaderElement = document.querySelector(".trackHeader")
let coverElement = document.querySelector(".cover")
let titleElement = document.querySelector(".title")
let artistAlbumElement = document.querySelector(".artistAlbum")
let textElement = document.querySelector(".text")
let durationTimeout = setTimeout(durationTimeF, 100)
let interfaceOpacityTimeout = setTimeout(() => {}, 0)
let currentTimeInterval = setInterval(currentTimeF, 100)
let activeLine = 0
let interfaceOpacity = 1
let videoObjOpacity = 0
let textSingleData = ""
let videoObjStatus = "No"
let playbackState = "pause"
let mousedown = false

bodyElement.addEventListener("mousemove",interfaceOpacityOn)
buttonPlayPauseElement.addEventListener("click", buttonPlayPause)
buttonVolumeElement.addEventListener("click", volume)
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
        textSingleData.forEach(textSingle)
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
    clearTimeout(interfaceHidenTimeout)
    interfaceHidenTimeout = setTimeout(interfaceOpacityOff, 5000)
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
    artistAlbumElement.textContent = data["musical group"] + " - " + data["album"]
    coverElement.src = data["cover SRC"]
    bodyElement.style.backgroundImage = "url(" + data["cover SRC"] + ")"
    audioObj = new Audio(data["audio SRC"])
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
    if (videoObjStatus === "No"){
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
    trackHeaderElement.style.opacity = 1
    playerElement.style.opacity = 1
    if (playbackState === "play" && videoObjStatus !== "No") {
        clearTimeout(interfaceOpacityTimeout)
        interfaceOpacityTimeout = setTimeout(interfaceOpacityOff, 5000)
    }
}

function interfaceOpacityOff() {
    trackHeaderElement.style.opacity = 0
    playerElement.style.opacity = 0
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

    if (audioObj.currentTime === audioObj.duration && videoObj.paused != true) {
        pause()
        textElement.textContent = ""
        activeLine = ""
    }

    if (timeFormat["seconds"] < 10) {
        timeFormat["seconds"] = "0" + timeFormat["seconds"]
    }

    currentTimeElement.textContent = timeFormat["minutes"] + ":" + timeFormat["seconds"]
    progressBarF()
    // textSingle.forEach(textSingleF)
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
function textSingle(item, index) {
    let lineTime = Object.keys(item)[0]
    let songLine = textSingleData[index][lineTime]
    if (lineTime <= audioObj.currentTime + 0.1 && lineTime >= audioObj.currentTime - 0.1 && lineTime != activeLine) {
        textElement.classList.toggle("text")
        textElement.textContent = songLine
        activeLine = lineTime
    }
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