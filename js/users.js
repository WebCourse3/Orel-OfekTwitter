
var users = ['Orel Zluf 1', 'Orel Zluf 2',
	         'Orel Zluf 3', 'Orel Zluf 4',
			 'Orel Zluf 5', 'Orel Zluf 6',
			 'Orel Zluf 7', 'Orel Zluf 8',
			 'Orel Zluf 9', 'Orel Zluf 10'];

var followees = ['Orel Zluf 11', 'Orel Zluf 12'];

var filterUsers = [];

function Init(){
	refresh();
}

function showAllUsers(){

	var filterText = document.getElementById('filterText');

	// If Filtered
	if (filterText.value != ""){
		filter(filterText.value);

		filterUsers.forEach(function(username){
			showUser(username, "showAllUsers", "Follow");
		});

	}
	else {
		users.forEach(function (username) {
			showUser(username, "showAllUsers", "Follow");
		});
	}
}

function showAllFollowees(){

	followees.forEach(function(username){
		showUser(username, "showAllFollowees", "Unfollow");
	});
}

function showUser(username, container, status){

	var allUsersDiv = document.getElementById(container);

	// Create the user row
	var newUserDiv = document.createElement("div");
	newUserDiv.id = username;
	newUserDiv.setAttribute("name", "user")

	if (status == "Follow") {
		newUserDiv.className = "col-md-1 col-md-offset-1 text-center list-group-item top-buffer";
	}
	else{
		newUserDiv.className = "col-md-9 col-md-offset-1 text-center list-group-item top-buffer";
	}

	allUsersDiv.appendChild(newUserDiv);

	// ImageContainer
	var rowDiv = document.createElement("div");
	rowDiv.className = "row";
	newUserDiv.appendChild(rowDiv);

	// Image
	var newImage = document.createElement("img");
	newImage.src = "images/useravatar.png";
	rowDiv.appendChild(newImage);

	rowDiv = document.createElement("div");
	rowDiv.className = "row";
	newUserDiv.appendChild(rowDiv);

	// Button
	var newButton = document.createElement("button");
	newButton.addEventListener("click", function(){
		followButtonClick(this);
	});

	newButton.name = username;

	if (status == "Follow") {
		newButton.className = "btn btn-primary top-buffer";
		newButton.innerHTML = "Follow";
	}
	else{
		newButton.className = "btn btn-danger top-buffer";
		newButton.innerHTML = "Unfollow";
	}

	rowDiv.appendChild(newButton);

	// UserNameContainer
	rowDiv = document.createElement("div");
	rowDiv.className = "row";
	newUserDiv.appendChild(rowDiv);

	var userNameDiv = document.createElement("div");
	userNameDiv.className = "top-buffer";
	userNameDiv.innerHTML = username;
	rowDiv.appendChild(userNameDiv);
}

function refresh(){

	var allUsers = document.getElementsByName("user");

	// Remove all users div
	if (allUsers.length != 0){
		 for (var index = allUsers.length-1; index >= 0; index--){
		    allUsers[index].remove();
		 }
	}

	showAllUsers();
	showAllFollowees();
}

function followButtonClick(obj){

	if (obj.innerHTML == 'Follow') {

		var index = users.indexOf(obj.name);
		if(index >= 0){
			users.splice(index, 1);
			followees.push(obj.name);
		}
	}
	else {

		var index = followees.indexOf(obj.name);
		if(index >= 0){
			followees.splice(index, 1);
			users.push(obj.name);
		}
	}

	refresh();
}

function filter(filterName){

	filterUsers = [];

	users.forEach(function(currUser){

		// Fill the filter array with the relevant users
		if (currUser != null) {

			if (currUser.startsWith(filterName)) {
				filterUsers.push(currUser);
			}
		}
	});
}

Init();

