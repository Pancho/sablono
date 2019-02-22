'use strict';
/*
 *******************************************************
 *******************************************************
 *************** jQuery Extensions *********************
 *******************************************************
 *******************************************************
 */

// Jquery Django CSRF Token propagation
// Not stock - I've changed a bunch of things to follow JS best practices (single var, ===, ...)

jQuery.ajaxSettings.traditional = true;
jQuery(document).ajaxSend(function (event, xhr, settings) {
	function getCookie(name) {
		var cookieValue = null, cookies = [], i = 0, j = 0, cookie = {};
		if (document.cookie && document.cookie !== '') {
			cookies = document.cookie.split(';');
			for (j = cookies.length; i < j; i += 1) {
				cookie = jQuery.trim(cookies[i]);
				// Does this cookie string begin with the name we want?
				if (cookie.substring(0, name.length + 1) === (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}

	function sameOrigin(url) {
		// url could be relative or scheme relative or absolute
		var host = document.location.host, // host + port
			protocol = document.location.protocol,
			srOrigin = '//' + host,
			origin = protocol + srOrigin;
		// Allow absolute or scheme relative URLs to same origin
		return (url === origin || url.slice(0, origin.length + 1) === origin + '/') || (url === srOrigin || url.slice(0, srOrigin.length + 1) === srOrigin + '/') || // or any other URL that isn't scheme relative or absolute i.e relative.
			!(/^(\/\/|http:|https:).*/.test(url));
	}

	function safeMethod(method) {
		return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}

	if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
		xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
	}
});

(function () {
	var observer = null;

	if (!('IntersectionObserver' in window)) {
		$('img').each(function (i, img) {
			img = $(img);
			if (img.data('src').indexOf('-2x.') >= 0) {
				img.prop('srcset', img.data('src')).prop('src', img.data('src').replace('-2x', ''));
			} else {
				img.prop('src', img.data('src'))
			}
			img.data('src', null);
		});
	} else {
		observer = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				var img = null;

				if (entry.intersectionRatio > 0) {
					observer.unobserve(entry.target);
					img = $(entry.target);

					if (img.data('src').indexOf('-2x.') >= 0) {
						img.prop('srcset', img.data('src')).prop('src', img.data('src').replace('-2x', ''));
					} else {
						img.prop('src', img.data('src'))
					}
					img.data('src', null);
				}
			});
		}, {
			rootMargin: '50px 0px',
			threshold: 0.01
		});

		$('img').each(function (i, img) {
			observer.observe(img);
		});
	}
}());

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/service-worker.js', {scope: '/'})
		.then(function (reg) {
			// registration worked
		}).catch(function (error) {
		// registration failed
	});
}