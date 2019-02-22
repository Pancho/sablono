'use strict';
require.config({
    baseUrl: 'media/js/'
});

define(['sablono/media/js/mavor', 'sablono'], function (mavor, sablono) {
	sablono.initNotifications();
	sablono.initTabbedBoxes();
	sablono.initGridData();
});