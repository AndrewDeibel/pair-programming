module.exports = {
	type: "demo",
	fields: [
		{
			label: "Species",
			type: "tile",
			id: "species",
		}, {
			label: "Base Color",
			type: "color",
			id: "base_color",
		}, {
			label: "Eye Color",
			type: "color",
			id: "eye_color",
		}, {
			label: "Eyebrow Color",
			type: "color",
			id: "eyebrow_color",
		}, {
			label: "Tounge Color",
			type: "color",
			id: "tounge_color",
		}, {
			label: "Paw Pad Color",
			type: "color",
			id: "paw_pad_color",
		}, {
			label: "Claws Color",
			type: "color",
			id: "claws_color",
		}, {
			label: "Lips Color",
			type: "color",
			id: "lips_color",
		}, {
			label: "Marking",
			type: "select",
			id: "marking",
		}
	],
	template: (
		'<div class="padding-x2">' +
			'<div class="flex padded flow-vertical">' +
				'<div>' +
					'<field id="species" />' +
				'</div>' +
				'<div>' +
					'<field id="eye_color" />' +
				'</div>' +
				'<div>' +
					'<field id="eyebrow_color" />' +
				'</div>' +
				'<div>' +
					'<field id="tounge_color" />' +
				'</div>' +
				'<div>' +
					'<field id="paw_pad_color" />' +
				'</div>' +
				'<div>' +
					'<field id="claws_color" />' +
				'</div>' +
				'<div>' +
					'<field id="lips_color" />' +
				'</div>' +
				'<div>' +
					'<field id="marking" />' +
				'</div>' +
			'</div>' +
		'</div>'
	)
}