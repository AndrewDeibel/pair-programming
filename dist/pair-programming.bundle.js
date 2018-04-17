/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pair-programming.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/form.js":
/*!****************************!*\
  !*** ./components/form.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$.widget('dotp.form', {\n\n\toptions: {\n\t\ttype: null, // string - type of form (\"species\", \"users\")\n\t\tdata: {\n\t\t\tfields: null, // object - properties are fields with data\n\t\t\tdropdowns: null, // object - properties are dropdowns with data\n\t\t},\n\t\tform: null, // object - require json\n\t\tcallbackEditField: null, // method callback when expand row form field edited\n\t},\n\n\t// Constructor\n\t_create: function() {\n\t\tvar $this = this;\n\t\t$this.__setForm();\n\t\t$this._render();\n\t},\n\n\t// Get data - public\n\tgetData: function() {\n\t\tvar $this = this;\n\t\t$.each($this.options.form.tabs, function(index, tab) {\n\t\t\tif ($this.options.data.fields == null) {\n\t\t\t\t$this.options.data.fields = {};\n\t\t\t}\n\t\t\t$.each(tab.fields, function(index, field) {\n\t\t\t\tvar $field = $this.element.find('.field-' + field.id);\n\t\t\t\tswitch(field.type) {\n\t\t\t\t\tcase \"text\": {\n\t\t\t\t\t\t$this.options.data.fields[field.id] = $field.find('input').val();\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t\tcase \"select\": {\n\t\t\t\t\t\t$this.options.data.fields[field.id] = $field.find('select').val();\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t\tcase \"checkbox\": {\n\t\t\t\t\t\t$this.options.data.fields[field.id] = $field.find('input').is(':checked');\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t\tcase \"wysiwyg\": {\n\t\t\t\t\t\t$this.options.data.fields[field.id] = $field.froalaEditor('html.get');\n\t\t\t\t\t\tbreak;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t});\n\t\t});\n\t\treturn $this.options.data;\n\t},\n\n\t// Push data - public\n\tpushData: function(data) {\n\t\tvar $this = this;\n\t\t$this.options.data = data;\n\t\t$this._render();\n\t},\n\n\t// Push tabs\n\t__setForm: function() {\n\t\tvar $this = this;\n\n\t\t// No longer needed, form is provided by expand row\n\t\t// switch($this.options.type) {\n\t\t// \tcase \"demo\": {\n\t\t// \t\t$this.options.form = require('./forms/demo.js');\n\t\t// \t\tbreak;\n\t\t// \t}\n\t\t// }\n\n\t\t// If fields null, set obj structure from form so save has all required properties\n\t\tif ($this.options.data.fields == null) {\n\t\t\tif ($this.options.form.tabs != null) {\n\t\t\t\t$.each($this.options.form.tabs, function(index, tab) {\n\t\t\t\t\tif (tab.fields != null) {\n\t\t\t\t\t\t$this.options.data.fields = {};\n\t\t\t\t\t\t$.each(tab.fields, function(index, field) {\n\t\t\t\t\t\t\tif (field.default != null) {\n\t\t\t\t\t\t\t\t$this.options.data.fields[field.id] = field.default;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\telse {\n\t\t\t\t\t\t\t\t$this.options.data.fields[field.id] = null;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t});\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t}\n\t\t\t$this.options.form\n\t\t}\n\t},\n\n\t// Render\n\t_render: function() {\n\t\tvar $this = this;\n\t\tif ($this.options.form.tabs) {\n\t\t\t$this.__renderTabs();\n\t\t}\n\t\telse {\n\t\t\t// TODO: need to render form similar to render tabs\n\t\t\t// then pass in as template for fields to be appended\n\t\t\t$this.__renderFields($this.options.form.fields, );\n\t\t}\n\t},\n\t\n\t// Render tabs\n\t__renderTabs: function () {\n\t\tvar $this = this;\n\n\t\t// Form\n\t\tvar $form = $('<div class=\"tabs\"><ul></ul></div>');\n\n\t\t// Loop through tabs\n\t\t$.each($this.options.form.tabs, function(index, tab) {\n\t\t\t$this.__renderTab(tab, $form);\n\t\t});\n\n\t\t// Append form and call tabs\n\t\t$this.element.append($form);\n\t\t$form.tabs();\n\t\t$form.find('.ui-tabs-nav a').click(function(e) {\n\t\t    e.preventDefault();\n\t\t    e.stopPropagation();\n\t\t});\n\t},\n\n\t// Render field\n\t__renderField: function (field, template) {\n\t\tvar $this = this;\n\n\t\t// Render input and replace field in template\n\t\tvar $input = null;\n\t\tswitch(field.type) {\n\t\t\tcase \"text\": { // Text\n\t\t\t\t$input = $(\n\t\t\t\t\t'<div class=\"input text field-' + field.id + '\">' +\n\t\t\t\t\t\t'<label for=\"input-' + field.id + '\">' + field.label + '</label>' +\n\t\t\t\t\t\t'<input type=\"text\" id=\"input-' + field.id + '\" />' +\n\t\t\t\t\t'</div>'\n\t\t\t\t);\n\t\t\t\tif ($this.options.data.fields != null) {\n\t\t\t\t\t$input.find('input').val($this.options.data.fields[field.id]);\n\t\t\t\t}\n\n\t\t\t\t$input.find('input').change(function() {\n\t\t\t\t\t$this.callbackEditField(field.id, $input.find('input').val());\n\t\t\t\t});\n\n\t\t\t\t// Input\n\t\t\t\t$input.input();\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\tcase \"wysiwyg\": { // WYSIWYG Editor\n\t\t\t\t$input = $(\n\t\t\t\t\t'<div class=\"wysiwyg field-' + field.id + '\"></div>'\n\t\t\t\t);\n\t\t\t\tif ($this.options.data.fields != null) {\n\t\t\t\t\t$input.html($this.options.data.fields[field.id]);\n\t\t\t\t}\n\t\t\t\t$input.froalaEditor();\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\tcase \"checkbox\": { // Checkbox\n\t\t\t\t$input = $(\n\t\t\t\t\t'<div class=\"input checkbox field-' + field.id + '\">' +\n\t\t\t\t\t\t'<input type=\"checkbox\" id=\"input-' + field.id + '\" />' +\n\t\t\t\t\t\t'<label for=\"input-' + field.id + '\">' + field.label + '</label>' +\n\t\t\t\t\t'</div>'\n\t\t\t\t);\n\t\t\t\tif ($this.options.data.fields != null) {\n\t\t\t\t\t$input.find('input').is(':checked', $this.options.data.fields[field.id]);\n\t\t\t\t}\n\n\t\t\t\t$input.find('input').change(function() {\n\t\t\t\t\t$this.callbackEditField(field.id, $input.find('input').is(':checked'));\n\t\t\t\t});\n\n\t\t\t\t// Input\n\t\t\t\t$input.input();\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\tcase \"select\": { // Select\n\t\t\t\t$input = $(\n\t\t\t\t\t'<div class=\"input select field-' + field.id + '\">' +\n\t\t\t\t\t\t'<label for=\"input-' + field.id + '\">' + field.label + '</label>' +\n\t\t\t\t\t\t'<select id=\"input-' + field.id + '\"><option></option></select>' +\n\t\t\t\t\t'</div>'\n\t\t\t\t);\n\t\t\t\tvar $select = $input.find('select');\n\t\t\t\tvar defaultValue = null;\n\n\t\t\t\t// Get options for dropdown from options.data, add to dropdown\n\t\t\t\tif ($this.options.data.dropdowns != null) {\n\t\t\t\t\tvar options = $this.options.data.dropdowns[field.id].data;\n\t\t\t\t\tdefaultValue = $this.options.data.dropdowns[field.id].default;\n\t\t\t\t\t$.each(options, function(value, text) {\n\t\t\t\t\t\tvar selected = value == defaultValue ? \"selected\" : \"\";\n\t\t\t\t\t\t$select.append($('<option value=\"' + value + '\" ' + selected + '>' + text + '</option>'));\n\t\t\t\t\t});\n\t\t\t\t}\n\n\t\t\t\t// Set selected value\n\t\t\t\tif ($this.options.data.fields != null && defaultValue == null) {\n\t\t\t\t\t$select.val($this.options.data.fields[field.id]);\n\t\t\t\t}\n\n\t\t\t\t// Multi\n\t\t\t\tif (field.options && field.options.multi) {\n\t\t\t\t\t$select.prop('multiple', true);\n\t\t\t\t}\n\n\t\t\t\t// Selectize\n\t\t\t\t$select.selectize({\n\t\t\t\t\tonItemAdd: function () {\n\t\t\t\t\t\tthis.$wrapper.closest('.input').addClass('hasValue');\n\t\t\t\t\t},\n\t\t\t\t\tonItemRemove: function() {\n\t\t\t\t\t\tthis.$wrapper.closest('.input').removeClass('hasValue');\n\t\t\t\t\t},\n\t\t\t\t\tdropdownParent: 'body',\n\t\t\t\t});\n\n\t\t\t\t$select.change(function() {\n\t\t\t\t\t$this.callbackEditField(field.id, $select.val());\n\t\t\t\t});\n\n\t\t\t\t// Input\n\t\t\t\t$input.input();\n\t\t\t\tbreak;\n\t\t\t}\n\t\t}\n\n\t\t// Find field in template and replace\n\t\tvar $placeholder = template.find('#' + field.id);\n\t\t$placeholder.replaceWith($input)\n\t},\n\n\t// Render fields\n\t__renderFields: function (fields, template) {\n\t\tvar $this = this;\n\n\t\t// Loop through fields and render to template\n\t\t$.each(fields, function(index, field) {\n\t\t\t$this.__renderField(field, template);\n\t\t});\n\t},\n\n\t// Render tab\n\t__renderTab: function (tab, $form) {\n\t\tvar $this = this;\n\n\t\t// Tab list item\n\t\tvar $tabItem = $('<li><a href=\"#tab-' + tab.id + '\">' + tab.text + '</a></li>');\n\t\t$form.find('ul').append($tabItem);\n\n\t\t// Tab content\n\t\tvar $tabContent = $('<div id=\"tab-' + tab.id + '\"></div>');\n\t\t$tabContent.append($(tab.template));\n\n\t\t// Fields\n\t\tif (tab.fields != null) {\n\t\t\t$this.__renderFields(tab.fields, $tabContent);\n\t\t}\n\n\t\t// Table\n\t\tif (tab.table != null) {\n\n\t\t\t// Render table\n\t\t\tvar $table = $(\"<table><thead><tr></tr></thead><tbody></tbody></table>\");\n\t\t\tvar $theadtr = $table.find('thead tr');\n\n\t\t\t// Render column\n\t\t\tvar renderColumn = function(column) {\n\t\t\t\tvar $th = $('<th>' + column.title + '</th>');\n\t\t\t\t$theadtr.append($th);\n\t\t\t}\n\n\t\t\t$this.options.data.fields\n\n\t\t\t// Loop through columns and render to template\n\t\t\t$.each(tab.table.columns, function(index, column) {\n\n\t\t\t\trenderColumn(column);\n\t\t\t});\n\n\t\t\t// Callback when expand row form field is edited\n\t\t\tvar callbackEditField = function() {\n\n\t\t\t}\n\n\t\t\t// Table\n\t\t\t$table.table({\n\t\t\t\tcolumns: tab.table.columns,\n\t\t\t\ttype: tab.table.type,\n\t\t\t\tdata: $this.options.data.tables[tab.id],\n\t\t\t\tbtnSave: tab.table.btnSave,\n\t\t\t\tdropdowns: $this.options.data.dropdowns,\n\t\t\t\tcallbackEditField: callbackEditField,\n\t\t\t});\n\n\t\t\t// Find table in template and replace\n\t\t\tvar $placeholder = $tabContent.find('#' + tab.table.id);\n\t\t\t$placeholder.replaceWith($table);\n\t\t}\n\n\t\t$form.append($tabContent);\n\t},\n\n});\n\n//# sourceURL=webpack:///./components/form.js?");

/***/ }),

