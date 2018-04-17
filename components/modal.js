$.widget('dotp.modal', {

	options: {
		modal: true,
		title: "",
		resizable: false,
		open: null,
		buttons: null,
		padding: true,
		dialogClass: null,
	},

	_create: function() {
		var $this = this;
		$this.element.dialog({
			title: $this.options.title,
			modal: $this.options.modal,
			resizable: $this.options.resizable,
			buttons: $this.options.buttons,
			dialogClass: $this.options.dialogClass,
			open: function () {
				var $dialog = $(this);
				$dialog.closest('.ui-dialog').wrapInner('<div class="ui-dialog-inner"></div>');

				if ($this.options.open != null) {
					$this.options.open(this);
				}
				if (!$this.options.padding) {
					$this.element.addClass('padding-none');
				}
				var $dialog = $(this);

				// Button - close
				var $btnClose = $dialog.closest('.ui-dialog').find('.ui-dialog-titlebar-close');
				$btnClose.children().remove(); // remove jquery icon
				$btnClose.text(''); // remove text
				$btnClose.append(icons.cancel);

				// Button - save
				var $btnSave = $dialog.closest('.ui-dialog').find('.ui-dialog-buttonset').find('.btn-save');
				$btnSave.wrapInner('<span></span>');
				$btnSave.prepend(icons.save);
			}
		});
	}

});