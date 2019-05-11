const request = require('request')

const geocode = (address, callback) => {
	const url =
		"https://api.mapbox.com/geocoding/v5/mapbox.places/" +
		encodeURIComponent(address) +
		".json?access_token=pk.eyJ1IjoiaW1sZWFybmluZyIsImEiOiJjanZlcnB4dWwwNTI4NDRxbGN6NTZpMTl2In0.EZjw6jhQdm0CDjxNrGTFkA&&limit=1";

	request({ url, json: true }, (error, {body}) => {
		if (error) {
			callback("Unable to connect to location services!", undefined);
		} else if (body.features.length === 0) {
			callback("Unable to find location. Try another search", undefined);
		} else {
			const {place_name:location, center} = body.features[0]
			callback(undefined, {
				latitude: center[1],
				longitude: center[0],
				location
			});
		}
	});
};

module.exports = geocode