/***/ "./components/icons.js":
/*!*****************************!*\
  !*** ./components/icons.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Get icons\n$.get(\"/icons/icons.svg\", function (data) {\n\n\t// Add icons to SVG sprite\n\tvar $svgSprit = $('<div id=\"svgSprite\"></div>');\n\t$svgSprit[0].innerHTML = new XMLSerializer().serializeToString(data.documentElement);\n\t$('body').prepend($svgSprit);\n\n\t// Global icons object\n\tvar icons = {};\n\t$('#svgSprite').find('symbol').each(function(index, symbol) {\n\t\tvar iconId = $(symbol).prop('id');\n\t\tvar iconName = iconId.replace('icon-', '').replace('-', '_');\n\t\ticons[iconName] = '<svg class=\"' + iconId + '\"><use xlink:href=\"#' + iconId + '\"></use></svg>';\n\t});\n\twindow.icons = icons;\n});\n\n//# sourceURL=webpack:///./components/icons.js?");

/***/ }),

/***/ "./components/images.js":
/*!******************************!*\
  !*** ./components/images.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$.widget('dotp.images', {\n\n\toptions: {\n\t\tdata: [\"http://lorempixel.com/100/100/nature/1\", \"http://lorempixel.com/100/100/nature/2\", \"http://lorempixel.com/100/100/nature/3\"],\n\t\tindex: 4,\n\t},\n\n\t_create: function() {\n\t\tvar $this = this;\n\t\t$this._render();\n\t},\n\n\t_render: function() {\n\t\tvar $this = this;\n\t\tvar $wrapper = $('<div class=\"flex padded\"></div>');\n\t\tvar renderImage = function(image) {\n\t\t\tvar $col = $('<div class=\"relative\"><img src=\"' + image + '\" /></div>');\n\t\t\tvar $btnRemove = $('<a class=\"btn-remove shadow button small red absolute top right square\">' + icons.cancel + '</a>');\n\t\t\t$btnRemove.click(function() {\n\t\t\t\t$col.remove();\n\t\t\t});\n\t\t\t$col.append($btnRemove);\n\t\t\t$wrapper.append($col);\n\t\t}\n\t\t$.each($this.options.data, function(index, image) {\n\t\t\trenderImage(image);\n\t\t});\n\n\t\tvar $btnAdd = $('<a class=\"btn-add button\">' + icons.plus + '<span>New Image</span></a>');\n\t\t$btnAdd.click(function() {\n\t\t\trenderImage(\"http://lorempixel.com/100/100/nature/\" + $this.options.index);\n\t\t\t$this.options.index++;\n\t\t});\n\t\t$wrapper.append('<div class=\"xlarge-12\"></div>');\n\n\t\t$this.element.append($wrapper);\n\n\t\t$wrapper.sortable({\n\t\t\ttolerance: \"pointer\",\n\t\t});\n\t},\n\n});\n\n//# sourceURL=webpack:///./components/images.js?");

/***/ }),

