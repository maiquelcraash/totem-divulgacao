/**
 * Created by maiquel on 24/03/17.
 */

(function () {
	"use strict";

	/* Server Settings */
	exports.SERVER_PORT = 8082;


	if (process.env.NODE_ENV === 'test') {
		exports.DB_HOST = 'localhost';
		exports.DB_PORT = 5432;
		exports.DB_DATABASE = 'totem';
		exports.DB_USER = 'maiquel';
		exports.DB_PASSWORD = 'craash1';
	}
	else {
		exports.DB_HOST = 'postgres133264-totem.jelasticlw.com.br';
		exports.DB_PORT = 5432;
		exports.DB_DATABASE = 'totem';
		exports.DB_USER = 'webadmin';
		exports.DB_PASSWORD = 'AAAmrv45149';
	}
}());