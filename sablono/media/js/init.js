'use strict';
require.config({
    baseUrl: 'media/js/'
});

define(['mavor', 'sablono'], function (mavor, sablono) {
	sablono.initNotifications();
	sablono.initTabbedBoxes();
	sablono.initGridData();
});