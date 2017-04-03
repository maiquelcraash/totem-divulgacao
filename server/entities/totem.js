/**
 * Created by maiquel on 31/03/17.
 */

function Totem(code, description_id, situation) {
	this.code = code;
	this.description_id = description_id;
	this.situation = situation;
}

module.exports.newTotem = (code, description_id, situation) => {
	return new Totem(code, description_id, situation);
};