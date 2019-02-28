'use strict';
define(function () {
	let observer = null;

	if (!('IntersectionObserver' in window)) {
		document.querySelectorAll('img').forEach(function (elm, key, parent) {
			let src = elm.dataset.src;

			if (src.indexOf('-2x.') >= 0) {
				elm.setAttribute('srcset', src);
				elm.setAttribute('src', src.replace('-2x', ''));
			} else {
				elm.setAttribute('src', src);
			}
		});
	} else {
		observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				let img = null,
					src = '';

				if (entry.intersectionRatio > 0) {
					observer.unobserve(entry.target);
					img = entry.target;
					src = img.dataset.src;

					if (!src) {
						return;
					}

					if (src.indexOf('-2x.') >= 0) {
						img.setAttribute('srcset', src).prop('src', src.replace('-2x', ''));
					} else {
						img.setAttribute('src', src)
					}
				}
			});
		}, {
			rootMargin: '50px 0px',
			threshold: 0.01
		});

		document.querySelectorAll('img').forEach(function (elm, key, parent) {
			observer.observe(elm);
		});
	}
});
