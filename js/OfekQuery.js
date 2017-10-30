// OfekQuery.js

	class OfekQuery {

		constructor(result){
			this.result = result;
		}

		addClass(className){

			for (var currIndex = 0; currIndex < this.result.length; currIndex++){

				this.result[currIndex].classList.add(className);

			}
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

		any(_callback){

			var returnValue = false;

			for (var currIndex = 0; currIndex < this.result.length; currIndex++){

				if (_callback(this.result[currIndex])){
					returnValue = true;
				}
			}

			return (returnValue);
		}
	}


	function $(parameter){

		var returnValue;

		switch (true){
			case (parameter.startsWith('.')):
				returnValue = document.getElementsByClassName(parameter.substring(1, parameter.length));
				console.log('class');
				break;
			case (parameter.startsWith('#')):
				returnValue = document.getElementById(parameter.substring(1, parameter.length));
				console.log('ID');
				break;
			default :

				// If tag not contain class
				if (parameter.indexOf('.') == -1){
					returnValue = document.getElementsByTagName(parameter);
					console.log('Tag');
				}
				else {
					returnValue = document.getElementsByTagName(parameter.slice(0,parameter.indexOf('.')));
					var newReturnValue = [];

					// Select the tags with the class
					for (var currIndex = 0; currIndex < returnValue.length; currIndex++){
						if (returnValue[currIndex].classList.contains(parameter.slice(parameter.indexOf('.') + 1, parameter.length))) {
							newReturnValue.push(returnValue[currIndex]);
						}
					}

					returnValue = newReturnValue;
					console.log('Tag and class');
				}

				break;
		}

		return (new OfekQuery(returnValue));
	}