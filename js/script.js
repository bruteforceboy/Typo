window.onload = init;

var currentWord = 0;
var marginTop = 0;
var secondsLeft = 60;
var timerStarted = false;
var correctKeystrokes = 0;
var timerVar, handler

wordList = []

const input = document.getElementById("text-input");

const words = [
	'sometimes',
	'too',
	'how',
	'three',
	'tell',
    'while',
    'by',
    'got',
    'really',
    'know',
    'example',
    'begin',
    'almost',
    'father',
    'mother',
    'make',
    'large',
    'mirror',
    'run',
    'if',    
    'it',
    'above',
    'small',
    'president',
    'thing',
    'write',
    'magnitude',
    'favor',
    'color',
    'blind',
    'paper',
    'young',
    'carry',
    'with',
    'for',
    'few',
    'quaint',
    'mug',
    'major',
    'said',
    'work',
    'appreciate',
    'check',
    'van',
    'some',
    'bell',
    'list',
    'are',
    'all',
    'our',
    'into',
    'study',
    'part'
]

function init() {
	initText();

	input.addEventListener('keypress', handler = (event) => {
		if (!timerStarted) {
			timerStarted = true;
			timerVar = setInterval(() => { 
			  timer() 
			}, 1000);
		}

		if (event.key == ' ') {
			event.preventDefault(); // prevent the white-space
			var usersWord = input.value, expectedWord = wordList[currentWord];

			if (usersWord != expectedWord) {
				document.getElementById("word" + currentWord).style = "color: red;";
			} else {
				correctKeystrokes += expectedWord.length + 1; // +1 for the space
				/*
				 	* Remember if there were uppercase letters 
				 	* They should be counted as two characters (https://en.wikipedia.org/wiki/Words_per_minute)
				 	* But since I don't have uppercase letters in 
				 	* my list of possible words I didn't bother doing that 
				 */
				document.getElementById("word" + currentWord).style = "color: green";
			}

			currentWord++;

			var previousWordY = getOffset(document.getElementById("word" + (currentWord - 1))),
					   currentWordY = getOffset(document.getElementById("word" + currentWord));
			if (currentWordY != previousWordY) {
				/*
					* Decreases the margin top if the offset of the current word 
					* doesn't match the offset of the previous word
					* basically if both words are not on the same row then 
					* it means we are at the end of the previous row and 
					* we should bring the new active row to the top
				*/
				marginTop -= 29;
				document.getElementById("text").style.marginTop = marginTop + "px"; 
			}

			input.value = '';
		}
	});
}

function timer() {
	secondsLeft--;

	document.getElementById("timer").innerHTML = "00:" + (secondsLeft < 10 ? "0" + secondsLeft : secondsLeft);

	if (secondsLeft == 0)
		finish();
}

function finish() {
	console.log(correctKeystrokes);

	var netWPM = correctKeystrokes / 5; // notice the division by 5 -> https://en.wikipedia.org/wiki/Words_per_minute
	document.getElementById("score").innerHTML = (netWPM | 0) + " <span style = \"font-size: 50px\"> WPM </span>";

	reset();
}

function getOffset(element) {
	var rect = element.getBoundingClientRect();
	return rect.top + window.scrollY; // returns the distance of an element from the top 
}

function initText() {
	for (var wordCount = 0; wordCount < 250; wordCount++) {
		const randIndex = Math.floor(Math.random() * words.length);
		$("#text").append('<span id=\'word' + wordCount + '\'>'+ words[randIndex] 
			+ ' </span>');
		wordList.push(words[randIndex]);
	}
}

function reset() {
	correctKeystrokes = 0;
	marginTop = 0;
	currentWord = 0;
	secondsLeft = 60;
	timerStarted = false;

	wordList = []

	document.getElementById("text").innerHTML = "";
	document.getElementById("timer").innerHTML = "00:60";
	document.getElementById("text").style.marginTop = marginTop + "px";

	clearInterval(timerVar);

	input.removeEventListener('keypress', handler);
	input.value = '';
	if (document.activeElement != document.body) 
		document.activeElement.blur();
	
	init();
}