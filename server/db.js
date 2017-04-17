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
				let totems;
				totems = res.rows.map((row) => {
					return Totem.newTotem(row.code, row.description_id, row.situation);
				});
				return totems;
			});
	};

	let getTotemByCode = (code) => {
		const query = 'SELECT * FROM totems where code = ' + code;
		return executeQuery(query)
			.then((res) => {
				if (res.rows.length > 0) return Totem.newTotem(res.rows[0].code, res.rows[0].description_id, res.rows[0].situation);
				else return null
			});
	};

	let findTotemsByName = (name) => {
		const query = 'SELECT * FROM totems where description_id ilike \'%' + name + '%\'';
		return executeQuery(query)
			.then((res) => {
				if (res.rows.length > 0) {
					let totems;
					totems = res.rows.map((row) => {
						return Totem.newTotem(row.code, row.description_id, row.situation);
					});
					return totems;
				}
				else return null;
			})
			.catch((err) => {
				console.error(err);
				return null;
			});
	};

	return {
		getTotems: getTotems,
		getTotemByCode: getTotemByCode,
		findTotemsByName: findTotemsByName
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