"use strict";
exports.__esModule = true;
// Imports the Google Cloud Video Intelligence library
var videoIntelligence = require('@google-cloud/video-intelligence');
// Creates a client
var client = new videoIntelligence.VideoIntelligenceServiceClient();
// The GCS uri of the video to analyze
var gcsUri = 'gs://cloud-samples-data/video/cat.mp4';
// Construct request
var request = {
    inputUri: gcsUri,
    features: ['LABEL_DETECTION']
};
// Execute request
var operation = client.annotateVideo(request)[0];
console.log('Waiting for operation to complete... (this may take a few minutes)');
var operationResult = operation.promise()[0];
// Gets annotations for video
var annotations = operationResult.annotationResults[0];
// Gets labels for video from its annotations
var labels = annotations.segmentLabelAnnotations;
labels.forEach(function (label) {
    console.log("Label " + label.entity.description + " occurs at:");
    label.segments.forEach(function (segment) {
        segment = segment.segment;
        console.log("\tStart: " + segment.startTimeOffset.seconds +
            ("." + (segment.startTimeOffset.nanos / 1e6).toFixed(0) + "s"));
        console.log("\tEnd: " + segment.endTimeOffset.seconds + "." +
            ((segment.endTimeOffset.nanos / 1e6).toFixed(0) + "s"));
    });
});
