var hero = {
	x: 0,
	y: 0,
	board_size: 0,
	seed: 0,
	uid: 0
}

var init = function(hero_data){
	hero.x = hero_data.x;
	hero.y = hero_data.y;
	hero.board_size = hero_data.board_size;
	hero.seed = hero_data.seed;
	hero.uid = hero_data.uid;
}

var move = function(direction, callback){

	switch(direction){
		case 'left':
			hero.x > 0 ? hero.x-- : hero.x = 0;
			break;
		case 'top':
			hero.y > 0 ? hero.y-- : hero.y = 0;
			break;
		case 'right':
			hero.x < map.board.size - 1 ? hero.x++ : hero.x = map.board.size - 1;
			break;
		case 'bottom':
			hero.y < map.board.size - 1 ? hero.y++ : hero.y = map.board.size - 1;
			break;
	}

	window.socket.emit('')

	callback(hero);
}

module.exports = {
	init: init,
	move: move,
	stats: hero
}