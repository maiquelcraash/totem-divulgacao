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

		let query = ""
			+ "select "
			+ "    nome, "
			+ "    data, "
			+ "    total "
			+ "from "
			+ "( "
			+ "select tot.description_id as \"nome\" , now() - INTERVAL'0 day' as \"data\", count( * ) as \"total\" from totem_log log inner join totems tot on ( log.ref_totem = tot.code ) where log.situation in ( '0','1' ) and log.date_time >= now() - INTERVAL'1 day' group by 1, 2 "
			+ "union "
			+ "select tot.description_id as \"nome\" , now() - INTERVAL'1 day' as \"data\", count( * ) as \"total\" from totem_log log inner join totems tot on ( log.ref_totem = tot.code ) where log.situation in ( '0','1' ) and log.date_time <= now() - INTERVAL'2 day' group by 1, 2 "
			+ "union "
			+ "select tot.description_id as \"nome\" , now() - INTERVAL'2 day' as \"data\", count( * ) as \"total\" from totem_log log inner join totems tot on ( log.ref_totem = tot.code ) where log.situation in ( '0','1' ) and log.date_time <= now() - INTERVAL'3 day' group by 1, 2 "
			+ "union "
			+ "select tot.description_id as \"nome\" , now() - INTERVAL'3 day' as \"data\", count( * ) as \"total\" from totem_log log inner join totems tot on ( log.ref_totem = tot.code ) where log.situation in ( '0','1' ) and log.date_time <= now() - INTERVAL'4 day' group by 1, 2 "
			+ "union "
			+ "select tot.description_id as \"nome\" , now() - INTERVAL'4 day' as \"data\", count( * ) as \"total\" from totem_log log inner join totems tot on ( log.ref_totem = tot.code ) where log.situation in ( '0','1' ) and log.date_time <= now() - INTERVAL'5 day' group by 1, 2 "
			+ "union "
			+ "select tot.description_id as \"nome\" , now() - INTERVAL'5 day' as \"data\", count( * ) as \"total\" from totem_log log inner join totems tot on ( log.ref_totem = tot.code ) where log.situation in ( '0','1' ) and log.date_time <= now() - INTERVAL'6 day' group by 1, 2 "
			+ "union "
			+ "select tot.description_id as \"nome\" , now() - INTERVAL'6 day' as \"data\", count( * ) as \"total\" from totem_log log inner join totems tot on ( log.ref_totem = tot.code ) where log.situation in ( '0','1' ) and log.date_time <= now() - INTERVAL'7 day' group by 1, 2 "
			+ ") tabela "
			+ "order by data, nome;";

		return executeQuery(query)
			.then((res) => {
				return res;
			});
	};

	/**
	 * Retorna toda a atividade dos totens agrupado por dia da semana
	 *
	 * @returns {Promise.<TResult>}
	 */
	let getActivitiesDayOfWeek = () => {

		let query = "select \n" +
			" log.day_week\tas \"dia\",\n" +
			" count(*)\tas \"valor\"\n" +
			"from totem_log log\n" +
			"where \n" +
			" log.situation in (\'0\',\'1\')\n" +
			"group by \n" +
			" log.day_week\n" +
			"order by\n" +
			" \"valor\" desc;";

		return executeQuery(query)
			.then((res) => {
				return res;
			});
	};

	let getActivityByTotem = () => {

		let query = ""
			+ "select "
			+ "   tot.description_id	as \"nome\", "
			+ "   count(*)		as \"valor\" "
			+ "from totems tot "
			+ "inner join totem_log log on ( tot.code = log.ref_totem ) "
			+ "where "
			+ "   log.situation in ('0','1') "
			+ "group by "
			+ "   tot.description_id "
			+ "order by "
			+ "	\"valor\" desc";

		return executeQuery(query)
			.then((res) => {
				return res;
			});
	};

	let getHeatmap = () => {

		let query = ""
			+ "select "
			+ "	tot.latitude	as \"latitude\", "
			+ "	tot.longitude	as \"longitude\" "
			+ "from totems tot "
			+ "inner join totem_log log on ( tot.code = log.ref_totem );";

		return executeQuery(query)
			.then((res) => {
				return res;
			});
	};

	return {
		getLastActivities: getLastActivities,
		getActivitiesDayOfWeek: getActivitiesDayOfWeek,
		getActivityByTotem: getActivityByTotem,
		getHeatmap: getHeatmap
	}
};


module.exports = logDAO();