/***/ "./components/input.js":
/*!*****************************!*\
  !*** ./components/input.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$.widget('dotp.input', {\n\n\toptions: {\n\t\telements: {\n\t\t\t$text: null,\n\t\t\t$select: null,\n\t\t\t$checkbox: null,\n\t\t\t$radio: null,\n\t\t\t$toggle: null\n\t\t},\n\t\ttype: null,\t// string - text, select, checkbox, radio, toggle\n\t\tlabel: null, // string - if provided, add label element\n\t\tactive: null, // bool - if true force active\n\t},\n\n\tstate: {\n\t\tactive: false,\n\t},\n\n\t_create: function () {\n\t\tvar $this = this;\n\n\t\t// State\n\t\tif ($this.options.active) {\n\t\t\t$this.state.active = true;\n\t\t}\n\n\t\t// Label\n\t\tif ($this.options.label != null) {\n\t\t\t$this.element.prepend($('<label>' + $this.options.label + '</label>'));\n\t\t}\n\n\t\t// Type\n\t\tif ($this.options.type != null) {\n\t\t\t$this.element.addClass($this.options.type);\n\t\t}\n\t\telse {\n\t\t\tif ($this.element.hasClass('text')) {\n\t\t\t\t$this.options.type = \"text\";\n\t\t\t} else if ($this.element.hasClass('select')) {\n\t\t\t\t$this.options.type = \"select\";\n\t\t\t} else if ($this.element.hasClass('select-color')) {\n\t\t\t\t$this.options.type = \"select-color\";\n\t\t\t} else if ($this.element.hasClass('checkbox')) {\n\t\t\t\t$this.options.type = \"checkbox\";\n\t\t\t} else if ($this.element.hasClass('radio')) {\n\t\t\t\t$this.options.type = \"radio\";\n\t\t\t} else if ($this.element.hasClass('toggle')) {\n\t\t\t\t$this.options.type = \"toggle\";\n\t\t\t}\n\t\t}\n\n\t\t// Elements\n\t\tswitch ($this.options.type) {\n\t\t\tcase \"text\": {\n\t\t\t\t$this.options.elements.$text = $this.element.find('input');\n\t\t\t\tvar textChange = function () {\n\t\t\t\t\tvar value = $this.options.elements.$text.val()\n\t\t\t\t\tif (value != \"\" || $this.options.active) {\n\t\t\t\t\t\t$this.element.addClass(\"hasValue\");\n\t\t\t\t\t}\n\t\t\t\t\telse {\n\t\t\t\t\t\t$this.element.removeClass(\"hasValue\");\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t$this.options.elements.$text.keyup(function() {\n\t\t\t\t\ttextChange();\n\t\t\t\t});\n\t\t\t\ttextChange();\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\tcase \"select\": {\n\t\t\t\t$this.options.elements.$select = $this.element.find('select');\n\t\t\t\tvar selectChange = function () {\n\t\t\t\t\tvar value = $this.options.elements.$select.val();\n\t\t\t\t\tif (value !== \"0\" || $this.options.active) {\n\t\t\t\t\t\t$this.element.addClass(\"hasValue\");\n\t\t\t\t\t}\n\t\t\t\t\telse {\n\t\t\t\t\t\t$this.element.removeClass(\"hasValue\");\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t$this.options.elements.$select.change(function() {\n\t\t\t\t\tselectChange();\n\t\t\t\t});\n\t\t\t\tselectChange();\n\t\t\t\t$this.options.elements.$select.selectize({\n\t\t\t\t\tonItemAdd: function () {\n\t\t\t\t\t\tthis.$wrapper.closest('.input').addClass('hasValue');\n\t\t\t\t\t},\n\t\t\t\t\tonItemRemove: function() {\n\t\t\t\t\t\tthis.$wrapper.closest('.input').removeClass('hasValue');\n\t\t\t\t\t},\n\t\t\t\t\tdropdownParent: 'body',\n\t\t\t\t});\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\tcase \"checkbox\": {\n\t\t\t\t$this.options.elements.$checkbox = $this.element.find('input');\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\tcase \"radio\": {\n\t\t\t\t$this.options.elements.$radio = $this.element.find('input');\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\tcase \"toggle\": {\n\t\t\t\t$this.options.elements.$toggle = $this.element.find('input');\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\tcase \"tiles\": {\n\t\t\t\t$this.options.elements.$select = $this.element.find('select');\n\t\t\t}\n\t\t}\n\t}\n\n});\n\n//# sourceURL=webpack:///./components/input.js?");

/***/ }),

