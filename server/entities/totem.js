/**
 * Created by maiquel on 31/03/17.
 */

function Totem(code, description_id, situation, latitude, longitude, last_activity) {
	this.code = code;
	this.description_id = description_id;
	this.situation = situation;
	this.latitude = latitude;
	this.longitude = longitude;
	this.last_activity = last_activity;
}

module.exports.newTotem = (code, description_id, situation, latitude, longitude, last_activity) => {
	return new Totem(code, description_id, situation, latitude, longitude, last_activity);
};