'use strict';
require.config({
    baseUrl: 'media/js/'
});

define(['sortable', 'mavor'], function (sortable, mavor) {
	return {
		initSortedTable: function (table) {
			sortable.initTable(table);
		},
		initTabbedBoxes: function () {
			mavor.delegateEvent('.box-tabbed .tabs li', 'click', 'tabbed-boxes', function (ev) {
				let tab = this;

				ev.preventDefault();

				tab.closest('.box').querySelectorAll('.tabs li').forEach(function (li) {
					li.classList.remove('selected', 'border-blue-50', 'bg-white');
				});
				tab.closest('.box').querySelectorAll('.tabs-content li').forEach(function (li) {
					li.style.display = 'none';
				});

				tab.classList.add('selected', 'border-blue-50', 'bg-white');
				document.querySelector('#' + tab.getAttribute('data-target')).style.display = 'block';
			});
		},
		initNotifications: function () {
			mavor.delegateEvent('#notifications .close', 'click', 'notifications', function (ev) {
				let item = this;

				ev.preventDefault();

				item.closest('li').style.display = 'none';
				item.closest('li').parentNode.removeChild(listItem);
			});
		},
		initGridData: function () {
			document.querySelectorAll('[data-grid]').forEach(function (elm, i) {
				let grid = elm.getAttribute('data-grid'),
					gridParts = [],
					rows = '',
					columns = '';

				if (!!grid) {
					gridParts = grid.split('/');

					rows = gridParts[0];
					columns = gridParts[1];

					elm.style.gridTemplateRows = 'repeat(' + rows + ', 1fr)';
					elm.style.gridTemplateColumns = 'repeat(' + columns + ', 1fr)';
				}
			});
		}
	};
});