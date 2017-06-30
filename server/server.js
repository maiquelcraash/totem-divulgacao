/* #### Configure EXPRESS #### */
const app = require('./../app'),
	arquivo = require('fs'),					//módulo para manipular arquivos
	path = require('path'),
	properties = require('./properties'),
	Totem = require('./entities/totem'),
	totemDAO = require('./DAO/totemDAO'),
	logDAO = require('./DAO/logDAO');

/* Manage Server */
let server = app.listen(process.env.PORT || properties.SERVER_PORT);
let io = require('socket.io').listen(server);

totemDAO.getNextTotemCode()
	.then((result) => {
		console.log("\nServidor rodando e conectado ao banco...\n");
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
	res.send();
});

//Update totem Status on Server
app.post('/totemAPI', (req, res) => {
	let description_id = req.body.totemID,
		situation = req.body.situation;
	console.log("\n'" + description_id + "' tentado conectar");

	totemDAO.getTotemByDescriptionID(description_id)
		.then((totem) => {
			console.log("Conectato... Comparando Situações");
			if (situation !== totem.situation) {
				totem.situation = situation;

				console.log("Situações diferentes");

				totemDAO.addActivity(totem.code, situation)
					.catch((err) => {
						console.error(err);
					});

				io.emit('newStatus', totem);
			}
			else {
				let diff = Math.abs(new Date() - totem.last_activity);

				if (diff > 60000) {
					io.emit('newStatus', totem);
				}
				console.log("Mesma Situação");
			}

			totem.last_activity = new Date();
			totemDAO.updateTotem(totem)
				.then(() => {
					console.log("Totem " + totem.description_id + " atualizado no banco\n");
				});

			res.send();
		});

});


/***************************************
 *  Web Application API
 * *************************************/

app.get('/totems', (req, res) => {
	totemDAO.getTotems()
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			console.error(err);
		});
});

app.get('/totem/:code', (req, res) => {
	totemDAO.getTotemByCode(req.param('code'))
		.then((result) => {
			if (result) {
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
	totemDAO.findTotemsByName(req.param('name'))
		.then((result) => {
			if (result) {
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

app.get('/log/totemActivity', (req, res) => {
	logDAO.getLastActivities()
		.then((result) => {
			if (result) {

				let json = [],
					totems = [],
					dates = [];

				//sepera todos os totens e datas
				result.rows.forEach((totem) => {
					if (!totems.includes(totem.nome)) {
						totems.push(totem.nome);
					}

					let date = new Date(totem.data);
					let date_string = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

					if (!dates.includes(date_string)) {
						dates.push(date_string)
					}
				});

				//para cada totem, busca os totais
				totems.forEach((totem) => {
					let data = [totem];

					result.rows.forEach((row) => {
						if (row.nome === totem) {
							data.push(row.total);
						}
					});

					json.push(data);
				});
				dates.unshift("Data");
				json.unshift(dates);
				res.json(json);
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

app.get('/log/totemActivityDayOfWeek', (req, res) => {
	logDAO.getActivitiesDayOfWeek()
		.then((result) => {
			if (result) {
				res.json(result.rows);
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

app.get('/log/getActivityByTotem', (req, res) => {
	logDAO.getActivityByTotem()
		.then((result) => {
			if (result) {
				res.json(result.rows);
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

app.get('/log/getHeatmap', (req, res) => {
	logDAO.getHeatmap()
		.then((result) => {
			if (result) {
				res.json(result.rows);
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

	totemDAO.getNextTotemCode()
		.then((result) => {
			code = result + 1;

			let totem = Totem.newTotem(code, desc_id, 0, lat, long, null);

			totemDAO.addTotem(totem)
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