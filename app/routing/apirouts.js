var peeps = require("../data/peeps.js");
var apirouter = express.Router();
var bodyParser = require("body-parser");
var express = require("express");

apirouter.get("/api/peeps", function(req,res){
	res.json(peeps);
})
apirouter.post("/api/peeps", function(req, res){
	console.log("posting...");
	var newPeep = req.body;
	console.log(newPeep);
	var newScore = function(array){
		var newScore = [];
		for (var i = 0; i < array.length; i++) {
			newScore.push(parseInt(array[i]));
		}
		return newScore;
	}

    var totalDiff = function(arrA, arrB){
		delta = 0;
		for(var i=0; i<arrA.length; i++){
			delta += Math.abs(arrA[i] - arrB[i]);
		}
		return delta;
	}
	function indexOfMin(array) {
    	if (array.length === 0) {
        	return -1;
    	}

    	var min = array[0];
    	var minIndex = 0;

    	for (var i = 1; i < array.length; i++) {
        	if (array[i] < min) {
            	minIndex = i;
            	min = array[i];
        	}
    	}

    	return minIndex;
	}

	var newPeepScore = newScore(newPeep['scores[]']); 
	var currentPeepScores = []; 
	var differences = [];
	for(var i=0; i<peeps.length;i++){
		currentPeepScores.push(newScore(peeps[i]['scores[]']));
	}

	for (var i=0; i<currentPeepScores.length; i++){
		differences.push(totalDiff(newPeepScore, currentPeepScores[i]));
	}
	console.log("calculating...");

	var minPeep = indexOfMin(differences);
	var matchPeep = peeps[minPeep];
	console.log("matching...");
	console.log(matchPeep);
	
peeps.push(newPeep);
res.json(matchPeep);
})

module.exports = apirouter;

