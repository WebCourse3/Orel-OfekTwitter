// OfekQuery.js

	class OfekQuery {

		constructor(query){

			this.query = query;
			this.result = this.queryExecution(query);
		}

		queryExecution(query){

			var returnValue;

			switch (true){
				// Class
				case (query.startsWith('.')):
					returnValue = document.getElementsByClassName(query.substring(1, query.length));

					break;
				// ID
				case (query.startsWith('#')):
					returnValue = document.getElementById(query.substring(1, query.length));

					break;
				// Hierarchical
				case (query.indexOf(' ') != -1):

					var arr = query.split(" ");
					var hierarchialList = [];
					var checkHierarchialList = [];

					var elementsArr = document.getElementsByTagName(arr[arr.length - 1]);

					for (var currIndex = arr.length - 2; currIndex >= 0 ; currIndex--){



						for (var innerIndex = 0; innerIndex < elementsArr.length; innerIndex++){

							if (currIndex == arr.length - 2) {
								if (elementsArr[innerIndex].parentElement.tagName === arr[currIndex].toUpperCase()) {
									hierarchialList.push(elementsArr[innerIndex]);
									checkHierarchialList.push(elementsArr[innerIndex].parentElement);
								}
							}
							else {
								if (elementsArr[innerIndex].parentElement.tagName != arr[currIndex].toUpperCase()) {
									// hierarchialList.remove(elementsArr[innerIndex]);
									// checkHierarchialList.remove(elementsArr[innerIndex]);
								}
								else {

									checkHierarchialList.push(elementsArr[innerIndex].parentElement);
								}
							}
						}

						elementsArr = checkHierarchialList;
						checkHierarchialList = [];
					}

					return (hierarchialList);

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