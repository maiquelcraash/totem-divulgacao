/**
 * Created by maiquel on 31/03/17.
 */

function Totem(code, description_id, situation, latitude, longitude) {
	this.code = code;
	this.description_id = description_id;
	this.situation = situation;
	this.latitude = latitude;
	this.longitude = longitude;
}

module.exports.newTotem = (code, description_id, situation, latitude, longitude) => {
	return new Totem(code, description_id, situation, latitude, longitude);
};