Element.prototype.remove = function() {
	this.parentElement.removeChild(this);
};

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
	for(var i = this.length - 1; i >= 0; i--) {
		if(this[i] && this[i].parentElement) {
			this[i].parentElement.removeChild(this[i]);
		}
	}
};

function closeFlashMessage() {
	document.getElementsByClassName('flash').remove();
}

function makeSelection(userID, runnerID) {
	var request = new XMLHttpRequest();
	request.open('GET', 'http://localhost:5000/api/Selections/MakeSelection/' + userID + '/' + runnerID, true);
	request.onload = function () {
		var data = JSON.parse(this.response);

		if (data.UpdateStatus) {
			var elements = document.querySelectorAll('.selected');
			[].forEach.call(elements, function (element) {
				element.classList.remove('selected');
			});

			document.getElementById(runnerID).classList.add('selected');

			showSuccessMessage();
		}
		else
			showErrorMessage();
	};

	request.send();
}

function showErrorMessage() {
	document.getElementById('message').outerHTML = '';

	var element = document.getElementById('custom_flash');
	element.classList.remove('flash--success');
	element.classList.add('flash--error');
	element.style.display = 'flex';

	var node = document.createElement('p');
	node.setAttribute('id', 'message');

	var textnode = document.createTextNode('Selection was not successful');
	node.appendChild(textnode);

	document.getElementById('custom_flash').insertBefore(node, document.getElementById('custom_flash').firstChild);

	setTimeout(function()
	{
		document.getElementById('custom_flash').style.display = 'none';
	}, 5000);
}

function showSuccessMessage() {
	document.getElementById('message').outerHTML = '';

	var element = document.getElementById('custom_flash');
	element.classList.remove('flash--error');
	element.classList.add('flash--success');
	element.style.display = 'flex';

	var node = document.createElement('p');
	node.setAttribute('id', 'message');

	var textnode = document.createTextNode('Selection was successful');
	node.appendChild(textnode);

	document.getElementById('custom_flash').insertBefore(node, document.getElementById('custom_flash').firstChild);

	setTimeout(function()
	{
		document.getElementById('custom_flash').style.display = 'none';
	}, 5000);
}
