


function followButtonClick(obj){

	if (obj.title == 'follow'){

		obj.title = 'unfollow';
		obj.classList.remove('btn-primary');
		obj.classList.add('btn-danger');
		obj.innerText = 'Unfollow';

	}
	else {
		obj.title = 'follow';
		obj.classList.add('btn-primary');
		obj.classList.remove('btn-danger');
		obj.innerText = 'Follow';
	}

}