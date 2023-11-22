let bodyElement = document.querySelector("body")
let audioObj = new Audio()
let videoObj = document.querySelector(".videoShot")
let playerElement = document.querySelector(".player")
let buttonPlayPauseElement = document.querySelector(".buttonPlayPause")
let buttonTextElement = document.querySelector(".buttonText")
let buttonNextTrackElement = document.querySelector(".buttonNextTrack")
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
let interfaceOpacityTimeout = setTimeout(() => {}, 0)
let currentTimeInterval = setInterval(currentTimeF, 100)
let textTimeInterval = setInterval(() => {}, 0)
let activeLine = 0
let textSingleData = ""
let videoObjStatus = "yes"
let textStatus = "off"
let playbackState = "pause"
let playerStatus = "open"
let mousedown = false

bodyElement.addEventListener("mousemove",interfaceOpacityOn)
buttonPlayPauseElement.addEventListener("click", buttonPlayPause)
buttonVolumeElement.addEventListener("click", volume)
buttonTextElement.addEventListener("click", text)
progressBar.addEventListener("mousedown", progressBarMouse)
progressBar.addEventListener("mousemove", progressBarMouse)
progressBar.addEventListener("mouseup", progressBarMouse)

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
    if (data["video shot SRC"] === "") {
        videoObjStatus = "no"
    } else {
        videoObjStatus = "yes"
    }
}

function buttonPlayPause() {
    if (audioObj.paused === true) {
        play()
    } else {
        pause()
    }
}

function pause() {
    audioObj.pause()
    playbackState = "pause"
    buttonPlayPauseElement.src = "/src/ico/play.svg"
    videoObjOpacityOff()
    interfaceOpacityOn()
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

function progressBarMouse (event) {
    var buttonPressed = progressBar.button
    console.log(buttonPressed)
    if (event === "down") {
        clearInterval(currentTimeInterval)
        mousedown = true
        if (playbackState === "play") {
            pause()
        }
    } else if (event === "move"){}
    if (mousedown === true) {
        let rewind = progressBar.value
        let onePercent = audioObj.duration / 100
        let percentageOfRewind = rewind * onePercent
        let timeFormat = timeObj(percentageOfRewind)
        if (timeFormat["seconds"] < 10) {
            timeFormat["seconds"] = "0" + timeFormat["seconds"]
        }
        currentTimeElement.textContent = timeFormat["minutes"] + ":" + timeFormat["seconds"]
    }else if (event === "up") {
        mousedown = false
        let rewind = progressBar.value
        let onePercent = audioObj.duration / 100
        let percentageOfRewind = rewind * onePercent

        audioObj.currentTime = percentageOfRewind
        currentTimeInterval = setInterval(currentTimeF, 100)

        if (playbackState === "pause") {
            play()
        }
    }
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
        if (textStatus === "on") {
            text()
        }
    }

    if (timeFormat["seconds"] < 10) {
        timeFormat["seconds"] = "0" + timeFormat["seconds"]
    }

    currentTimeElement.textContent = timeFormat["minutes"] + ":" + timeFormat["seconds"]
    progressBarF()
    durationTimeF()
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
function interfaceOpacityOn() {
    if (playerStatus === "open"){
        if (textStatus === "off") {
            trackHeaderElement.style.opacity = 1
        }
        trackHeaderMiniElement.style.opacity = 0
        playerElement.style.opacity = 1
        if (playbackState === "play" && videoObjStatus !== "no") {
            clearTimeout(interfaceOpacityTimeout)
            interfaceOpacityTimeout = setTimeout(interfaceOpacityOff, 5000)
        }
    }
}

function interfaceOpacityOff() {
    trackHeaderElement.style.opacity = 0
    trackHeaderMiniElement.style.opacity = 1
    playerElement.style.opacity = 0
}

function videoObjOpacityOff() {
    videoObj.style.opacity = 0
}

function videoObjOpacityOn() {
    videoObj.style.opacity = 1
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
        textElement.style.zIndex = -50
        buttonTextElement.style.transform = "rotate(0deg)"
        trackHeaderElement.style.opacity = 1
        trackHeaderElement.style.zIndex = 250
        textElement.style.opacity = 0
    } else if (textStatus === "off") {
        textStatus = "on"
        if (textElement.textContent === "" ){
            textSingleData.forEach(textOn)
        }
        textTimeInterval = setInterval(textSinch, 100)
        buttonTextElement.style.transform = "rotate(180deg)"
        trackHeaderElement.style.opacity = 0
        textElement.style.opacity = 1
        trackHeaderElement.style.zIndex = -50
        textElement.style.zIndex = 250
    }
}

function textSinch () {
    textSingleData.forEach(textSingle)
}
