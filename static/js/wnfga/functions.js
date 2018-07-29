var dom = require('./dom');

var inject_css = function(css) {
	var node = document.createElement('style');
	node.innerHTML = css;
	document.body.appendChild(node);
}

module.exports = {
	inject_css: inject_css
}