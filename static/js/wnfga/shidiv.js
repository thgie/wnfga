var funcs = require('./functions');
var sprites = require('./sprites');
var $ = require('./../vendor/jquery-2.1.1.min');

/*
 * shidiv: map
 */
var map = function(map_data, callback) {

	var tiles = document.createElement('div');
		tiles.id = 'tiles';

	for(var t in map_data.tiles){
		var tile = sprite(sprites[map_data.tiles[t].name]),
			classname = '',
			position = 'x'+map_data.tiles[t].x+' y'+map_data.tiles[t].y;

		classname += map_data.tiles[t].village === true ? ' inhabitated ' : '';
		tile.className += ' ' + classname + position;

		if(map_data.tiles[t].village) {
			if(map_data.tiles[t].name === 'land'){
				var village = sprite(sprites.village);
				village.className = 'tile village '+position;
				tiles.appendChild(village);
			}
			if(map_data.tiles[t].name === 'mountain'){
				var village = sprite(sprites.cottage);
				village.className = 'tile cottage '+position;
				tiles.appendChild(village);
			}
			if(map_data.tiles[t].name === 'water'){
				var village = sprite(sprites.boat);
				village.className = 'tile boat '+position;
				tiles.appendChild(village);
			}
		}

		tiles.appendChild(tile);
	}

	callback(tiles);
}

/*
 * shidiv: hero
 */
var hero = function(hero_data, tiles){
	var _hero = sprite(sprites.evil_hero);
	_hero.className = 'tile hero me '+sprites.evil_hero.name+' x'+hero_data.x+' y'+hero_data.y;
	tiles.appendChild(_hero);
}

/*
 * shidiv: another
 */
var another = function(hero_data){
	var _hero = sprite(sprites.bunny_hero);
	_hero.className = 'tile hero another '+sprites.bunny_hero.name+' x'+hero_data.x+' y'+hero_data.y;
	return _hero;
}

/*
 * shidiv: sprite
 */
var sprite = function(sprite_data) {

	var _sprite = document.createElement('div');
	_sprite.className = 'tile ' + sprite_data.name;

	var c = 0;

	for (var y = 0; y < 5; y++) {
		for (var x = 0; x < 5; x++) {
			_sprite.appendChild(pixel(sprite_data.pixels.charAt(c)));
			c++;
		}
	}

	return _sprite;
}

/*
 * shidiv: pixel
 */
var pixel = function(pixel_data){

	var _pixel = document.createElement('div');
	_pixel.className = 'pixel p'+pixel_data;

	return _pixel;
}

/*
 * shidiv: prepare dynamic css
 */
var size_styles = function(board_size){
	var fluid = false;

	var pixel = 5,
		pixel_size = pixel + 'px',
		tile_size = 5 * pixel + 'px',
		tiles_size = board_size * 5 * 5 + 'px';

	if(fluid) {
		pixel_size = '20%';
		tile_size = 100 / board_size + '%';
		tiles_size = '500px';
	}

	funcs.inject_css('#tiles{width:'+tiles_size+';height:'+tiles_size+';}.tile{width:'+tile_size+';height:'+tile_size+';}.pixel{width:'+pixel_size+';height:'+pixel_size+';}');
}

module.exports = {
	map: map,
	hero: hero,
	another: another,
	size_styles: size_styles
}