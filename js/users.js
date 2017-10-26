
function followButtonClick(obj){

	// While 'follow' clicked
	if (obj.title == 'follow'){

		// Change the button
		obj.title = 'unfollow';
		obj.classList.remove('btn-primary');
		obj.classList.add('btn-danger');
		obj.innerText = 'Unfollow';

		// Seleced the user's div
		var selectedButtonDiv = obj.parentNode;
		var selectedUserDiv = selectedButtonDiv.parentNode;
		console.log(selectedUserDiv);

		// Change the classes
		selectedUserDiv.classList.add('row');
		selectedUserDiv.classList.add('col-md-9');
		selectedUserDiv.classList.remove('col-md-1');

		// Remove from all users and add to all followees
		var allUsersDiv = document.getElementById('showAllUsers');
		allUsersDiv.removeChild(selectedUserDiv);

		var allFolloweesDiv = document.getElementById('showAllFollowees');
		allFolloweesDiv.appendChild(selectedUserDiv);
	}
	else {
		obj.title = 'follow';
		obj.classList.add('btn-primary');
		obj.classList.remove('btn-danger');
		obj.innerText = 'Follow';

		var selectedButtonDiv = obj.parentNode;
		var selectedUserDiv = selectedButtonDiv.parentNode;
		console.log(selectedUserDiv);

		selectedUserDiv.classList.remove('row');
		selectedUserDiv.classList.remove('col-md-9');
		selectedUserDiv.classList.add('col-md-1');

		var allFolloweesDiv = document.getElementById('showAllFollowees');
		allFolloweesDiv.removeChild(selectedUserDiv);

		var allUsersDiv = document.getElementById('showAllUsers');
		allUsersDiv.appendChild(selectedUserDiv);
	}

}

function filter(filterName){

	var allUsersDiv = document.querySelectorAll("div[title='userName']");

	allUsersDiv.forEach(function(currUserDiv){

		var selecteduserNameDiv = currUserDiv.parentNode;
		var selectedUserDiv = selecteduserNameDiv.parentNode;

		if (selectedUserDiv.parentNode["id"] == "showAllUsers") {

			if (currUserDiv.innerHTML.startsWith(filterName)) {

				selectedUserDiv.style.visibility = 'visible';

				console.log(selectedUserDiv.parentNode["id"]);
			}
			else {
				selectedUserDiv.style.visibility = 'hidden';
			}
		}
	});
}
