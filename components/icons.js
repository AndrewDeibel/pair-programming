// Get icons
$.get("/icons/icons.svg", function (data) {

	// Add icons to SVG sprite
	var $svgSprit = $('<div id="svgSprite"></div>');
	$svgSprit[0].innerHTML = new XMLSerializer().serializeToString(data.documentElement);
	$('body').prepend($svgSprit);

	// Global icons object
	var icons = {};
	$('#svgSprite').find('symbol').each(function(index, symbol) {
		var iconId = $(symbol).prop('id');
		var iconName = iconId.replace('icon-', '').replace('-', '_');
		icons[iconName] = '<svg class="' + iconId + '"><use xlink:href="#' + iconId + '"></use></svg>';
	});
	window.icons = icons;
});