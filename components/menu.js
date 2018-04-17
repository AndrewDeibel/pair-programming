$.widget('dotp.menu', {

	options: {
		drilldown: false,
	},

	_create: function() {
		var $this = this;
		$this._render();
	},

	_render: function() {
		var $this = this;
		var $lis = $this.element.find('li');
		var $ulRoot = $this.element.children('ul');
		
		if ($this.options.drilldown) {
			var width = $this.element.find('ul').width();
			$this.element.width(width);
			$this.element.addClass("drilldown");
		}

		$lis.click(function() {
			var $li = $(this);
			var $ul = $li.children('ul');
			$li.toggleClass('active');

			var width = $li.width();
			$this.element.width(width);

			var position = $ul.position().left;
			$ulRoot.css('left', -position);
			
			if ($ul.children('.btnBack').length == 0) {
				$ul.prepend('<a class="button btnBack square">' + icons.chevron + '<span>Back</span></a>');
			}
		});
	},

});