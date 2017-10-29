// Testing.js

(function(){



function test_group(name, _callback){

	// Main testing Div
	var testingDiv = document.getElementById("testingDiv");

	// New Testing Div
	var newTestingDiv = document.createElement("div");
	newTestingDiv.className = "row col-md-12";
	newTestingDiv.style.backgroundColor = 'green';
	testingDiv.appendChild(newTestingDiv);

	_callback();


	//testingDiv.style.backgroundColor = 'red';

	var newUL = document.createElement("div");
	newTestingDiv.appendChild(newUL);

	var newDiv = document.createElement("div");
	newDiv.style.backgroundColor = 'red';
	newDiv.innerText = "blabla";
	newUL.appendChild(newDiv);

	var newDiv = document.createElement("div");
	newDiv.innerText = "blabla";
	newUL.appendChild(newDiv);

	var newDiv = document.createElement("div");
	newDiv.innerText = "blabla";
	newUL.appendChild(newDiv);


}

function assert(condition, message) {

	if(condition){
		
	}

}

test_group('new tweet publish', function() {
	assert(true, "simple successful test");
	assert(true, "simple successful test 2");
	assert(false, "simple unsuccessful test");
});


})();


