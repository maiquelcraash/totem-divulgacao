/**
 * Created by maiquel on 21/06/17.
 */



const pg = require('pg'),
	properties = require('./../properties');

/* #### Configure POSTGRES #### */
const config = {
	user: properties.DB_USER,
	database: properties.DB_DATABASE,
	password: properties.DB_PASSWORD,
	host: properties.DB_HOST,
	port: properties.DB_PORT,
	max: 10,
	idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config);

function executeQuery(query) {
	let res = null;
	try {
		res = pool.query(query);
	} catch (err) {
		console.error('Error running query: ', err);
	}
	return res;
}

module.exports = executeQuery;