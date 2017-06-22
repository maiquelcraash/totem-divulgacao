/**
 * Created by maiquel on 24/03/17.
 */

const executeQuery = require('./connectionFactory'),
	Totem = require('./../entities/totem'),
	Util = require('./../util');

let logDAO = () => {

	/**
	 * Retorna a atividade dos totens (7 ultimos dias com atividades)
	 *
	 * @returns {Promise.<TResult>}
	 */
	let getLastActivities = () => {

		let query = " select\n" +
			"\t\tlog.date_time::date as \"data\",\n" +
			"\t\tcount (*) as \"quantidade\"\n" +
			" from \n" +
			" \t\ttotem_log log, \n" +
			" \t\ttotems tot\n" +
			" where \n" +
			" \t\tlog.situation in (\'0\',\'1\')\n" +
			" and\n" +
			" \t\tlog.ref_totem = tot.code\n" +
			" group by\n" +
			" \t\tlog.date_time::date\n" +
			" order by\n" +
			" \t\tlog.date_time::date desc\n" +
			" limit\n" +
			" \t\t7;";

		return executeQuery(query)
			.then((res) => {
				return res;
			});
	};

	return {
		getLastActivities: getLastActivities
	}
};


module.exports = logDAO();