var hero = require('./hero');
var $ = jQuery = require('./../vendor/jquery-2.1.1.min');
var touchwipe = require('./../vendor/jquery.touchwipe.min');
var dom = require('./dom');

var init = function(){
	document.onkeyup = on_key_up;

	$("#tiles").touchwipe({
		wipeLeft: function() { var e = {keyCode: 37}; on_key_up(e); },
		wipeRight: function() { var e = {keyCode: 39}; on_key_up(e); },
		wipeUp: function() { var e = {keyCode: 40}; on_key_up(e); },
		wipeDown: function() { var e = {keyCode: 38}; on_key_up(e); },
		min_move_x: 20,
		min_move_y: 20,
		preventDefaultEvents: true
	});

	dom.by_id('random-warp').onclick = function(){
		var _hash = Math.round(Math.random() * 1000000);
		window.location.hash = _hash;
		window.location.reload();
	}

	dom.by_id('warp').onclick = function(){
		var _hash = dom.by_id('warp-target').value;
		window.location.hash = _hash;
		window.location.reload();
	}
}

var on_key_up = function(e) {

	var arrows = (e.keyCode < 37) || (e.keyCode > 40) ? false : true,
		direction = '';

	switch(e.keyCode) {
		case 37: // left
			direction = 'left';
			//hero.stats.x > 0 ? hero.stats.x-- : hero.stats.x = 0;
			break;
		case 38: // top
			direction = 'top';
			//hero.stats.y > 0 ? hero.stats.y-- : hero.stats.y = 0;
			break;
		case 39: // right
			direction = 'right';
			//hero.stats.x < hero.stats.board_size - 1 ? hero.stats.x++ : hero.stats.x = hero.stats.board_size - 1;
			break;
		case 40: // bottom
			direction = 'bottom';
			//hero.stats.y < hero.stats.board_size - 1 ? hero.stats.y++ : hero.stats.y = hero.stats.board_size - 1;
			break;
	}

	if(arrows){
		/*var _class = $('.hero.me').attr('class');
		_class = _class.replace(/x\d\d?/, 'x'+hero.stats.x);
		_class = _class.replace(/y\d\d?/, 'y'+hero.stats.y);

		$('.hero.me').attr('class', _class);*/

		dom.by_id('turn').innerHTML = 'wait';
		window.socket.emit('move', {direction: direction, hero: hero.stats});
	}
}

var move = function(sprite, hero_data){
	var _class = $(sprite).attr('class');
	_class = _class.replace(/x\d\d?/, 'x'+hero_data.x);
	_class = _class.replace(/y\d\d?/, 'y'+hero_data.y);

	$(sprite).attr('class', _class);
}

module.exports = {
	init: init,
	move: move
}