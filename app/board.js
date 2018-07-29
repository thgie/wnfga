var move_hero = function(data){
	var _hero = data.hero;
	var target = {
		x: _hero.x,
		y: _hero.y
	}

	console.log(_hero)

	switch(data.direction) {
		case 'left': // left
			direction = 'left';
			target.x > 0 ? target.x-- : target.x = 0;
			break;
		case 'top': // top
			direction = 'top';
			target.y > 0 ? target.y-- : target.y = 0;
			break;
		case 'right': // right
			direction = 'right';
			target.x < _hero.board_size - 1 ? target.x++ : target.x = _hero.board_size - 1;
			break;
		case 'bottom': // bottom
			direction = 'bottom';
			target.y < _hero.board_size - 1 ? target.y++ : target.y = _hero.board_size - 1;
			break;
	}

	console.log(_hero, target)
}

module.exports = {
	moveHero: move_hero
}