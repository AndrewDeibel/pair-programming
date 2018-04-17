$.widget('dotp.table', {

	options: {
		url: null, // ajax url for data
		expandUrl: null, // ajax url for row expand data
		expandForm: null, // json form for expand row
		btnSave: true,
		data: null, // non ajax data
		columns: null, // list of table columns
		type: null, // string - 
		dropdowns: null, // json of dropdowns for child forms (used to pass to sub tables/forms)
		elements: {
			$wrapper: null,
			search: {
				$wrapper: null,
				$input: null,
			},
			size: {
				$wrapper: null,
				$input: null,
			}
		},
		dataTable: null,
	},

	state: {

	},

	_create: function() {
		var $this = this;

		// Loader
		$this.element.append($loader);
		$this.element.addClass('loading');

		// Datatable options
		var dataTableOptions = {};
		dataTableOptions.columns = $this.options.columns;
		dataTableOptions.dom = "flrtip";
		dataTableOptions.rowCallback = function (row, data) {
			var $row = $(row);
			$row.click(function() {
				var rowIndex = $this.options.dataTable.row(row).index();
				$this._toggleRow($row, data, rowIndex);
			});
		}
		dataTableOptions.initComplete = function () {
			$this.options.elements.$wrapper = $this.element.closest('.dataTables_wrapper');

			// Search
			$this.options.elements.search.$wrapper = $this.options.elements.$wrapper.find('.dataTables_filter');
			$this.options.elements.search.$wrapper.find('label').contents().filter(function () { return this.nodeType === 3; }).remove();
			$this.options.elements.search.$input = $this.options.elements.search.$wrapper.find('input');
			$this.options.elements.search.$input.wrap('<div class="input text"></div>');
			$this.options.elements.search.$wrapper.find('.input').input({
				type: "text",
				label: "Search...",
				active: true,
			});

			// Page size
			$this.options.elements.size.$wrapper = $this.options.elements.$wrapper.find('.dataTables_length');
			$this.options.elements.size.$wrapper.find('label').contents().filter(function () { return this.nodeType === 3; }).remove();
			$this.options.elements.size.$input = $this.options.elements.size.$wrapper.find('select');
			$this.options.elements.size.$input.wrap('<div class="input select"></div>');
			$this.options.elements.size.$wrapper.find('.input').input({
				type: "select",
				label: "Page Size",
			});
			$this.options.elements.size.$wrapper.find('.input').css('max-width', '80px');
			$this.options.elements.size.$input.selectize({
				onItemAdd: function () {
					this.$wrapper.addClass('hasItemSelected');
				},
				onItemRemove: function() {
					this.$wrapper.removeClass('hasItemSelected');
				}
			});

			// Load complete
			$this.element.removeClass('loading');
			$this.options.elements.$wrapper.addClass('initComplete');
		}

		// Ajax
		var ajax = null;
		if ($this.options.url) {
			ajax = {
				"url": $this.options.url,
				"type": "POST",
				"beforeSend": function (request) {
					request.setRequestHeader('X-CSRF-TOKEN', $('meta[name="csrf-token"]').attr('content'));
				}
			}
			dataTableOptions.processing = true;
			dataTableOptions.serverSide = true;
			dataTableOptions.ajax = ajax;
		}
		else {
			if ($this.options.data != null && $this.options.data.length > 0) {
				dataTableOptions.data = $this.options.data;
			}
		}

		$this.options.dataTable = $this.element.DataTable(dataTableOptions);
	},

	_toggleRow: function($row, data, rowIndex) {
		var $this = this;

		// Render (if not already rendered)
		if (!$row.data('rendered')) {
			$row.data('rendered', true);

			// Toggle row template
			var $toggleRow = $('<tr class="toggleRow"><td colspan="' + $this.element.find('th').length + '"></td></tr>');

			var $toggle = $(
				'<div class="shadow bg-white loading row-details">' +
					'<div class="flex flow-vertical">' +
						'<div>' +
							'<div class="form"></div>' +
						'</div>' +
						($this.options.btnSave == true ? (
							'<div class="padding-x2 round-bottom bg-alt">' +
								'<a class="button btnSave">' + icons.save + '<span>Save</span></a>' +
							'</div>'
						) : "") + 
					'</div>' +
					
				'</div>'
			);

			$toggle.append($loader);

			var $form = $toggle.find('.form');

			// Insert toggle row
			$toggleRow.find('td').append($toggle);
			$row.after($toggleRow);

			// Activate row
			$row.data('active', true);
			$row.addClass('active');

			if ($this.options.expandUrl != null) {
				$.ajax({
					"url": $this.options.expandUrl,
					"method": "POST",
					"data": {id: data.id, "_token": $('meta[name="csrf-token"]').attr('content')},
					"success": function(detailsData) {
						console.log(detailsData);

						$toggle.removeClass('loading');

						$form.form({
							type: $this.options.type,
							data: detailsData,
							form: $this.options.expandForm,
						});

						if ($this.options.btnSave != null) {
							$toggle.find('.btnSave').click(function() {
								detailsData = $form.form('getData');

								var _detailsData = detailsData.fields;
								_detailsData._token = $('meta[name="csrf-token"]').attr('content');

								$.ajax({
									"url": window.location.href + "/update",
									"method": "POST",
									"data": _detailsData,
									"success": function (data) {
										$this.options.dataTable.row(rowIndex).invalidate().draw();
									}
								});
							});
						}
					}
				});
			}
			else {
				var callbackEditField = function(field, value) {
					data[field] = value;
				}
				var _data = {
					fields: data,
					dropdowns: $this.options.dropdowns,
				};
				console.log(_data);
				$form.form({
					type: $this.options.type,
					data: _data,
					callbackEditField: callbackEditField
				});
				$toggle.removeClass('loading');
			}
		}
		else {

			// Toggle
			if (!$row.data('active')) {
				$row.next('tr').show();
				$row.data('active', true);
				$row.addClass('active');
			}
			else {
				$row.next('tr').hide();
				$row.data('active', false);
				$row.removeClass('active');
			}
		}
	},

	_render: function() {
		var $this = this;
	},

	reload: function() {
		var $this = this;

		$this.options.dataTable.ajax.reload();
	}

});