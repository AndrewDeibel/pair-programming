$.widget('dotp.images', {

	options: {
		data: ["http://lorempixel.com/100/100/nature/1", "http://lorempixel.com/100/100/nature/2", "http://lorempixel.com/100/100/nature/3"],
		index: 4,
	},

	_create: function() {
		var $this = this;
		$this._render();
	},

	_render: function() {
		var $this = this;
		var $wrapper = $('<div class="flex padded"></div>');
		var renderImage = function(image) {
			var $col = $('<div class="relative"><img src="' + image + '" /></div>');
			var $btnRemove = $('<a class="btn-remove shadow button small red absolute top right square">' + icons.cancel + '</a>');
			$btnRemove.click(function() {
				$col.remove();
			});
			$col.append($btnRemove);
			$wrapper.append($col);
		}
		$.each($this.options.data, function(index, image) {
			renderImage(image);
		});

		var $btnAdd = $('<a class="btn-add button">' + icons.plus + '<span>New Image</span></a>');
		$btnAdd.click(function() {
			renderImage("http://lorempixel.com/100/100/nature/" + $this.options.index);
			$this.options.index++;
		});
		$wrapper.append('<div class="xlarge-12"></div>');

		$this.element.append($wrapper);

		$wrapper.sortable({
			tolerance: "pointer",
		});
	},

});