'use strict';
require.config({
    baseUrl: 'media/js/'
});

let Colors = {
	order: ['white', 'black', 'shade', 'light', 'red', 'pink', 'purple', 'deeppurple', 'indigo', 'blue', 'lightblue', 'cyan', 'teal', 'green', 'lightgreen', 'lime', 'yellow', 'amber', 'orange', 'deeporange', 'brown', 'grey', 'bluegrey'],
	nameMapping: {
		'white': 'White',
		'black': 'Black',
		'shade': 'Shade',
		'light': 'Light',
		'red': 'Red',
		'pink': 'Pink',
		'purple': 'Purple',
		'deeppurple': 'Deep Purple',
		'indigo': 'Indigo',
		'blue': 'Blue',
		'lightblue': 'Light Blue',
		'cyan': 'Cyan',
		'teal': 'Teal',
		'green': 'Green',
		'lightgreen': 'Light Green',
		'lime': 'Lime',
		'yellow': 'Yellow',
		'amber': 'Amber',
		'orange': 'Orange',
		'deeporange': 'Deep Orange',
		'brown': 'Brown',
		'grey': 'Grey',
		'bluegrey': 'Blue Grey'
	},
	textColors: {
		white: 'black',
		shade: 'black',
		light: 'black'
	},
	cardTemplate: '<div class="info-box-content {{ className }} inline-block-children {{ textColor }}">' +
		'<div>' +
			'<div class="icon fas fa-palette"></div>' +
		'</div>' +
		'<div class="text bg-shade-20">' +
			'<h4>{{ colorName }}</h4>' +
			'<p>rgba({{ rgba }})</p>' +
			'<p class="hex">#{{ hex }}</p>' +
		'</div>' +
	'</div>',
	prefixes: ['bg', 'border'],
	noHexColors: ['shade', 'light'],
	noShadeColors: ['white', 'black'],
	displayColors: function (mavor, sablono) {
		mavor.get('colors').then(function (response) {
			response.text().then(function (text) {
				let lines = text.split('\n'),
					colors = {};

				lines.forEach(function (line, i) {
					let className = '',
						splitClassName = [],
						rule = '',
						rgba = [],
						colorName = '',
						shade = '';

					if (line.indexOf('.') === 0) {
						className = line.split('.')[1].split(' {')[0];
						splitClassName = className.split('-');

						if (Colors.prefixes.indexOf(splitClassName[0]) > -1) {
							colorName = splitClassName[1];
							shade = splitClassName[2];
						} else {
							colorName = splitClassName[0];
							shade = splitClassName[1];
						}

						rule = line.split('rgba(')[1].split(');')[0];
						rgba = rule.split(',').map(function (elm, i, array) {
							if (i === 3) {  // This is the alpha channel and is a float, unlike RGB
								return parseFloat(elm);
							} else {
								return parseInt(elm, 10);
							}
						});

						if (!colors[colorName]) {
							colors[colorName] = {};
						}

						if (Colors.noShadeColors.indexOf(colorName) !== -1) {
							colors[colorName]['matte'] = {
								code: rgba,
								rule: rule,
								className: 'bg-' + colorName

							};
						} else {
							colors[colorName][shade] = {
								code: rgba,
								rule: rule,
								className: 'bg-' + colorName + '-' + shade
							};
						}
					}
				});
				
				Colors.order.forEach(function (colorName, i) {
					let title = document.createElement('h2'),
						gridContainer = document.createElement('div'),
						blob = colors[colorName];

					gridContainer.classList.add('colorGrid');
					title.textContent = Colors.nameMapping[colorName];
					document.querySelector('main').appendChild(title);
					document.querySelector('main').appendChild(gridContainer);

					Object.getOwnPropertyNames(blob).forEach(function (shade, i) {
						let template = Colors.cardTemplate.slice(),  // Make a copy
							cardElement = document.createElement('div');

						if (i !== 0 && i % 5 === 0) {
							gridContainer = document.createElement('div');
							gridContainer.classList.add('colorGrid');
							document.querySelector('main').appendChild(gridContainer);
						}

						template = template.replace('{{ className }}', blob[shade].className);
						template = template.replace('{{ colorName }}', Colors.nameMapping[colorName] + (shade !== 'matte' ? (' ' + shade) : ''));
						template = template.replace('{{ rgba }}', blob[shade].rule);
						template = template.replace('{{ textColor }}', Colors.textColors[colorName] || 'white');
						template = template.replace('{{ hex }}', blob[shade].code.map(function (part, i, array) {
							let partString = part.toString(16).toUpperCase();

							if (i < 3) {
								return partString.length === 1 ? ('0' + partString) : partString;
							}
						}).join(''));
						cardElement.classList.add('info-box-bar', 'vertical', 'white');
						cardElement.innerHTML = template;

						if (Colors.noHexColors.indexOf(colorName) !== -1) {
							cardElement.querySelector('.hex').parentElement.removeChild(cardElement.querySelector('.hex'));
						}

						gridContainer.appendChild(cardElement);
					});
				});

				document.querySelectorAll('.colorGrid').forEach(function (innerGrid, i) {
					innerGrid.style.display = 'grid';
					innerGrid.style.gridAutoRows = 'min-content';
					innerGrid.style.gridAutoColumns = '1fr';
					innerGrid.style.gridGap = 'var(--grid-gap)';
					// grid-auto-rows:min-content;grid-gap:var(--grid-gap);
					sablono.setElementGrid(innerGrid, 1, 5);
				});

			});
		}).catch(function (error) {
			console.log(error);
		});
	}
};

define(['mavor', 'sablono'], function (mavor, sablono) {
	sablono.initNotifications();
	sablono.initTabbedBoxes();
	sablono.initGridData();
	Colors.displayColors(mavor, sablono);
});