/***/ "./components/menu.js":
/*!****************************!*\
  !*** ./components/menu.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$.widget('dotp.menu', {\n\n\toptions: {\n\t\tdrilldown: false,\n\t},\n\n\t_create: function() {\n\t\tvar $this = this;\n\t\t$this._render();\n\t},\n\n\t_render: function() {\n\t\tvar $this = this;\n\t\tvar $lis = $this.element.find('li');\n\t\tvar $ulRoot = $this.element.children('ul');\n\t\t\n\t\tif ($this.options.drilldown) {\n\t\t\tvar width = $this.element.find('ul').width();\n\t\t\t$this.element.width(width);\n\t\t\t$this.element.addClass(\"drilldown\");\n\t\t}\n\n\t\t$lis.click(function() {\n\t\t\tvar $li = $(this);\n\t\t\tvar $ul = $li.children('ul');\n\t\t\t$li.toggleClass('active');\n\n\t\t\tvar width = $li.width();\n\t\t\t$this.element.width(width);\n\n\t\t\tvar position = $ul.position().left;\n\t\t\t$ulRoot.css('left', -position);\n\t\t\t\n\t\t\tif ($ul.children('.btnBack').length == 0) {\n\t\t\t\t$ul.prepend('<a class=\"button btnBack square\">' + icons.chevron + '<span>Back</span></a>');\n\t\t\t}\n\t\t});\n\t},\n\n});\n\n//# sourceURL=webpack:///./components/menu.js?");

/***/ }),

