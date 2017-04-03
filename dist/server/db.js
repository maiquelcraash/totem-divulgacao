/**
 * Created by maiquel on 24/03/17.
 */

const pg = require('pg'),
      properties = require('./properties'),
      Totem = require('./entities/totem');

/* #### Configure POSTGRES #### */
const config = {
	user: properties.DB_USER,
	database: properties.DB_DATABASE,
	password: properties.DB_PASSWORD,
	host: properties.DB_HOST,
	port: properties.DB_PORT,
	max: 10,
	idleTimeoutMillis: 30000 };

const pool = new pg.Pool(config);

let totemsManager = () => {

	let getTotems = () => {
		let totems = [];

		executeQuery('SELECT * FROM totems', (err, res) => {
			if (!err) {
				totems = res.map(row => {
					return Totem.newTotem(row.code, row.description_id, row.situation);
				});
			}
		});

		return totems;
	};

	return {
		getTotems: getTotems
	};
};

function executeQuery(query, callback) {

	pool.query(query, (err, res) => {
		if (err) {
			return callback(err, null);
		}
		return callback(null, res.rows);
	});
}

module.exports = totemsManager();
//# sourceMappingURL=db.js.map