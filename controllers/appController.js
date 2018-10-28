const fetchJson = require('fetch-json');
const helpers = require('../helpers');

exports.displayHomePage = (req, res) => {
	res.render('layout', { title: 'Pony Pool'});
};

exports.displayLadder = async (req, res) => {

	// FIXME: Unhandled promise rejection
	function handleData(data) {
		var json = JSON.parse(data);
		res.render('ladder', { title: 'Ladder', json });
	}

	fetchJson.get(helpers.apiUrl + '/Users/GetLadderInfo')
		.then(handleData)
		.catch(console.error);
};

exports.updateUserStandings = async (req, res, next) => {
	if(req.user)
	{
		await fetchJson.get(helpers.apiUrl + '/Users/GetUserPosition/' + req.user.id)
			.then(handleData)
			.catch(console.error);
	}
	next();

	// FIXME: Unhandled promise rejection
	function handleData(data) {
		var json = JSON.parse(data);
		req.user.place = json.place;
		req.user.participants = json.participants;
		req.user.winnings = json.winnings;
	}
};
