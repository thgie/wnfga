var funcs = require('./functions');

var land = {
	name: 'land',
	colors: ['#8FBC8F', 'GREEN'],
	pixels: "1111101111111011111110111"
}
var water = {
	name: 'water',
	colors: ['#88bbbb', 'PowderBlue'],
	pixels: "1111111111111011111110111"
}
var mountain = {
	name: 'mountain',
	colors: ['Lightgrey', 'Darkgrey', 'Grey'],
	pixels: "1110112111111121101111111"
}
var village = {
	name: 'village',
	colors: ['White', '#F8CB66', 'LightGrey', '#D8A667', 'transparent'],
	pixels:	"44444" +
			"42004" +
			"40004" +
			"41114" +
			"44444"
}
var cottage = {
	name: 'cottage',
	colors: ['White', '#F8CB66', 'LightGrey', '#D8A667', 'transparent'],
	pixels: "44204" +
			"44004" +
			"44114" +
			"44444" +
			"44444"
}
var boat = {
	name: 'boat',
	colors: ['SaddleBrown', 'SandyBrown', 'White', 'transparent'],
	pixels: "44444" +
			"42444" +
			"22444" +
			"11144" +
			"44444"
}
var hero = {
	name: 'hero',
	colors: ['transparent', '#efefef', '#181818'],
	pixels: "0111002220112110111001010"
}

var evil_hero = {
	name: 'evil_hero',
	colors: ['Red', 'Azure', '#181818', 'Transparent'],
	pixels:	"33033" +
			"32223" +
			"02220" +
			"01110" +
			"31313"
}

var bunny_hero = {
	name: 'bunny_hero',
	colors: ['#f7e26b', '#000000', 'transparent'],
	pixels: "20202" +
			"20002" +
			"01010" +
			"20002" +
			"20202"

}

var sprites = [land, water, mountain, village, cottage, boat, hero, evil_hero, bunny_hero];

var init = function(){
	var css_string = '';

	for(var s in sprites) {
		for (var c in sprites[s].colors) {
			css_string += '.' + sprites[s].name + '>.p' + c + ' {background:' + sprites[s].colors[c] + ';}';
		}
	}
	funcs.inject_css(css_string);
}

module.exports = {
	init: init,
	land: land,
	water: water,
	mountain: mountain,
	village: village,
	cottage: cottage,
	boat: boat,
	hero: hero,
	evil_hero: evil_hero,
	bunny_hero: bunny_hero
}