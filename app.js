/**
 * Created by maiquel on 24/03/17.
 */

(function () {
	"use strict";

	let express = require('express'),
		app = express(),
		http = require('http').Server(app),								//obtem o handler http padrão do node, mas passa o express para incorporar
		io = require("socket.io")(http);								//inicia o Socket.io (WebSocket) passando o handler de requisições do node, já incorporado com o express

	app.set('io', io);													//encapsula o socket.io dentro do objeto express para que possa ser utilizado em todos os locais

	//Arquivos estáticos acessíveis a todos
	app.use(express.static(__dirname + '/public'));
	app.use("/css",  express.static(__dirname + '/public/css'));
	app.use("/js", express.static(__dirname + '/public/js'));
	app.use("/img",  express.static(__dirname + '/public/img'));

	app.use(express.bodyParser());

	module.exports = app;
}());