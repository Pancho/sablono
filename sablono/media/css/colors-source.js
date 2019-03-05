(function () {
	let download = function (filename, text) {
			let element = document.createElement('a');
			element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
			element.setAttribute('download', filename);

			element.style.display = 'none';
			document.body.appendChild(element);

			element.click();

			document.body.removeChild(element);
		},
		appendLine = function (str, appendage) {
			str += appendage + '\n';
			return str;
		},
		result = '\/******************\/\n' +
			'\/* COLORS CLASSES *\/\n' +
			'\/******************\/\n' +
			'\/* Use these color classes like you would use any other class in your HTML *\/\n\n',
		palette = document.querySelector('.palettes'),
		paletteContainers = palette.querySelectorAll('.palette-container'),
		classTypes = {'': 'color', 'bg': 'background-color', 'border': 'border-color'},
		modes = {'': '', 'hover': 'hover:hover', 'active': 'active:active'},
		defaultColors = {'white': 'rgba(255,255,255,1.0)', 'black': 'rgba(0,0,0,1.0)'},
		transparentColors = {
			'shade': 'rgba(0,0,0,{{ transparency }})',
			'light': 'rgba(255,255,255,{{ transparency }})'
		},
		transparencyLevels = {
			'5': '0.05',
			'10': '0.1',
			'20': '0.2',
			'30': '0.3',
			'40': '0.4',
			'50': '0.5',
			'60': '0.6',
			'70': '0.7',
			'80': '0.8',
			'90': '0.9',
		};

	result = appendLine(result, '\/********************\/');
	result = appendLine(result, '\/* Greyscale Colors *\/');
	result = appendLine(result, '\/********************\/');

	Object.getOwnPropertyNames(defaultColors).forEach(function (color, i) {
		let colorCode = defaultColors[color];

		Object.getOwnPropertyNames(classTypes).forEach(function (classType, i) {
			let property = classTypes[classType];

			Object.getOwnPropertyNames(modes).forEach(function (mode, i) {
				let colorMode = modes[mode],
					selector = '';

				if (classType !== '') {
					selector += classType + '-';
				}

				selector += color;

				if (mode !== '') {
					selector += '-' + colorMode;
				}

				result = appendLine(result, '.' + selector + ' {' + property + ':' + colorCode + ';}');
			});
		});
	});

	result = appendLine(result, '\n\/********************************\/');
	result = appendLine(result, '\/* Transparent Greyscale Colors *\/');
	result = appendLine(result, '\/********************************\/');

	Object.getOwnPropertyNames(transparentColors).forEach(function (color, i) {
		let colorTemplate = transparentColors[color];

		Object.getOwnPropertyNames(classTypes).forEach(function (classType, i) {
			let property = classTypes[classType];

			Object.getOwnPropertyNames(modes).forEach(function (mode, i) {
				let colorMode = modes[mode];

				Object.getOwnPropertyNames(transparencyLevels).forEach(function (shade, i) {
					let shadeValue = transparencyLevels[shade],
						selector = '',
						colorCode = colorTemplate.replace('{{ transparency }}', shadeValue);

					if (classType !== '') {
						selector += classType + '-';
					}

					selector += color;
					selector += '-' + shade;

					if (mode !== '') {
						selector += '-' + colorMode;
					}

					result = appendLine(result, '.' + selector + ' {' + property + ':' + colorCode + ';}');
				});
			});
		});
	});

	paletteContainers.forEach(function (container, i) {
		let colors = container.querySelectorAll('.color'),
			firstElement = container.querySelector('.color'),
			colorName = firstElement.getAttribute('aria-label'),
			colorNameSplit = [],
			asterisks = [];

		colorNameSplit = colorName.split(' ');
		colorNameSplit.pop();
		colorName = colorNameSplit.join(' ');
		asterisks = new Array(colorName.length + 3).join('*');

		console.log(colorName);
		result = appendLine(result, '\n\/*' + asterisks + '*\/');
		result = appendLine(result, '\/* ' + colorName + ' *\/');
		result = appendLine(result, '\/*' + asterisks + '*\/');

		colors.forEach(function (colorElm, j) {
			let colorName = colorElm.getAttribute('aria-label'),
				colorSplit = colorName.split(' '),
				shade = colorSplit.pop().replace('0', ''),
				name = colorSplit.map(function (part, i, array) {
					return part.toLowerCase();
				}).join(''),
				color = 'rgba(' + colorElm.style.backgroundColor.replace('rgb(', '').replace(')', '').split(', ').join(',') + ',1.0)';

			result = appendLine(result, '.' + name + '-' + shade + ' {color:' + color + ';}');
			result = appendLine(result, '.' + name + '-' + shade + '-hover:hover {color:' + color + ';}');
			result = appendLine(result, '.' + name + '-' + shade + '-active:active {color:' + color + ';}');

			result = appendLine(result, '.bg-' + name + '-' + shade + ' {background-color:' + color + ';}');
			result = appendLine(result, '.bg-' + name + '-' + shade + '-hover:hover {background-color:' + color + ';}');
			result = appendLine(result, '.bg-' + name + '-' + shade + '-active:active {background-color:' + color + ';}');

			result = appendLine(result, '.border-' + name + '-' + shade + ' {border-color:' + color + ';}');
			result = appendLine(result, '.border-' + name + '-' + shade + '-hover:hover {border-color:' + color + ';}');
			result = appendLine(result, '.border-' + name + '-' + shade + '-active:active {border-color:' + color + ';}');
		});
	});

	download('palette.css', result);
}());