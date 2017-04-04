/* #### Configure EXPRESS #### */
const app = require('./../app'),
	arquivo = require('fs'),					//módulo para manipular arquivos
	path = require('path'),
	properties = require('./properties'),
	db = require('./db');


db.getTotems()
	.then((res) => {
		console.log(res);
	});

/* Manage Server */
app.listen(process.env.PORT || properties.SERVER_PORT);

app.get('/', (req, res) => {
	res.sendfile('public/index.html');
});

app.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.get('/contatos', (req, res) => {
	console.log("\nTotem Attemp: IP:" + req.connection.remoteAddress);
	res.write("Conected to server...");
});

app.post('/contatos', (req, res) => {
	console.log(req.body);
	let id = req.body.totemID,
		situation = req.body.situation;

	let totem = totems.find((totem) => {
		return totem.description_id = id;
	});

	if (situation != totem.situation) {
		totem.situation = situation;
		console.log("Situações diferentes");
	}
	else {
		console.log("Mesma Situação");
	}

	res.send;
});

app.get('/totems', (req, res) => {
	res.json(totems);
});