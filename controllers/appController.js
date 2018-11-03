const fetchJson = require('fetch-json');
const helpers = require('../helpers');

exports.displayHomePage = (req, res) => {
	// FIXME: Unhandled promise rejection
	var meetingName = '';

	function handleMeetingName(data) {
		if (!(data.status == 204 && data.statusText == 'No Content')) {
			var json = JSON.parse(data);
			meetingName = toTitleCase(json.MeetingName) + ' Races';
		}
	}

	function handleRaces(data) {
		if (data.status == 204 && data.statusText == 'No Content') {
			res.render('layout', {title: 'No Meeting Selected'});
		}
		else {
			var json = JSON.parse(data);
			res.render('meeting', { title: meetingName, meeting_name: meetingName, data: json });
		}
	}

	fetchJson.get(helpers.apiUrl + '/Meetings/GetFeaturedMeeting')
		.then(handleMeetingName)
		.catch(console.error);

	fetchJson.get(helpers.apiUrl + '/Races/GetRaces')
		.then(handleRaces)
		.catch(console.error);

	function toTitleCase(str) {
		return str.replace(
			/\w\S*/g,
			function(txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			}
		);
	}
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
		if (!(data.status == 204 && data.statusText == 'No Content')) {
			var json = JSON.parse(data);
			req.user.place = json.place;
			req.user.participants = json.participants;
			req.user.winnings = json.winnings;
		}
	}
};
