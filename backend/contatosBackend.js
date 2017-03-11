var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

var contatos = [
	{
		id: 1,
		nome: "Maiquel Ludwig",
		telefone: "9999-9991",
		data: new Date(),
		operadora: {nome: "GVT", codigo: 25, categoria: "Fixo"}
	},
	{
		id: 2,
		nome: "Jaine",
		telefone: "99345-9991",
		data: new Date(),
		operadora: {nome: "Oi", codigo: 14, categoria: "Celular"}
	},
	{
		id: 3,
		nome: "marlon ludwig",
		telefone: "99966-7991",
		data: new Date(),
		operadora: {nome: "Vivo", codigo: 15, categoria: "Celular"}
	},
	{
		id: 4,
		nome: "sérgio",
		telefone: "99966-7991",
		data: new Date(),
		operadora: {nome: "GVT", codigo: 25, categoria: "Fixo"}
	},
	{
		id: 5,
		nome: "Joice de oliVEIRA",
		telefone: "99966-4936",
		data: new Date(),
		operadora: {nome: "Vivo", codigo: 15, categoria: "Celular"}
	},
	{
		id: 6,
		nome: "maria das dores",
		telefone: "9916-1921",
		data: new Date(),
		operadora: {nome: "Vivo", codigo: 15, categoria: "Celular"}
	},
	{
		id: 7,
		nome: "Ilário gräff",
		telefone: "9996-7898",
		data: new Date(),
		operadora: {nome: "Tim", codigo: 41, categoria: "Celular"}
	},
	{
		id: 8,
		nome: "Angelita",
		telefone: "9345-1111",
		data: new Date(),
		operadora: {nome: "Embratel", codigo: 21, categoria: "Fixo"}
	}
];
var operadoras = [
	{nome: "Oi", codigo: 14, categoria: "Celular", preco: 2},
	{nome: "Vivo", codigo: 15, categoria: "Celular", preco: 1},
	{nome: "Tim", codigo: 41, categoria: "Celular", preco: 3},
	{nome: "GVT", codigo: 25, categoria: "Fixo", preco: 1},
	{nome: "Embratel", codigo: 21, categoria: "Fixo", preco: 2}
];

app.listen(process.env.PORT || 8082);

//headers especiais para dar autorização aos GETs e POSTS de outra origem. O browser manda um OPTIONS primeiro vara validar essas informações
/*
 * Access-Control-Allow-Head...
 Content-Type
 Access-Control-Allow-Meth...
 PUT, GET, POST, DELETE, OPTIONS
 Access-Control-Allow-Orig...
 *
 Connection
 keep-alive
 Date
 Wed, 17 Aug 2016 11:26:30 GMT
 Etag
 W/"1be-bJ9TnIrHLJFdqEPb02LdQQ"
 X-Powered-By
 Express
 * */
app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.get('/contatos', function (req, res) {
	console.log("Chegou GET")
	res.json(contatos);
});

app.get('/contato/:id', function (req, res) {
	var contact = contatos.filter(function (contato) {
		return contato.id == req.param('id');
	});

	res.json(contact[0]);
});

app.post('/contatos', function (req, res) {
	// contatos.push(req.body);
	console.log(req.body);
	// res.json(true);
	console.log("Chegou o POST");
	res.json(contatos);
	res.send;
});

app.get('/operadoras', function (req, res) {
	res.json(operadoras);
});
