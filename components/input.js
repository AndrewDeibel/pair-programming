$.widget('dotp.input', {

	options: {
		elements: {
			$text: null,
			$select: null,
			$checkbox: null,
			$radio: null,
			$toggle: null
		},
		type: null,	// string - text, select, checkbox, radio, toggle
		label: null, // string - if provided, add label element
		active: null, // bool - if true force active
	},

	state: {
		active: false,
	},

	_create: function () {
		var $this = this;

		// State
		if ($this.options.active) {
			$this.state.active = true;
		}

		// Label
		if ($this.options.label != null) {
			$this.element.prepend($('<label>' + $this.options.label + '</label>'));
		}

		// Type
		if ($this.options.type != null) {
			$this.element.addClass($this.options.type);
		}
		else {
			if ($this.element.hasClass('text')) {
				$this.options.type = "text";
			} else if ($this.element.hasClass('select')) {
				$this.options.type = "select";
			} else if ($this.element.hasClass('select-color')) {
				$this.options.type = "select-color";
			} else if ($this.element.hasClass('checkbox')) {
				$this.options.type = "checkbox";
			} else if ($this.element.hasClass('radio')) {
				$this.options.type = "radio";
			} else if ($this.element.hasClass('toggle')) {
				$this.options.type = "toggle";
			}
		}

		// Elements
		switch ($this.options.type) {
			case "text": {
				$this.options.elements.$text = $this.element.find('input');
				var textChange = function () {
					var value = $this.options.elements.$text.val()
					if (value != "" || $this.options.active) {
						$this.element.addClass("hasValue");
					}
					else {
						$this.element.removeClass("hasValue");
					}
				}
				$this.options.elements.$text.keyup(function() {
					textChange();
				});
				textChange();
				break;
			}
			case "select": {
				$this.options.elements.$select = $this.element.find('select');
				var selectChange = function () {
					var value = $this.options.elements.$select.val();
					if (value !== "0" || $this.options.active) {
						$this.element.addClass("hasValue");
					}
					else {
						$this.element.removeClass("hasValue");
					}
				}
				$this.options.elements.$select.change(function() {
					selectChange();
				});
				selectChange();
				$this.options.elements.$select.selectize({
					onItemAdd: function () {
						this.$wrapper.closest('.input').addClass('hasValue');
					},
					onItemRemove: function() {
						this.$wrapper.closest('.input').removeClass('hasValue');
					},
					dropdownParent: 'body',
				});
				break;
			}
			case "checkbox": {
				$this.options.elements.$checkbox = $this.element.find('input');
				break;
			}
			case "radio": {
				$this.options.elements.$radio = $this.element.find('input');
				break;
			}
			case "toggle": {
				$this.options.elements.$toggle = $this.element.find('input');
				break;
			}
			case "tiles": {
				$this.options.elements.$select = $this.element.find('select');
			}
		}
	}

});