const MODEL_URL = '/weights'




async function detectface() {
//  await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
// await faceapi.loadFaceLandmarkModel(MODEL_URL)
// await faceapi.loadFaceRecognitionModel(MODEL_URL)
    console.log('1')
    const video = await faceapi.fetchImage('/images/cam2.jpg')
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


    


faceapi.loadSsdMobilenetv1Model(MODEL_URL)
	.then(faceapi.loadFaceLandmarkModel(MODEL_URL))
	.then(faceapi.loadFaceRecognitionModel(MODEL_URL))
	.then(function() {

		detectface().then(function (params) {
            console.log(params)
        })
	}) 