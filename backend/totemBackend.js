/* #### Configure EXPRESS #### */
const express = require('express'),
	pg = require('pg'),
	app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());


/* #### Configure POSTGRES #### */
const config = {
	user: 'maiquel',
	database: 'totem',
	password: 'craash1',
	host: 'localhost',
	port: 5432,
	max: 10,
	idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const client = new pg.Client(config);
client.connect();

const query = client.query('SELECT * FROM totems');

query.on('end', (result) => {
	console.log(result.rows);
	client.end();
});


let totems = [
	{
		code: 2,
		description_id: "Totem 2 - Shopping Lajeado",
		situation: "0"
	},
	{
		code: 1,
		description_id: "Totem 1 - HBB",
		situation: "0"
	}
];

/* Manage Server */
app.listen(process.env.PORT || 8082);


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