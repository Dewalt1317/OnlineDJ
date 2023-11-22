SendRequest("POST", "/php/test.php", "4", getTrack)
audioObj.volume = 0.01

let test = []
function textSingle(item, index) {
    let lineTime = Object.keys(item)[0]
    let songLine = textSingleData[index][lineTime]
    if (lineTime <= audioObj.currentTime + 0.1 && lineTime >= audioObj.currentTime - 0.1 && lineTime !== activeLine) {
        // textElement.classList.toggle("activeText")
        // textElement.textContent = songLine
        // activeLine = lineTime
        if (activeLine !== 0){
        activeLine.classList.toggle("activeText")
        }
        activeLine = elementText[index][0].lineTime
        TextAutoScroll(elementText[index][0].lineTime)
        activeLine.classList.toggle("activeText")


    }
}
let elementText =[]
function textOn (item, index) {
    let lineTime = Object.keys(item)[0]
    let songLine = textSingleData[index][lineTime]
    let textCreate = document.createElement("div")
    textCreate.classList.add(lineTime)
    textCreate.classList.toggle("add")
    textCreate.innerHTML = `${songLine}`
    textElement.insertAdjacentElement("beforeend",textCreate)
    let text = [{lineTime :document.querySelector(".add")}]
    elementText.push(text)
    test.push(document.querySelector(".add").addEventListener("click", ()=>{
        audioObj.currentTime = lineTime
    }))
    document.querySelector(".add").classList.toggle("add")
}

function TextAutoScroll (element) {
    element.scrollIntoView({ block: "center", behavior: "smooth" })
}