/**
 * Created by maiquel on 24/03/17.
 */

(function () {
	"use strict";

	let express = require('express'),
		app = express();

	//Arquivos estáticos acessíveis a todos
	app.use(express.static(__dirname + '/public'));
	app.use("/css",  express.static(__dirname + '/public/css'));
	app.use("/js", express.static(__dirname + '/public/js'));
	app.use("/img",  express.static(__dirname + '/public/img'));

	app.use(express.bodyParser());

	module.exports = app;
}());