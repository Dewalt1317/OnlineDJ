SendRequest("POST", "/php/test.php", "3", getTrack)

function textSingle(item, index) {
    let lineTime = Object.keys(item)[0]
    let songLine = textSingleData[index][lineTime]
    if (lineTime <= audioObj.currentTime + 0.1 && lineTime >= audioObj.currentTime - 0.1 && lineTime !== activeLine) {
        textElement.classList.toggle("activeText")
        textElement.textContent = songLine
        activeLine = lineTime
    }
}

function textOn (item, index) {
    let lineTime = Object.keys(item)[0]
    let songLine = textSingleData[index][lineTime]
    let textCreate = document.createElement("div")
    textCreate.classList.add(lineTime)
    textCreate.innerHTML = `${songLine}`
    textElement.insertAdjacentElement("beforeend",textCreate)
    return
    let {$lineTime} = document.querySelector(".${lineTime}")
}