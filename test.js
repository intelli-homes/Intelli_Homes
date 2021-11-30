module.exports = function test() {
    
// const canvas = require('canvas')
const faceapi = require('face-api.js')





async function detectface() {
    console.log('1')
    const video = await faceapi.fetchImage('/images/cam1.jpg')
    console.log('12')
    detections = await faceapi.detectAllFaces(video)
    console.log('123')
    return detections 
}
function df() {
    return detectface(video)
}

async function detecthighconfidface(video) {
    const detection = await faceapi.detectSingleFace(video)
    return detection
}

function dhcf() {
    return detecthighconfidface(video)
}

return {detectface,
        df,
        detecthighconfidface,
        dhcf}
    
}