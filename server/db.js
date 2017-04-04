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
	idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config);

let totemsManager = () => {

	/**
	 * Retorna todos os totems da base de dados
	 *
	 * @returns {Promise.<TResult>}
	 */
	let getTotems = () => {
		return executeQuery('SELECT * FROM totems')
			.then((res) => {
				return res.rows;
			});
	};

	return {
		getTotems: getTotems
	}
};

// async function executeQuery(query) {
// 	pool.query(query)
// 		.then((res) => {
// 			return res.rows;
// 		})
// 		.catch((err) => {
// 			return err;
// 		});
// }

function executeQuery(query) {
	let res = null;
	try {
		res = pool.query(query);
	} catch (err) {
		console.error('Error running query: ', err);
	}
	return res;
}

module.exports = totemsManager();