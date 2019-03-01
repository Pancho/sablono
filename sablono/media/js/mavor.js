'use strict';
define(function () {
	let r = {
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
					let target = ev.target;
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
		},
		inlineElements: ['a', 'span', 'bdo', 'em', 'strong', 'dfn', 'code', 'samp', 'kbd', 'var', 'cite', 'abbr', 'acronym', 'q', 'sub', 'sup', 'tt', 'i', 'b', 'big', 'small', 'u', 's', 'strike', 'font', 'ins', 'del', 'pre', 'address', 'dt', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
		formatHTML: function (node, level, indentCharacter) {
			let indentBefore = new Array(level + 1).join(indentCharacter),
				indentAfter = new Array(level).join(indentCharacter),
				textNode = null,
				i = 0,
				j = node.children.length;

			for (; i < j; i += 1) {
				if (r.inlineElements.indexOf(node.children[i].tagName.toLowerCase()) === -1) {
					textNode = document.createTextNode('\n' + indentBefore);
					node.insertBefore(textNode, node.children[i]);
					r.formatHTML(node.children[i], level + 1, indentCharacter);

					if (node.lastElementChild === node.children[i]) {
						textNode = document.createTextNode('\n' + indentAfter);
						node.appendChild(textNode);
					}
				} else {
					textNode = document.createTextNode('\n' + indentBefore);
					node.insertBefore(textNode, node.children[i]);
					textNode = document.createTextNode('\n' + indentAfter);
					node.appendChild(textNode);
				}
			}

			return node.innerHTML.replace(/^\s*$(?:\r\n?|\n)/gm, '');
		}
	}, u = {
		delegateEvent: function (selector, event, handler, namespace) {
			if (!r.events[event]) {
				r.events[event] = [];
				r.initEventDelegation(event);
			}
			r.events[event].push({
				selector: selector,
				namespace: namespace || 'global',
				handler: handler
			});
		},
		removeEvent: function (event, selector, namespace) {
			r.events[event].forEach(function (blob, i) {
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
		},
		indentHTML: function (html, indentCharacter) {
			let div = document.createElement('div');

			html = html.replace(/\n/g, '')
				.replace(/[\t ]+</g, '<')
				.replace(/>[\t ]+</g, '><')
				.replace(/>[\t ]+$/g, '>');
			div.innerHTML = html.trim();
			return r.formatHTML(div, 0, indentCharacter || '\t');
		}
	};

    return u;
});