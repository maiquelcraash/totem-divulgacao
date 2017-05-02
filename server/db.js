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
					return Totem.newTotem(row.code, row.description_id, row.situation, row.latitude, row.longitude);
				});
				return totems;
			});
	};

	let getTotemByDescriptionID = (description_id) => {
		const query = 'SELECT * FROM totems where description_id = \'' + description_id + '\'';
		return executeQuery(query)
			.then((res) => {
				if (res.rows.length > 0) return Totem.newTotem(res.rows[0].code, res.rows[0].description_id, res.rows[0].situation, res.rows[0].latitude, res.rows[0].longitude);
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
						return Totem.newTotem(row.code, row.description_id, row.situation, row.latitude, row.longitude);
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
			'\'' + totem.longitude + '\')';

		console.log(query);

		return executeQuery(query);
	};

	let updateTotem = (totem) => {
		const query = 'update totems set ' +
			' description_id = ' + '\'' + totem.description_id + '\',' +
			'situation = ' + '\'' + totem.situation + '\',' +
			'latitude = ' + '\'' + totem.latitude + '\',' +
			'longitude = ' + '\'' + totem.longitude + '\'' +
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

	return {
		getTotems: getTotems,
		getTotemByDescriptionID: getTotemByDescriptionID,
		findTotemsByName: findTotemsByName,
		addTotem: addTotem,
		getNextTotemCode: getNextTotemCode,
		updateTotem: updateTotem
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