/***/ "./components/modal.js":
/*!*****************************!*\
  !*** ./components/modal.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$.widget('dotp.modal', {\n\n\toptions: {\n\t\tmodal: true,\n\t\ttitle: \"\",\n\t\tresizable: false,\n\t\topen: null,\n\t\tbuttons: null,\n\t\tpadding: true,\n\t\tdialogClass: null,\n\t},\n\n\t_create: function() {\n\t\tvar $this = this;\n\t\t$this.element.dialog({\n\t\t\ttitle: $this.options.title,\n\t\t\tmodal: $this.options.modal,\n\t\t\tresizable: $this.options.resizable,\n\t\t\tbuttons: $this.options.buttons,\n\t\t\tdialogClass: $this.options.dialogClass,\n\t\t\topen: function () {\n\t\t\t\tvar $dialog = $(this);\n\t\t\t\t$dialog.closest('.ui-dialog').wrapInner('<div class=\"ui-dialog-inner\"></div>');\n\n\t\t\t\tif ($this.options.open != null) {\n\t\t\t\t\t$this.options.open(this);\n\t\t\t\t}\n\t\t\t\tif (!$this.options.padding) {\n\t\t\t\t\t$this.element.addClass('padding-none');\n\t\t\t\t}\n\t\t\t\tvar $dialog = $(this);\n\n\t\t\t\t// Button - close\n\t\t\t\tvar $btnClose = $dialog.closest('.ui-dialog').find('.ui-dialog-titlebar-close');\n\t\t\t\t$btnClose.children().remove(); // remove jquery icon\n\t\t\t\t$btnClose.text(''); // remove text\n\t\t\t\t$btnClose.append(icons.cancel);\n\n\t\t\t\t// Button - save\n\t\t\t\tvar $btnSave = $dialog.closest('.ui-dialog').find('.ui-dialog-buttonset').find('.btn-save');\n\t\t\t\t$btnSave.wrapInner('<span></span>');\n\t\t\t\t$btnSave.prepend(icons.save);\n\t\t\t}\n\t\t});\n\t}\n\n});\n\n//# sourceURL=webpack:///./components/modal.js?");

/***/ }),

