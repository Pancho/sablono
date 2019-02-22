'use strict';
require.config({
    baseUrl: 'media/js/'
});

require(['utils', 'mavor', 'lunr', 'sortable'], function (utils, mavor, lunr, sortable) {
	var r = {
		initSortedTable: function (table) {
			sortable.initTable(table);
		},
		initLunrSearch: function () {
			// $('.searchable').each(function (i, elm) {
			// 	var documents = [],
			// 		form = null,
			// 		index = null,
			// 		searchableProperties = [];
			//
			// 	elm = $(elm);
			//
			// 	elm.find('.item').each(function (i, item) {
			// 		var dict = {};
			//
			// 		item = $(item);
			// 		dict.id = item.prop('id');
			//
			// 		item.find('.searchable-property').each(function (j, prop) {
			// 			prop = $(prop);
			//
			// 			searchableProperties.push(prop.data('property'));
			// 			dict[prop.data('property')] = prop.data('value')
			// 		});
			//
			// 		documents.push(dict);
			// 	});
			//
			// 	index = lunr(function () {
			// 		this.ref('id');
			//
			// 		searchableProperties.forEach(function (property) {
			// 			this.field(property);
			// 		}, this);
			//
			// 		this.field('name');
			// 		this.field('brand');
			// 		this.field('category');
			//
			// 		documents.forEach(function (doc) {
			// 			this.add(doc)
			// 		}, this);
			// 	});
			//
			// 	form = $('#' + elm.data('search-form'));
			// 	form.on('submit', function (ev) {
			// 		ev.preventDefault();
			// 	}).on('input', '.search-input', function (ev) {
			// 		var value = $(this).val(),
			// 			result = [];
			//
			// 		if (value.length > 2) {
			// 			result = index.search($(this).val());
			//
			// 			if (result.length > 0) {
			// 				elm.find('.item').hide();
			// 				$.each(result, function (k, blob) {
			// 					$('#' + blob.ref).show();
			// 				});
			// 			} else {
			// 				elm.find('.item').show();
			// 			}
			// 		} else {
			// 			elm.find('.item').show();
			// 		}
			// 	});
			// });
		},
		initNavigation: function () {
			// var navigation = $('nav'),
			// 	main = $('main');
			// navigation.css({
			// 	height: Math.max(navigation.height(), main.outerHeight(true))
			// });
		},
		initTabbedBoxes: function () {
			// var box = $('.box-tabbed');
			// box.on('click', '.tabs li', function () {
			// 	var tab = $(this);
			//
			// 	box.find('.tabs li').removeClass('selected border-blue-50 bg-white');
			// 	box.find('.tabs-content li').hide();
			//
			// 	tab.addClass('selected border-blue-50 bg-white');
			// 	$('#' + tab.data('target')).show();
			// });
		},
		chartDemo: function () {

		},
		initNotifications: function () {
			// $('#notifications').on('click', '.close', function (ev) {
			// 	var close = $(this),
			// 		listItem = close.closest('li');
			//
			// 	ev.preventDefault();
			//
			// 	listItem.slideUp(function () {
			// 		listItem.remove();
			// 	});
			// });
		},
		initBoxControl: function () {
			// $('header').on('click', '.collapse', function () {
			// 	var collapse = $(this),
			// 		header = collapse.closest('header'),
			// 		boxSections = header.nextAll('*');
			//
			// 	if (collapse.data('closed') === true) {
			// 		boxSections.slideDown();
			// 		collapse.removeClass('fa-expand').addClass('fa-minus');
			// 		collapse.data('closed', false);
			// 	} else {
			// 		boxSections.slideUp();
			// 		collapse.removeClass('fa-minus').addClass('fa-expand');
			// 		collapse.data('closed', true);
			// 	}
			// }).on('click', '.close', function () {
			// 	$(this).closest('.box').fadeOut(function () {
			// 		$(this).remove();
			// 	});
			// });
		}
	};

	r.initSortedTable();
	r.initLunrSearch();
	r.initNavigation();
	r.initTabbedBoxes();
	r.chartDemo();
	r.initNotifications();
	r.initBoxControl();

	return r;
});

