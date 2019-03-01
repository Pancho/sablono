'use strict';
require.config({
    baseUrl: 'media/js/'
});

let Init = {
	initSource: function (mavor) {
		let selectors = '#notifications, .card, .card-regular, .card-center, .info-box, .info-box-basic, .info-box-bar, .box';

		mavor.delegateEvent(selectors, 'click', function (ev) {
			let elm = this, // Avoid using "this" in JS as you never know what it is...
				elmClone = elm.cloneNode(true),
				body = null,
				textarea = null;

			if (elm.classList.contains('clicked')) {
				textarea = document.createElement('textarea');
				body = document.querySelector('body');
				elm.classList.remove('clicked');

				elmClone.querySelectorAll('[data-grid]').forEach(function (innerElm, j) {
					innerElm.removeAttribute('style');
				});

				textarea.style.position = 'fixed';
				textarea.style.left = '-99999px';

				body.appendChild(textarea);

				textarea.value = mavor.indentHTML(elmClone.outerHTML).trim();

				textarea.focus();
				textarea.select();
				document.execCommand('copy');

				// Display the code here
				body.removeChild(textarea);
			} else {
				elm.classList.add('clicked');
				setTimeout(function () {
					elm.classList.remove('clicked');
				}, 1000);
			}
		});
	}
};

define(['mavor', 'sablono'], function (mavor, sablono) {
	sablono.initNotifications();
	sablono.initTabbedBoxes();
	sablono.initGridData();

	Init.initSource(mavor);
});