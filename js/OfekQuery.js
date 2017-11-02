// OfekQuery.js

	class OfekQuery {

		constructor(query){

			this.query = query;
			this.result = this.queryExecution(query);
		}


		hierarchicalSelect (query){

			var returnValue;

			var splittedArr = query.split(" ");
			var hierarchialList = [];
			var checkHierarchialList = [];
			var elementsToDelete = [];

			// Select the inner element by type
			if (splittedArr[splittedArr.length - 1].startsWith('.')) {
				var elementsArr = document.getElementsByClassName(splittedArr[splittedArr.length - 1].substring(1, splittedArr[splittedArr.length - 1].length));
			}
			else if (splittedArr[splittedArr.length - 1].startsWith('#')) {
				var elementsArr = document.getElementById(splittedArr[splittedArr.length - 1].substring(1, splittedArr[splittedArr.length - 1].length));
			}
			else {
				var elementsArr = document.getElementsByTagName(splittedArr[splittedArr.length - 1]);
			}

			// Run on the hierarchial array
			for (var currIndex = splittedArr.length - 2; currIndex >= 0; currIndex--) {

				// Run on all inner elements
				for (var innerIndex = 0; innerIndex < elementsArr.length; innerIndex++) {

					// The first run - fill the lists
					if (currIndex == splittedArr.length - 2) {

						var parentElementName;

						// If class
						if (splittedArr[currIndex].startsWith('.')) {
							parentElementName = elementsArr[innerIndex].parentElement.classList;

							if (parentElementName.contains(splittedArr[currIndex].substring(1, splittedArr[currIndex].length))) {
								hierarchialList.push(elementsArr[innerIndex]);
								checkHierarchialList.push(elementsArr[innerIndex].parentElement);
							}

						}
						// If ID
						else if (splittedArr[currIndex].startsWith('#')) {
							parentElementName = elementsArr[innerIndex].parentElement.id;

							if (parentElementName == splittedArr[currIndex].substring(1, splittedArr[currIndex].length)) {
								hierarchialList.push(elementsArr[innerIndex]);
								checkHierarchialList.push(elementsArr[innerIndex].parentElement);
							}
						}
						// If tagName
						else {
							parentElementName = elementsArr[innerIndex].parentElement.tagName;

							if (parentElementName === splittedArr[currIndex].toUpperCase()) {
								hierarchialList.push(elementsArr[innerIndex]);
								checkHierarchialList.push(elementsArr[innerIndex].parentElement);
							}
						}
					}
					else {

						var parentElementName;

						// Class
						if (splittedArr[currIndex].startsWith('.')) {

							parentElementName = elementsArr[innerIndex].parentElement.classList;

							if (parentElementName.contains(splittedArr[currIndex].substring(1, splittedArr[currIndex].length))) {
								checkHierarchialList.push(elementsArr[innerIndex].parentElement);
							}
							else {
								elementsToDelete.push(innerIndex);
							}
						}
						// ID
						else if (splittedArr[currIndex].startsWith('#')) {

							parentElementName = elementsArr[innerIndex].parentElement.id;

							if (parentElementName == splittedArr[currIndex].substring(1, splittedArr[currIndex].length)) {
								checkHierarchialList.push(elementsArr[innerIndex].parentElement);
							}
							else {
								elementsToDelete.push(innerIndex);
							}
						}
						// TagName
						else {

							parentElementName = elementsArr[innerIndex].parentElement.tagName;


							if (parentElementName == splittedArr[currIndex].toUpperCase()) {
								checkHierarchialList.push(elementsArr[innerIndex].parentElement);
							}
							else {
								elementsToDelete.push(innerIndex);
							}
						}
					}
				}

				// Delete the elements
				for (var deleteIndex = elementsToDelete.length - 1; deleteIndex >= 0; deleteIndex--) {
					hierarchialList.splice(elementsToDelete[deleteIndex], 1);
				}

				elementsToDelete = [];
				elementsArr = checkHierarchialList;
				checkHierarchialList = [];
			}

			return (hierarchialList);
		}

		queryExecution(query){

			var returnValue;

			switch (true){
				// Hierarchical Select
				 case (query.indexOf(' ') != -1):
					 returnValue = this.hierarchicalSelect(query);

					break;
				// Class
				case (query.startsWith('.')):
					returnValue = document.getElementsByClassName(query.substring(1, query.length));

					break;
				// ID
				case (query.startsWith('#')):
					returnValue = document.getElementById(query.substring(1, query.length));

					break;
				// Tag
				default :

					// If tag not contain class
					if (query.indexOf('.') == -1){
						returnValue = document.getElementsByTagName(query);
						console.log('Tag');
					}
					else {
						returnValue = document.getElementsByTagName(query.slice(0,query.indexOf('.')));
						var newReturnValue = [];

						// Select the tags with the class
						for (var currIndex = 0; currIndex < returnValue.length; currIndex++){
							if (returnValue[currIndex].classList.contains(query.slice(query.indexOf('.') + 1, query.length))) {
								newReturnValue.push(returnValue[currIndex]);
							}
						}

						returnValue = newReturnValue;
						console.log('Tag and class');
					}

					break;
			}

			return (returnValue);
		}

		// Add class to element
		addClass(className){

			for (var currIndex = 0; currIndex < this.result.length; currIndex++){

				this.result[currIndex].classList.add(className);

			}
		}

		// Remove class from element
		removeClass(className){

			for (var currIndex = 0; currIndex < this.result.length; currIndex++){
				this.result[currIndex].classList.remove(className);
			}
		}

		// Execute on each element
		each(_callback){

			for (var currIndex = 0; currIndex < this.result.length; currIndex++) {
				this.result[currIndex]._callback();
			}
		}

		map(_callback){

			var mapReuslt = [];

			for (var currIndex = 0; currIndex < this.result.length; currIndex++){
				mapReuslt.push(_callback(this.result[currIndex]));
			}

			return (mapReuslt);
		}

		any(_callback){

			var returnValue = false;

			for (var currIndex = 0; currIndex < this.result.length; currIndex++){

				if (_callback(this.result[currIndex])){
					returnValue = true;
				}
			}

			return (returnValue);
		}

		all(_callback){

			var returnValue = true;

			for (var currIndex = 0; currIndex < this.result.length; currIndex++){

				if (!_callback(this.result[currIndex])){
					returnValue = false;
				}
			}

			return (returnValue);

		}

		filter(_callback){

			var filterReuslt = [];

			for (var currIndex = 0; currIndex < this.result.length; currIndex++){

				if (_callback(this.result[currIndex])){
					filterReuslt.push(this.result[currIndex]);
				}
			}

			return (new OfekQuery(filterReuslt));

		}

		css(property, value){

			for (var currIndex = 0; currIndex < this.result.length; currIndex++) {
				this.result[currIndex].style.setAttribute(property, value);
			}
		}

		count(){
			return (this.result.length());
		}

		appendChild(childElement){
			this.result.appendChild(childElement);
		}

		getAttribute(attributeName){
			var attList = [];

			for (var currIndex = 0; currIndex < this.result.length; currIndex++){
				attList.push(this.result[currIndex].getAttribute(attributeName));
			}

			return (attList);
		}

		setAttribute(attributeName, attributeValue){
			for (var currIndex = 0; currIndex < this.result.length; currIndex++){
				this.result[currIndex].setAttribute(attributeName, attributeValue);
			}
		}

		get(index){
			return (this.result.indexOf(index));
		}
	}

function $(parameter){

	return (new OfekQuery(parameter));

}