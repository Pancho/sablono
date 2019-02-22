'use strict';
define(function () {
	var r = {
		events: {},
		params: function (dictionary) {
			let result = [];

			Object.keys(dictionary).forEach(function (key) {
				result.push(encodeURIComponent(key) + "=" + encodeURIComponent(dictionary[key]));
			});

			return result.join('&');
		},
		initEventDelegation: function (event) {
			document.addEventListener(event, function (ev) {
				r.events[event].forEach(function (blob, i) {
					var target = ev.target;
					for (; target && target !== document; target = target.parentNode) {
						if (target.matches(blob.selector)) {
							try {
								blob.handler.call(target, ev);
							} catch (e) {
								console.log(e);
							}
							break;
						}
					}
				});
			}, false);
		}
	}, u = {
		delegateEvent: function (selector, event, namespace, handler) {
			if (!r.events[event]) {
				r.events[event] = [];
				r.initEventDelegation(event);
			}
			r.events[event].push({
				selector: selector,
				namespace: namespace,
				handler: handler
			});
		},
		removeEvent: function (event, selector, namespace) {
			f.events[event].forEach(function (blob, i) {
				if (blob.selector === selector && blob.namespace === namespace) {
					r.events[event].splice(i, 1);
				}
			});
		},
		get: function (urlName, data, config) {
			let url = document.querySelectorAll('body')[0].getAttribute('data-' + urlName);

			data = data || {};
			config = config || {};
			config.method = 'GET';
			if (Object.keys(data).length !== 0) {
				url = url + '?' + r.params(data);
			}

			return fetch(url, config);
		},
		post: function (urlName, data, config) {
			let url = document.querySelectorAll('body')[0].getAttribute('data-' + urlName);

			data = data || {};
			config = config || {};
			config.method = 'POST';
			if (Object.keys(data).length !== 0) {
				config.data = data;
			}

			return fetch(url, config);
		}
	};

    return u;
});