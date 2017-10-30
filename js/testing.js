// Testing.js

(function(){

	var newTestingDiv;

function test_group(name, _callback){

	var testingDiv = document.getElementById("testingDiv");

	newTestingDiv = document.createElement("div");
	newTestingDiv.className = "row col-md-12";
	newTestingDiv.style.marginTop = "5%";
	testingDiv.appendChild(newTestingDiv);

	_callback();

	newTestingDiv.childNodes.forEach(function(currAssert){
		if (currAssert.style.backgroundColor === 'red'){
			newTestingDiv.style.backgroundColor = 'red';
		}
		else if (newTestingDiv.style.backgroundColor != 'red'){
			newTestingDiv.style.backgroundColor = 'green';
		}
	});
}

function assert(condition, message) {

	var newDiv = document.createElement("div");
	newDiv.className = "col-md-8 col-md-offset-2 border";
	newDiv.style.marginTop = '1%';
	newDiv.style.marginBottom = '1%';

	if(condition){
		newDiv.style.backgroundColor = 'green';
	}
	else {
		newDiv.style.backgroundColor = 'red';
	}

	newDiv.innerText = message;
	newTestingDiv.appendChild(newDiv);
}

test_group('new tweet publish', function() {
	assert(true, "simple successful test");
	assert(true, "simple successful test 2");
	assert(false, "simple unsuccessful test");
});

test_group('second test group', function() {
	assert(true, "simple successful test");
	assert(true, "simple successful test 2");
	assert(true, "simple successful test 3");
});


})();


