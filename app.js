var express = require('express');
var app = express();

var _ipaddr  = process.env.OPENSHIFT_NODEJS_IP;
var _port    = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 3000;

var server = app.listen(_port, _ipaddr, function() {
	console.log('Listening on ports %d', server.address().port);
});

var procgen = require('./app/procgen');
var board = require('./app/board');

app.use(express.static('static'));
app.get('/', function(req, res){
	res.sendFile(__dirname + '/static/+.html');
});

var io = require('socket.io')(server);

io.on('connection', function (socket) {
	socket.on('init', function (data) {
		var board = procgen.generate(data.seed);
		socket.emit('map', board);
		socket.join(data.seed);
		socket.to(data.seed).emit('joined', board.hero);
	});

	socket.on('pull', function(data){
		socket.to(data.seed).emit('pull', data);
	})

	socket.on('pulled', function(data){
		socket.to(data.seed).emit('pulled', data);
	})

	socket.on('move', function (data) {
		board.moveHero(data);
		//socket.to(data.seed).emit('move', data);
	});
});

