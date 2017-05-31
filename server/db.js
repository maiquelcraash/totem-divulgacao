/**
 * Created by maiquel on 24/03/17.
 */

const pg = require('pg'),
	properties = require('./properties'),
	Totem = require('./entities/totem'),
	Util = require('./util');

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
					let last_activity = Util.timestampToDate(row.last_activity);
					return Totem.newTotem(row.code, row.description_id, row.situation, row.latitude, row.longitude, last_activity);
				});
				return totems;
			});
	};

	let getTotemByDescriptionID = (description_id) => {
		const query = 'SELECT * FROM totems where description_id = \'' + description_id + '\'';
		return executeQuery(query)
			.then((res) => {
				if (res.rows.length > 0) {
					let last_activity = Util.timestampToDate(res.rows[0].last_activity);
					return Totem.newTotem(res.rows[0].code, res.rows[0].description_id, res.rows[0].situation, res.rows[0].latitude, res.rows[0].longitude, last_activity);
				}
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

						let last_activity = Util.timestampToDate(row.last_activity);

						return Totem.newTotem(row.code, row.description_id, row.situation, row.latitude, row.longitude, last_activity);
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

	let addTotem = (totem) => {
		const query = 'insert into totems values(' +
			totem.code + ', ' +
			'\'' + totem.description_id + '\',' +
			'\'' + totem.situation + '\',' +
			'\'' + totem.latitude + '\',' +
			'\'' + totem.longitude + '\',' +
			'\'' + totem.last_activity + '\')';

		return executeQuery(query);
	};

	let updateTotem = (totem) => {

		let timestamp = Util.dateToTimestamp(totem.last_activity);

		const query = 'update totems set ' +
			' description_id = ' + '\'' + totem.description_id + '\',' +
			'situation = ' + '\'' + totem.situation + '\',' +
			'latitude = ' + '\'' + totem.latitude + '\',' +
			'longitude = ' + '\'' + totem.longitude + '\',' +
			'last_activity = ' + '\'' + timestamp + '\'' +
			' where code = ' + totem.code;

		console.log(query);

		return executeQuery(query);
	};


	//Test AddTotem
	// let totem = Totem.newTotem(6, "TESTE Pris", "1", "12312312", "0432342");
	// addTotem(totem)
	// 	.catch((err) => {
	// 		console.log(err.detail);
	// 	});

	let getNextTotemCode = () => {
		const query = "SELECT MAX(code) as code from totems";
		return executeQuery(query)
			.then((res) => {
				if (res.rows.length > 0) return res.rows[0].code;
				else return null
			})
			.catch((err) => {
				console.error(err);
				return null;
			});
	};

	let addActivity = (totemCode, situation) => {
		const query = "INSERT INTO totem_log(ref_totem, situation) VALUES (" + totemCode + ", '" + situation + "')";
		return executeQuery(query);
	};

	return {
		getTotems: getTotems,
		getTotemByDescriptionID: getTotemByDescriptionID,
		findTotemsByName: findTotemsByName,
		addTotem: addTotem,
		getNextTotemCode: getNextTotemCode,
		updateTotem: updateTotem,
		addActivity: addActivity
	}
};


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