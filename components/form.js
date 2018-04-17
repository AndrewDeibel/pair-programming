$.widget('dotp.form', {

	options: {
		type: null, // string - type of form ("species", "users")
		data: {
			fields: null, // object - properties are fields with data
			dropdowns: null, // object - properties are dropdowns with data
		},
		form: null, // object - require json
		callbackEditField: null, // method callback when expand row form field edited
	},

	// Constructor
	_create: function() {
		var $this = this;
		$this.__setForm();
		$this._render();
	},

	// Get data - public
	getData: function() {
		var $this = this;
		$.each($this.options.form.tabs, function(index, tab) {
			if ($this.options.data.fields == null) {
				$this.options.data.fields = {};
			}
			$.each(tab.fields, function(index, field) {
				var $field = $this.element.find('.field-' + field.id);
				switch(field.type) {
					case "text": {
						$this.options.data.fields[field.id] = $field.find('input').val();
						break;
					}
					case "select": {
						$this.options.data.fields[field.id] = $field.find('select').val();
						break;
					}
					case "checkbox": {
						$this.options.data.fields[field.id] = $field.find('input').is(':checked');
						break;
					}
					case "wysiwyg": {
						$this.options.data.fields[field.id] = $field.froalaEditor('html.get');
						break;
					}
				}
			});
		});
		return $this.options.data;
	},

	// Push data - public
	pushData: function(data) {
		var $this = this;
		$this.options.data = data;
		$this._render();
	},

	// Push tabs
	__setForm: function() {
		var $this = this;

		switch($this.options.type) {
			case "demo": {
				$this.options.form = require('./forms/demo.js');
				break;
			}
		}

		// If fields null, set obj structure from form so save has all required properties
		if ($this.options.data.fields == null) {
			if ($this.options.form.tabs != null) {
				$.each($this.options.form.tabs, function(index, tab) {
					if (tab.fields != null) {
						$this.options.data.fields = {};
						$.each(tab.fields, function(index, field) {
							if (field.default != null) {
								$this.options.data.fields[field.id] = field.default;
							}
							else {
								$this.options.data.fields[field.id] = null;
							}
						});
					}
				});
			}
			$this.options.form
		}
	},

	// Render
	_render: function() {
		var $this = this;
		if ($this.forms.tabs) {
			$this.__renderTabs();
		}
		else {
			// TODO: need to render form similar to render tabs
			// then pass in as template for fields to be appended
			$this.__renderFields($this.form.fields, );
		}
	},
	
	// Render tabs
	__renderTabs: function () {
		var $this = this;

		// Form
		var $form = $('<div class="tabs"><ul></ul></div>');

		// Loop through tabs
		$.each($this.options.form.tabs, function(index, tab) {
			$this.__renderTab(tab, $form);
		});

		// Append form and call tabs
		$this.element.append($form);
		$form.tabs();
		$form.find('.ui-tabs-nav a').click(function(e) {
		    e.preventDefault();
		    e.stopPropagation();
		});
	},

	// Render field
	__renderField: function (field, template) {
		var $this = this;

		// Render input and replace field in template
		var $input = null;
		switch(field.type) {
			case "text": { // Text
				$input = $(
					'<div class="input text field-' + field.id + '">' +
						'<label for="input-' + field.id + '">' + field.label + '</label>' +
						'<input type="text" id="input-' + field.id + '" />' +
					'</div>'
				);
				if ($this.options.data.fields != null) {
					$input.find('input').val($this.options.data.fields[field.id]);
				}

				$input.find('input').change(function() {
					$this.callbackEditField(field.id, $input.find('input').val());
				});

				// Input
				$input.input();
				break;
			}
			case "wysiwyg": { // WYSIWYG Editor
				$input = $(
					'<div class="wysiwyg field-' + field.id + '"></div>'
				);
				if ($this.options.data.fields != null) {
					$input.html($this.options.data.fields[field.id]);
				}
				$input.froalaEditor();
				break;
			}
			case "checkbox": { // Checkbox
				$input = $(
					'<div class="input checkbox field-' + field.id + '">' +
						'<input type="checkbox" id="input-' + field.id + '" />' +
						'<label for="input-' + field.id + '">' + field.label + '</label>' +
					'</div>'
				);
				if ($this.options.data.fields != null) {
					$input.find('input').is(':checked', $this.options.data.fields[field.id]);
				}

				$input.find('input').change(function() {
					$this.callbackEditField(field.id, $input.find('input').is(':checked'));
				});

				// Input
				$input.input();
				break;
			}
			case "select": { // Select
				$input = $(
					'<div class="input select field-' + field.id + '">' +
						'<label for="input-' + field.id + '">' + field.label + '</label>' +
						'<select id="input-' + field.id + '"><option></option></select>' +
					'</div>'
				);
				var $select = $input.find('select');
				var defaultValue = null;

				// Get options for dropdown from options.data, add to dropdown
				if ($this.options.data.dropdowns != null) {
					var options = $this.options.data.dropdowns[field.id].data;
					defaultValue = $this.options.data.dropdowns[field.id].default;
					$.each(options, function(value, text) {
						var selected = value == defaultValue ? "selected" : "";
						$select.append($('<option value="' + value + '" ' + selected + '>' + text + '</option>'));
					});
				}

				// Set selected value
				if ($this.options.data.fields != null && defaultValue == null) {
					$select.val($this.options.data.fields[field.id]);
				}

				// Multi
				if (field.options && field.options.multi) {
					$select.prop('multiple', true);
				}

				// Selectize
				$select.selectize({
					onItemAdd: function () {
						this.$wrapper.closest('.input').addClass('hasValue');
					},
					onItemRemove: function() {
						this.$wrapper.closest('.input').removeClass('hasValue');
					},
					dropdownParent: 'body',
				});

				$select.change(function() {
					$this.callbackEditField(field.id, $select.val());
				});

				// Input
				$input.input();
				break;
			}
		}

		// Find field in template and replace
		var $placeholder = template.find('#' + field.id);
		$placeholder.replaceWith($input)
	},

	// Render fields
	__renderFields: function (fields, template) {
		var $this = this;

		// Loop through fields and render to template
		$.each(fields, function(index, field) {
			$this.__renderField(field, template);
		});
	},

	// Render tab
	__renderTab: function (tab, $form) {
		var $this = this;

		// Tab list item
		var $tabItem = $('<li><a href="#tab-' + tab.id + '">' + tab.text + '</a></li>');
		$form.find('ul').append($tabItem);

		// Tab content
		var $tabContent = $('<div id="tab-' + tab.id + '"></div>');
		$tabContent.append($(tab.template));

		// Fields
		if (tab.fields != null) {
			$this.__renderFields(tab.fields, $tabContent);
		}

		// Table
		if (tab.table != null) {

			// Render table
			var $table = $("<table><thead><tr></tr></thead><tbody></tbody></table>");
			var $theadtr = $table.find('thead tr');

			// Render column
			var renderColumn = function(column) {
				var $th = $('<th>' + column.title + '</th>');
				$theadtr.append($th);
			}

			$this.options.data.fields

			// Loop through columns and render to template
			$.each(tab.table.columns, function(index, column) {

				renderColumn(column);
			});

			// Callback when expand row form field is edited
			var callbackEditField = function() {

			}

			// Table
			$table.table({
				columns: tab.table.columns,
				type: tab.table.type,
				data: $this.options.data.tables[tab.id],
				btnSave: tab.table.btnSave,
				dropdowns: $this.options.data.dropdowns,
				callbackEditField: callbackEditField,
			});

			// Find table in template and replace
			var $placeholder = $tabContent.find('#' + tab.table.id);
			$placeholder.replaceWith($table);
		}

		$form.append($tabContent);
	},

});