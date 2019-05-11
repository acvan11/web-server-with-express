const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const url = "https://api.darksky.net/forecast/675deefcf6a6e9267bfffb9034447ff7/" + 
			latitude + ',' + longitude

	request({ url, json: true }, (error, {body}) =>{
		if (error){
			callback("There is no internet connection", undefined)
		} else if (body.error){
			callback("There is no such location", undefined)
		}else {
			const {temperature, precipProbability} = body.currently
			callback(undefined, body.daily.data[0].summary +
				"It is currently " +
				temperature +
				" degrees out there. There is a " +
				precipProbability +
				"% chance of rain")
		}
	})
}

module.exports = forecast
