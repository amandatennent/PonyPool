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

function makeSelection(userID, runnerID) {
	showMessage('info', 'Saving selection...');
	var request = new XMLHttpRequest();
	request.open('GET', 'https://ponypoolapi20181105054929.azurewebsites.net/api/Selections/MakeSelection/' + userID + '/' + runnerID, true);
	request.onload = function () {
		var data = JSON.parse(this.response);

		if (data.UpdateStatus) {
			var elements = document.querySelectorAll('.selected');
			[].forEach.call(elements, function (element) {
				element.classList.remove('selected');
			});

			document.getElementById(runnerID).classList.add('selected');

			showMessage('success', 'Selection was successful');
		}
		else {
			showMessage('error', 'Selection was not successful');
		}
	};
	request.send();
}

function showMessage(type, message) {
	document.getElementById('message').outerHTML = '';

	var element = document.getElementById('custom_flash');
	element.classList.remove('flash--success');
	element.classList.remove('flash--error');
	element.classList.remove('flash--info');
	element.style.display = 'flex';

	if (type == 'error')
		element.classList.add('flash--error');
	else if(type == 'success')
		element.classList.add('flash--success');
	else
		element.classList.add('flash--info');

	var node = document.createElement('p');
	node.setAttribute('id', 'message');

	var textnode = document.createTextNode(message);
	node.appendChild(textnode);

	document.getElementById('custom_flash').insertBefore(node, document.getElementById('custom_flash').firstChild);
}
