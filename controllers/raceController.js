const fetchJson = require('fetch-json');
const helpers = require('../helpers');

exports.displayRacePage = async(req, res) => {
	var json;
	var selection;

	function handleRaces(data) {
		json = JSON.parse(data);
	}

	function handleSelection(data) {
		var selectionData = JSON.parse(data);
		selection = selectionData.selection;
	}

	await fetchJson.get(helpers.apiUrl + '/Races/' + req.params.racenumber)
		.then(handleRaces)
		.catch(console.error);

	await fetchJson.get(helpers.apiUrl + '/Users/GetRaceSelection/' + req.user.id + '/' + json.RaceNumber)
		.then(handleSelection)
		.catch(console.error);

	res.render('race', { title: json.RaceName, selection: selection, data: json });
};
