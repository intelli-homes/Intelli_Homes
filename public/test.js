const MODEL_URL = '/weights'




async function detectface() {
 await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
await faceapi.loadFaceLandmarkModel(MODEL_URL)
await faceapi.loadFaceRecognitionModel(MODEL_URL)
    console.log('1')
    const video = await faceapi.fetchImage('/images/cr3.jpg')
    console.log('12')
    console.log(video)
    detections = await faceapi.detectAllFaces(video)
    console.log('123')
    console.log(detections)
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


    


faceapi.loadSsdMobilenetv1Model(MODEL_URL)
	.then(faceapi.loadFaceLandmarkModel(MODEL_URL))
	.then(faceapi.loadFaceRecognitionModel(MODEL_URL))
	.then(function() {

		detectface().then(function (params) {
            console.log(params)
        })
	}) 