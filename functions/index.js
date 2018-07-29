const admin = require('firebase-admin')
const functions = require('firebase-functions');
const speech = require('@google-cloud/speech');
const gcs = require('@google-cloud/storage')();
const path = require('path');
const os = require('os');
const fs = require('fs');
const _ = require('lodash')

admin.initializeApp(functions.config().firebase)
db = admin.firestore()


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.storage.object().onFinalize((object) => {
    const fileBucket = object.bucket;
    const filePath = object.name;
    console.log(filePath);
    console.log(fileBucket);
    client = new speech.v1.SpeechClient({})
    // see api docs here: https://cloud.google.com/speech-to-text/docs/reference/libraries
    const audio = {
        uri: `gs://${fileBucket}/${filePath}`
    }
    const config = {
        enableWordTimeOffsets : true,
        encoding: 'FLAC',   
        languageCode: 'en-US',
    }
    const request = {
       config: config,
       audio: audio
    }
    return client.longRunningRecognize(request).then((data)=>{
        const operation = data[0]
        return operation.promise()
    }).then((data)=>{
        response = data[0]
        words = []
        // Convert the response to plain objects for insert into Firestore
        response.results.forEach(result => {
            result.alternatives[0].words.forEach(word => {
               var plainWord = {
                    word: word.word,
                    startTime: word.startTime.seconds.toInt()
                }
                words.push(plainWord)
            })
        })
        var record = db.collection('files').doc(filePath)
        return record.update({
            words: words,
            status:'ready'
        })
    })
    
});
