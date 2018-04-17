// Components
require('./components/icons');
require('./components/input');
require('./components/table');
require('./components/modal');
require('./components/form');
require('./components/images');
require('./components/menu');

window.$loader = $('<div class="loader-wrapper"><div class="loader"><svg width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></div></div>');

$(function() {
	$('.input').input();
});