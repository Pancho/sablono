'use strict';
'use strict';
define(function () {
	var r = {
		minute: 60,
		hour: 60 * 60,
		day: 24 * 60 * 60,
		week: 7 * 24 * 60 * 60,
		clientStrings: [
			{string: 'Windows 10', regex: /(Windows 10.0|Windows NT 10.0)/},
			{string: 'Windows 8.1', regex: /(Windows 8.1|Windows NT 6.3)/},
			{string: 'Windows 8', regex: /(Windows 8|Windows NT 6.2)/},
			{string: 'Windows 7', regex: /(Windows 7|Windows NT 6.1)/},
			{string: 'Windows Vista', regex: /Windows NT 6.0/},
			{string: 'Windows Server 2003', regex: /Windows NT 5.2/},
			{string: 'Windows XP', regex: /(Windows NT 5.1|Windows XP)/},
			{string: 'Windows 2000', regex: /(Windows NT 5.0|Windows 2000)/},
			{string: 'Windows ME', regex: /(Win 9x 4.90|Windows ME)/},
			{string: 'Windows 98', regex: /(Windows 98|Win98)/},
			{string: 'Windows 95', regex: /(Windows 95|Win95|Windows_95)/},
			{string: 'Windows NT 4.0', regex: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
			{string: 'Windows CE', regex: /Windows CE/},
			{string: 'Windows 3.11', regex: /Win16/},
			{string: 'Android', regex: /Android/},
			{string: 'Open BSD', regex: /OpenBSD/},
			{string: 'Sun OS', regex: /SunOS/},
			{string: 'Linux', regex: /(Linux|X11)/},
			{string: 'iOS', regex: /(iPhone|iPad|iPod)/},
			{string: 'Mac OS X', regex: /Mac OS X/},
			{string: 'Mac OS', regex: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
			{string: 'QNX', regex: /QNX/},
			{string: 'UNIX', regex: /UNIX/},
			{string: 'BeOS', regex: /BeOS/},
			{string: 'OS/2', regex: /OS\/2/},
			{string: 'Search Bot', regex: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
		],
		osStrings: [
			{string: 'Windows', regex: /(Windows 10.0|Windows NT 10.0)/},
			{string: 'Windows', regex: /(Windows 8.1|Windows NT 6.3)/},
			{string: 'Windows', regex: /(Windows 8|Windows NT 6.2)/},
			{string: 'Windows', regex: /(Windows 7|Windows NT 6.1)/},
			{string: 'Windows', regex: /Windows NT 6.0/},
			{string: 'Windows', regex: /Windows NT 5.2/},
			{string: 'Windows', regex: /(Windows NT 5.1|Windows XP)/},
			{string: 'Windows', regex: /(Windows NT 5.0|Windows 2000)/},
			{string: 'Windows', regex: /(Win 9x 4.90|Windows ME)/},
			{string: 'Windows', regex: /(Windows 98|Win98)/},
			{string: 'Windows', regex: /(Windows 95|Win95|Windows_95)/},
			{string: 'Windows', regex: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
			{string: 'Windows', regex: /Windows CE/},
			{string: 'Windows', regex: /Win16/},
			{string: 'Android', regex: /Android/},
			{string: 'OpenBSD', regex: /OpenBSD/},
			{string: 'SunOS', regex: /SunOS/},
			{string: 'Linux', regex: /(Linux|X11)/},
			{string: 'iOS', regex: /(iPhone|iPad|iPod)/},
			{string: 'MacOSX', regex: /Mac OS X/},
			{string: 'MacOS', regex: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
			{string: 'QNX', regex: /QNX/},
			{string: 'UNIX', regex: /UNIX/},
			{string: 'BeOS', regex: /BeOS/},
			{string: 'OS/2', regex: /OS\/2/},
			{string: 'Search Bot', regex: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
		],
		processorBit: [
			'x86_64',
			'x86-64',
			'Win64',
			'x64;',
			'amd64',
			'AMD64',
			'WOW64',
			'x64_64'
		],
		toPrettyDate: function (date, precise) {
			var year = date.getFullYear(),
				month = u.monthShort[date.getMonth()],
				day = date.getDate(),
				dayName = u.daysShort[date.getDay()],
				hour = date.getHours(),
				minute = date.getMinutes();

			if (minute < 10) {
				minute = '0' + minute;
			}

			if (hour < 10) {
				hour = '0' + hour;
			}

			if (precise) {
				return dayName + ' ' + day + '. ' + month + '. ' + year + ' (' + hour + ':' + minute + ')';
			} else {
				return dayName + ' ' + day + '. ' + month + '. ' + year;
			}
		},
		toHourMinute: function (date) {
			var hour = date.getHours(),
				minute = date.getMinutes();

			return hour + ':' + minute;
		},
		fromPrettyDate: function (string) {

		},
		getDayStart: function (date) {
			var start = new Date(date);
			start.setHours(0, 0, 0, 0);

			return start;
		},
		getDayEnd: function (date) {
			var end = new Date(date);
			end.setHours(23, 59, 59, 999);

			return end;
		},
		getDateRangeList: function (start, end) {
			var result = [],
				currentDate = null;

			start = Utils.getDayStart(start);
			end = Utils.getDayStart(end);

			currentDate = new Date(start);

			while (currentDate <= end) {
				result.push(new Date(currentDate));
				currentDate.setDate(currentDate.getDate() + 1);
			}

			return result;
		},
		getMonday: function (date) {
			date = new Date(date);
			var day = date.getDay(),
				diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
			return new Date(date.setDate(diff));
		},
		getMonthStart: function (date) {
			date = new Date(date);
			return new Date(date.setDate(1));
		},
		getYearStart: function (date) {
			date = new Date(date);
			return new Date(date.setMonth(0));
		},
		humanizeLargeNumber: function (value) { // https://github.com/ollieglass/js-humanizeLargeNumber/blob/master/js-humanizeLargeNumber.js
			var mag = value.toFixed(0).length;

			if (mag <= 3) {
				return value.toFixed(2);
			}

			if (mag > 3 && mag <= 6) {
				return (parseInt(value.toString().substr(0, mag - 1), 10) / 100.0).toFixed(2) + 'K'
			}
			if (mag > 6 && mag <= 9) {
				return (parseInt(value.toString().substr(0, mag - 4), 10) / 100.0).toFixed(2) + 'M'
			}
			if (mag > 9 && mag <= 12) {
				return (parseInt(value.toString().substr(0, mag - 7), 10) / 100.0).toFixed(2) + 'B'
			}
			if (mag > 12 && mag <= 15) {
				return (parseInt(value.toString().substr(0, mag - 10), 10) / 100.0).toFixed(2) + 'T'
			}
			if (mag > 15 && mag <= 18) {
				return (parseInt(value.toString().substr(0, mag - 13), 10) / 100.0).toFixed(2) + 'Q'
			}
			return value;
		},
		humanizeDuration: function (seconds) {
			var minutes = 0,
				hours = 0,
				remainingSeconds = 0;

			hours = Math.floor(seconds / 3600);
			minutes = Math.floor((seconds - hours * 3600) / 60);
			remainingSeconds = seconds - hours * 3600 - minutes * 60;

			return (hours + 'h, ' + minutes + 'm, ' + remainingSeconds + 's')
				.replace('0h, ', '')
				.replace('0m, ', '')
				.replace(', 0s', '');
		},
		getInput: function (fieldConfig) {
			return $('<input type="' + fieldConfig.type + '" value="">');
		},
		getTextarea: function (fieldConfig) {
			return $('<textarea>');
		},
		getSelect: function (fieldConfig) {
			var element = $('<select>');

			$.each(fieldConfig.options, function (key, value) {
				var option = $('<option>');

				option.attr('value', key).text(value);

				element.append(option);
			});

			return element;
		},
		getCheckboxGroup: function (fieldConfig) {
			throw 'Not Yet Implemented';
		},
		getRadioButtonGroup: function (fieldConfig) {
			throw 'Not Yet Implemented';
		},
		getForm: function (config) {
			var form = $('<form>'),
				fieldset = $('<fieldset>'),
				legend = $('<legend>' + config.legend + '</legend>'),
				fieldsList = $('<ol>'),
				control = $('<div class="control"></div>');

			$.each(config.fields, function (i, fieldConfig) {
				var fieldsListItem = $('<li>'),
					uuid = u.getUUID(),
					label = $('<label for="' + (fieldConfig.id || uuid) + '">' + fieldConfig.label + '</label>'),
					element = [];

				if (fieldConfig.raw) {
					element = $(fieldConfig.raw);
				} else {
					element = r['get' + u.capitalize(fieldConfig.element)](fieldConfig);

					if (fieldConfig.value) {
						element.val(fieldConfig.value);
					}

					if (fieldConfig.id) {
						element.attr('id', fieldConfig.id);
					} else {
						element.attr('id', uuid);
					}

					$.each(fieldConfig.attributes || [], function (key, value) {
						element.attr(key, value);
					});
				}

				if (fieldConfig.classes) {
					fieldsListItem.addClass(fieldConfig.classes);
				}

				fieldsListItem.append(label).append(element);
				fieldsList.append(fieldsListItem);
			});

			if (config.control) {
				control.html(config.control);
			} else {
				control.append('<input type="submit" name="submit-button" id="submit-button" value="' + (config.controlValue || 'Submit') + '" />')
			}

			$.each(config.handlers, function (event, handlerBlob) {
				form.on(event, handlerBlob.element, handlerBlob.handler);
			});

			fieldset.append(legend).append(fieldsList).append(control);
			form.append(fieldset);

			return form;
		},
		flashText: function (target, text, extraClass, timeout, widthOverride, cb) {
			var message = $('<div class="flash-message ' + extraClass + '"></div>');

			// First let's clean any existing messages by just destroying them
			$('.flash-message').remove();
			// Defaulting
			text = text || 'Success';
			timeout = timeout || 1000;

			target.css({
				position: 'relative'
			});
			message.text(text);
			message.css({
				lineHeight: target.outerHeight(true) + 'px',
				height: target.outerHeight(true),
				width: widthOverride || target.outerWidth(true)
			});

			target.append(message);
			setTimeout(function () {
				message.fadeOut(400, function () {
					target.css({
						position: 'inherit'
					});
					if (!!cb) {
						cb();
					}
				});
			}, timeout);
		}
	}, u = {
		monthShort: [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		],
		daysShort: [
			'Sun',
			'Mon',
			'Tue',
			'Wed',
			'Thu',
			'Fri',
			'Sat'
		],
		jsDayMapping: {
			0: 6,
			1: 0,
			2: 1,
			3: 2,
			4: 3,
			5: 4,
			6: 5,
		},
		getUUID: function () {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		},
		capitalize: function (string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		},
		getForm: function (config) {
			return r.getForm(config);
		},
		toPrettyDate: function (date, precise) {
			return r.toPrettyDate(date, precise);
		},
		toMachineDate: function (date) {
			var year = date.getFullYear(),
				month = date.getMonth() + 1,
				day = date.getDate(),
				hour = date.getHours(),
				minute = date.getMinutes(),
				second = date.getSeconds();

			if (month < 10) {
				month = '0' + month;
			}

			if (day < 10) {
				day = '0' + day;
			}

			if (hour < 10) {
				hour = '0' + hour;
			}

			if (minute < 10) {
				minute = '0' + minute;
			}

			if (second < 10) {
				second = '0' + second;
			}

			return day + '.' + month + '.' + year + ' ' + hour + ':' + minute + ':' + second;
		},
		getDatesDiffDict: function (from, to) {
			var delta = Math.abs(to - from) / 1000,
				days = 0,
				hours = 0,
				minutes = 0,
				seconds = 0;

			days = Math.floor(delta / 86400);
			delta -= days * 86400;

			hours = Math.floor(delta / 3600) % 24;
			delta -= hours * 3600;

			minutes = Math.floor(delta / 60) % 60;
			delta -= minutes * 60;

			seconds = delta % 60;

			return {
				days: u.splitPaddedDatePart(u.padDatePart(days)),
				hours: u.splitPaddedDatePart(u.padDatePart(hours)),
				minutes: u.splitPaddedDatePart(u.padDatePart(minutes)),
				seconds: u.splitPaddedDatePart(u.padDatePart(Math.floor(seconds)))
			}
		},
		formatHour: function (hour) {
			return u.padDatePart(hour) + ':00';
		},
		formatHourMinutes: function (hour, minutes) {
			return u.padDatePart(hour) + ':' + u.padDatePart(minutes);
		},
		prettyTime: function (date) {
			return u.formatHourMinutes(date.getHours(), date.getMinutes());
		},
		padDatePart: function (part) {
			if (part < 10) {
				return '0' + part;
			} else {
				return '' + part;
			}
		},
		splitPaddedDatePart: function (parts) {
			return {
				tens: parts.substring(0, 1),
				ones: parts.substring(1, 2)
			}
		},
		getOSData: function (detailed) {
			var result = {
					architecture: '32'
				},
				list = [];

			if (detailed) {
				list = r.clientStrings;
			} else {
				list = r.osStrings;
			}

			$.each(list, function (i, blob) {
				if (blob.regex.test(window.navigator.userAgent)) {
					result.os = blob.string;
					return false;
				}
			});

			$.each(r.processorBit, function (i, bits) {
				if (window.navigator.userAgent.indexOf(bits) !== -1) {
					result.architecture = '64';
					return false;
				}
			});

			return result;
		},
		appendScript: function (id, url, async) {
			var script = $('<' + 'script type="text/javascript" id="' + id + '" src="' + url + '"></' + 'script>');

			if ($('#' + id).length > 0) {
				return;
			}

			if (!!async) {
				script.prop('async', 'async');
			}

			$('body').append(script);
		},
		flashSuccessMessage: function (target, text, timeout, widthOverride, cb) {
			r.flashText(target, text, 'ok', timeout, widthOverride, cb);
		},
		flashErrorMessage: function (target, text, timeout, widthOverride, cb) {
			r.flashText(target, text, 'error', timeout, widthOverride, cb);
		},
		toPrettyTimeDiff: function (diff, displaySeconds) {
			var weeks = Math.floor(diff / r.week),
				weekRemainder = diff % r.week,
				days = Math.floor(weekRemainder / r.day),
				daysRemainder = weekRemainder % r.day,
				hours = Math.floor(daysRemainder / r.hour),
				hoursRemainder = daysRemainder % r.hour,
				minutes = Math.floor(hoursRemainder / r.minute),
				minutesRemainder = hoursRemainder % r.minute,
				seconds = Math.floor(minutesRemainder),
				result = '';

			if (weeks > 0) {
				result = u.padDatePart(weeks) + 'w:';
			}

			if (days > 0) {
				result = result + ' ' + u.padDatePart(days) + 'd:';
			}

			if (hours > 0) {
				result = result + ' ' + u.padDatePart(hours) + 'h:';
			} else {
				result = result + ' 00h:';
			}

			if (minutes > 0) {
				result = result + ' ' + u.padDatePart(minutes) + 'm';
			} else {
				result = result + ' 00m';
			}

			if (displaySeconds) {
				if (seconds > 0) {
					result = result + ' ' + u.padDatePart(seconds) + 's';
				} else {
					result = result + ' 00s';
				}
			}

			return $.trim(result);
		}
	};

	return u;
}());