/***/ "./components/table.js":
/*!*****************************!*\
  !*** ./components/table.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$.widget('dotp.table', {\n\n\toptions: {\n\t\turl: null, // ajax url for data\n\t\texpandUrl: null, // ajax url for row expand data\n\t\texpandForm: null, // json form for expand row\n\t\tbtnSave: true,\n\t\tdata: null, // non ajax data\n\t\tcolumns: null, // list of table columns\n\t\ttype: null, // string - \n\t\tdropdowns: null, // json of dropdowns for child forms (used to pass to sub tables/forms)\n\t\telements: {\n\t\t\t$wrapper: null,\n\t\t\tsearch: {\n\t\t\t\t$wrapper: null,\n\t\t\t\t$input: null,\n\t\t\t},\n\t\t\tsize: {\n\t\t\t\t$wrapper: null,\n\t\t\t\t$input: null,\n\t\t\t}\n\t\t},\n\t\tdataTable: null,\n\t},\n\n\tstate: {\n\n\t},\n\n\t_create: function() {\n\t\tvar $this = this;\n\n\t\t// Loader\n\t\t$this.element.append($loader);\n\t\t$this.element.addClass('loading');\n\n\t\t// Datatable options\n\t\tvar dataTableOptions = {};\n\t\tdataTableOptions.columns = $this.options.columns;\n\t\tdataTableOptions.dom = \"flrtip\";\n\t\tdataTableOptions.rowCallback = function (row, data) {\n\t\t\tvar $row = $(row);\n\t\t\t$row.click(function() {\n\t\t\t\tvar rowIndex = $this.options.dataTable.row(row).index();\n\t\t\t\t$this._toggleRow($row, data, rowIndex);\n\t\t\t});\n\t\t}\n\t\tdataTableOptions.initComplete = function () {\n\t\t\t$this.options.elements.$wrapper = $this.element.closest('.dataTables_wrapper');\n\n\t\t\t// Search\n\t\t\t$this.options.elements.search.$wrapper = $this.options.elements.$wrapper.find('.dataTables_filter');\n\t\t\t$this.options.elements.search.$wrapper.find('label').contents().filter(function () { return this.nodeType === 3; }).remove();\n\t\t\t$this.options.elements.search.$input = $this.options.elements.search.$wrapper.find('input');\n\t\t\t$this.options.elements.search.$input.wrap('<div class=\"input text\"></div>');\n\t\t\t$this.options.elements.search.$wrapper.find('.input').input({\n\t\t\t\ttype: \"text\",\n\t\t\t\tlabel: \"Search...\",\n\t\t\t\tactive: true,\n\t\t\t});\n\n\t\t\t// Page size\n\t\t\t$this.options.elements.size.$wrapper = $this.options.elements.$wrapper.find('.dataTables_length');\n\t\t\t$this.options.elements.size.$wrapper.find('label').contents().filter(function () { return this.nodeType === 3; }).remove();\n\t\t\t$this.options.elements.size.$input = $this.options.elements.size.$wrapper.find('select');\n\t\t\t$this.options.elements.size.$input.wrap('<div class=\"input select\"></div>');\n\t\t\t$this.options.elements.size.$wrapper.find('.input').input({\n\t\t\t\ttype: \"select\",\n\t\t\t\tlabel: \"Page Size\",\n\t\t\t});\n\t\t\t$this.options.elements.size.$wrapper.find('.input').css('max-width', '80px');\n\t\t\t$this.options.elements.size.$input.selectize({\n\t\t\t\tonItemAdd: function () {\n\t\t\t\t\tthis.$wrapper.addClass('hasItemSelected');\n\t\t\t\t},\n\t\t\t\tonItemRemove: function() {\n\t\t\t\t\tthis.$wrapper.removeClass('hasItemSelected');\n\t\t\t\t}\n\t\t\t});\n\n\t\t\t// Load complete\n\t\t\t$this.element.removeClass('loading');\n\t\t\t$this.options.elements.$wrapper.addClass('initComplete');\n\t\t}\n\n\t\t// Ajax\n\t\tvar ajax = null;\n\t\tif ($this.options.url) {\n\t\t\tajax = {\n\t\t\t\t\"url\": $this.options.url,\n\t\t\t\t\"type\": \"POST\",\n\t\t\t\t\"beforeSend\": function (request) {\n\t\t\t\t\trequest.setRequestHeader('X-CSRF-TOKEN', $('meta[name=\"csrf-token\"]').attr('content'));\n\t\t\t\t}\n\t\t\t}\n\t\t\tdataTableOptions.processing = true;\n\t\t\tdataTableOptions.serverSide = true;\n\t\t\tdataTableOptions.ajax = ajax;\n\t\t}\n\t\telse {\n\t\t\tif ($this.options.data != null && $this.options.data.length > 0) {\n\t\t\t\tdataTableOptions.data = $this.options.data;\n\t\t\t}\n\t\t}\n\n\t\t$this.options.dataTable = $this.element.DataTable(dataTableOptions);\n\t},\n\n\t_toggleRow: function($row, data, rowIndex) {\n\t\tvar $this = this;\n\n\t\t// Render (if not already rendered)\n\t\tif (!$row.data('rendered')) {\n\t\t\t$row.data('rendered', true);\n\n\t\t\t// Toggle row template\n\t\t\tvar $toggleRow = $('<tr class=\"toggleRow\"><td colspan=\"' + $this.element.find('th').length + '\"></td></tr>');\n\n\t\t\tvar $toggle = $(\n\t\t\t\t'<div class=\"shadow bg-white loading row-details\">' +\n\t\t\t\t\t'<div class=\"flex flow-vertical\">' +\n\t\t\t\t\t\t'<div>' +\n\t\t\t\t\t\t\t'<div class=\"form\"></div>' +\n\t\t\t\t\t\t'</div>' +\n\t\t\t\t\t\t($this.options.btnSave == true ? (\n\t\t\t\t\t\t\t'<div class=\"padding-x2 round-bottom bg-alt\">' +\n\t\t\t\t\t\t\t\t'<a class=\"button btnSave\">' + icons.save + '<span>Save</span></a>' +\n\t\t\t\t\t\t\t'</div>'\n\t\t\t\t\t\t) : \"\") + \n\t\t\t\t\t'</div>' +\n\t\t\t\t\t\n\t\t\t\t'</div>'\n\t\t\t);\n\n\t\t\t$toggle.append($loader);\n\n\t\t\tvar $form = $toggle.find('.form');\n\n\t\t\t// Insert toggle row\n\t\t\t$toggleRow.find('td').append($toggle);\n\t\t\t$row.after($toggleRow);\n\n\t\t\t// Activate row\n\t\t\t$row.data('active', true);\n\t\t\t$row.addClass('active');\n\n\t\t\tif ($this.options.expandUrl != null) {\n\t\t\t\t$.ajax({\n\t\t\t\t\t\"url\": $this.options.expandUrl,\n\t\t\t\t\t\"method\": \"POST\",\n\t\t\t\t\t\"data\": {id: data.id, \"_token\": $('meta[name=\"csrf-token\"]').attr('content')},\n\t\t\t\t\t\"success\": function(detailsData) {\n\t\t\t\t\t\tconsole.log(detailsData);\n\n\t\t\t\t\t\t$toggle.removeClass('loading');\n\n\t\t\t\t\t\t$form.form({\n\t\t\t\t\t\t\ttype: $this.options.type,\n\t\t\t\t\t\t\tdata: detailsData,\n\t\t\t\t\t\t\tform: $this.options.expandForm,\n\t\t\t\t\t\t});\n\n\t\t\t\t\t\tif ($this.options.btnSave != null) {\n\t\t\t\t\t\t\t$toggle.find('.btnSave').click(function() {\n\t\t\t\t\t\t\t\tdetailsData = $form.form('getData');\n\n\t\t\t\t\t\t\t\tvar _detailsData = detailsData.fields;\n\t\t\t\t\t\t\t\t_detailsData._token = $('meta[name=\"csrf-token\"]').attr('content');\n\n\t\t\t\t\t\t\t\t$.ajax({\n\t\t\t\t\t\t\t\t\t\"url\": window.location.href + \"/update\",\n\t\t\t\t\t\t\t\t\t\"method\": \"POST\",\n\t\t\t\t\t\t\t\t\t\"data\": _detailsData,\n\t\t\t\t\t\t\t\t\t\"success\": function (data) {\n\t\t\t\t\t\t\t\t\t\t$this.options.dataTable.row(rowIndex).invalidate().draw();\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t});\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t}\n\t\t\telse {\n\t\t\t\tvar callbackEditField = function(field, value) {\n\t\t\t\t\tdata[field] = value;\n\t\t\t\t}\n\t\t\t\tvar _data = {\n\t\t\t\t\tfields: data,\n\t\t\t\t\tdropdowns: $this.options.dropdowns,\n\t\t\t\t};\n\t\t\t\tconsole.log(_data);\n\t\t\t\t$form.form({\n\t\t\t\t\ttype: $this.options.type,\n\t\t\t\t\tdata: _data,\n\t\t\t\t\tcallbackEditField: callbackEditField\n\t\t\t\t});\n\t\t\t\t$toggle.removeClass('loading');\n\t\t\t}\n\t\t}\n\t\telse {\n\n\t\t\t// Toggle\n\t\t\tif (!$row.data('active')) {\n\t\t\t\t$row.next('tr').show();\n\t\t\t\t$row.data('active', true);\n\t\t\t\t$row.addClass('active');\n\t\t\t}\n\t\t\telse {\n\t\t\t\t$row.next('tr').hide();\n\t\t\t\t$row.data('active', false);\n\t\t\t\t$row.removeClass('active');\n\t\t\t}\n\t\t}\n\t},\n\n\t_render: function() {\n\t\tvar $this = this;\n\t},\n\n\treload: function() {\n\t\tvar $this = this;\n\n\t\t$this.options.dataTable.ajax.reload();\n\t}\n\n});\n\n//# sourceURL=webpack:///./components/table.js?");

/***/ }),

/***/ "./pair-programming.js":
/*!*****************************!*\
  !*** ./pair-programming.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Components\n__webpack_require__(/*! ./components/icons */ \"./components/icons.js\");\n__webpack_require__(/*! ./components/input */ \"./components/input.js\");\n__webpack_require__(/*! ./components/table */ \"./components/table.js\");\n__webpack_require__(/*! ./components/modal */ \"./components/modal.js\");\n__webpack_require__(/*! ./components/form */ \"./components/form.js\");\n__webpack_require__(/*! ./components/images */ \"./components/images.js\");\n__webpack_require__(/*! ./components/menu */ \"./components/menu.js\");\n\nwindow.$loader = $('<div class=\"loader-wrapper\"><div class=\"loader\"><svg width=\"65px\" height=\"65px\" viewBox=\"0 0 66 66\" xmlns=\"http://www.w3.org/2000/svg\"><circle class=\"path\" fill=\"none\" stroke-width=\"6\" stroke-linecap=\"round\" cx=\"33\" cy=\"33\" r=\"30\"></circle></svg></div></div>');\n\n$(function() {\n\t$('.input').input();\n});\n\n//# sourceURL=webpack:///./pair-programming.js?");

/***/ })

/******/ });