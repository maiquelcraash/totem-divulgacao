/* #### Configure EXPRESS #### */
const app = require('./../app'),
	arquivo = require('fs'),					//módulo para manipular arquivos
	path = require('path'),
	properties = require('./properties'),
	Totem = require('./entities/totem'),
	db = require('./db');

/* Manage Server */
app.listen(process.env.PORT || properties.SERVER_PORT);

db.getNextTotemCode()
	.then((result) => {
		console.log("MAX = " + result);
	});

app.get('/', (req, res) => {
	res.sendfile('public/index.html');
});

app.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});


/***************************************
 *  TOTEM connection API
 * *************************************/

//Connect totem to server
app.get('/totemAPI', (req, res) => {
	console.log("\nTotem Attemp: IP:" + req.connection.remoteAddress);
	res.write("Conected to server...");
});

//Update totem Status on Server
app.post('/totemAPI', (req, res) => {
	console.log(req.body);
	let description_id = req.body.totemID,
		situation = req.body.situation;

	db.getTotemByDescriptionID(description_id)
		.then((totem) => {
			if (situation !== totem.situation) {
				totem.situation = situation; //todo implementar método para atualizar totem

				db.updateTotem(totem)
					.then(() => {
						console.log("Totem " + totem.description_id + "atulizado no banco");
					});

				console.log("Situações diferentes");
			}
			else {
				console.log("Mesma Situação");
			}

			res.send();
		});

});


/***************************************
 *  Web Application API
 * *************************************/

app.get('/totems', (req, res) => {
	db.getTotems()
		.then((result) => {
			console.log(result);
			res.json(result);
		})
		.catch((err) => {
			console.error(err);
		});
});

app.get('/totem/:code', (req, res) => {
	db.getTotemByCode(req.param('code'))
		.then((result) => {
			if (result) {
				console.log(result);
				res.json(result);
			}
			else {
				res.status(404);
				res.send();
			}
		})
		.catch((err) => {
			console.error(err);
		});
});

app.get('/totems/find/:name', (req, res) => {
	db.findTotemsByName(req.param('name'))
		.then((result) => {
			if (result) {
				console.log(result);
				res.json(result);
			}
			else {
				res.status(404);
				res.send();
			}
		})
		.catch((err) => {
			console.error(err);
		});
});

app.post('/addTotem', (req, res) => {
	res.set('Content-Type', 'text/plain');
	let desc_id, lat, long, code;
	console.log(req.body);

	desc_id = req.body.description_id;
	lat = req.body.latitude;
	long = req.body.longitude;

	db.getNextTotemCode()
		.then((result) => {
			code = result + 1;

			let totem = Totem.newTotem(code, desc_id, 0, lat, long);

			db.addTotem(totem)
				.then(() => {
					res.status(201);
					res.send();
				})
				.catch((err) => {
					console.error("ERROR: " + err.message + "\nDETAILS: " + err.detail);
					res.status(400);

					if (err.code === "23505") {
						res.send('ERRO: Totem "' + desc_id + '" já existente.');
					}
					else {
						res.send('Erro ao Processar requisição.')
					}
				})
		});
});