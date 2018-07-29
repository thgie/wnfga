var uuid = require('node-uuid');
var lazy = require('./lazy');

var seeded = function(seed, max, min) {
	max = max || 1;
	min = min || 0;

	seed = (seed * 9301 + 49297) % 233280;
	var rnd = seed / 233280.0;

	return {
		rand: min + rnd * (max - min),
		seed: seed
	}
}

var generate = function(seed){

	var board = {};

	if(lazy.boards[seed]){
		board = lazy.boards[seed];
	} else {
		var pg = seeded(seed);

		board = {
			seed: seed,
			size: Math.floor(pg.rand * 7 + 5),
			name: landscape_name(seed)
		};

		seed = pg.seed;

		board.tiles = tiles(seed, board.size);
		lazy.boards[seed] = board;
	}

	board.hero = hero(board);

	return board;
}

var tiles = function(seed, size){

	var pg = seeded(seed);
	seed = pg.seed;

	var fields = [];

	for(var y = 0; y < size; y++) {
		for (var x = 0; x < size; x++) {

			var base = Math.floor(pg.rand * 100000);
			var field = {
				x: x,
				y: y,
				village: false
			}
			fields.push(field);

			if(!(base % 5)) {
				field.name = 'mountain';
				pg = seeded(pg.seed);
				seed = pg.seed;

				if(!(Math.floor(pg.rand * 100000) % 15)) {
					field.village = true;
				}
				continue;
			}

			if(!(base % 4)) {
				field.name = 'water';
				pg = seeded(pg.seed);
				seed = pg.seed;

				if(!(Math.floor(pg.rand * 100000) % 10)) {
					field.village = true;
				}
				continue;
			}

			field.name = 'land';
			pg = seeded(pg.seed);
			seed = pg.seed;

			if(!(Math.floor(pg.rand * 100000) % 15)) {
				field.village = true;
			}
		}
	}

	return fields;
}

var hero = function(board){

	var hero = {
		x: 0,
		y: 0,
		board_size: 0
	};
	var lands = [];

	for(var t in board.tiles) {
		if (board.tiles[t].name === 'land') {
			lands.push(board.tiles[t]);
		}
	}

	var spawn_point = lands[Math.round(Math.random() * lands.length)];

	hero.board_size = board.size;
	hero.seed = board.seed;
	hero.x = spawn_point.x;
	hero.y = spawn_point.y;
	hero.uid = uuid.v4();

	return hero;
}

var landscape_name = function(seed) {
	var pg = seeded(seed);
	seed = pg.seed;

	var base = Math.floor(pg.rand * 100000),
		start = '',
		middle = '',
		ending = '',
		vocals = ['a', 'i', 'e', 'o', 'u', 'ä', 'ö', 'ü'],
		consonants = ['q', 'w', 'r', 't', 'z', 'p', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'y', 'x', 'c', 'v', 'n', 'm']
	length = base % 2 + 3;

	for(var l = 0; l < length; l++){
		var pg = seeded(seed);
		seed = pg.seed;
		var format = Math.floor(pg.rand * 100000) % 4;
		for(var f = 0; f < format; f++){
			if(f === 0){
				var pg = seeded(seed);
				seed = pg.seed;
				start += consonants[Math.floor(pg.rand * 100000) % consonants.length];
			} else {
				var pg = seeded(seed);
				seed = pg.seed;
				start += vocals[Math.floor(pg.rand * 100000) % vocals.length];
			}
		}
	}

	switch(base % 5){
		case 0: ending = 'land'; break;
		case 1: ending = 'berg'; break;
		case 2: ending = 'heim'; break;
		case 3: ending = 'stan'; break;
		case 4: ending = 'wil'; break;
	}

	return start.charAt(0).toUpperCase() + start.slice(1) + middle + ending;
}

module.exports = {
	generate: generate
};