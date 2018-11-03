const fetchJson = require('fetch-json');
const helpers = require('../helpers');

exports.displayRacePage = async(req, res) => {
	var json;
	var selectionData;
	var selection;

	function handleRaces(data) {
		json = JSON.parse(data);
	}

	function handleSelection(data) {
		if (!(data.status == 204 && data.statusText == 'No Content')) {
			selectionData = JSON.parse(data);
			if (selectionData.selection) {
				selection = selectionData.selection;
			}
		}
	}

	await fetchJson.get(helpers.apiUrl + '/Races/GetRace/' + req.params.racenumber)
		.then(handleRaces)
		.catch(console.error);

	await fetchJson.get(helpers.apiUrl + '/Users/GetRaceSelection/' + req.user.id + '/' + json.RaceNumber)
		.then(handleSelection)
		.catch(console.error);

	if (json.RaceStatus === 'Paying' || json.RaceStatus === 'Interim'){
		await fetchJson.get(helpers.apiUrl + '/Races/GetResults/' + req.params.racenumber)
			.then(handleRaces)
			.catch(console.error);
		res.render('finishedRace', { title: json.RaceName, selectionData: selectionData, data: json });
	}
	else {
		res.render('race', { title: json.RaceName, selection: selection, data: json });
	}
};
