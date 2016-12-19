webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _loading = __webpack_require__(6);

	var _loading2 = _interopRequireDefault(_loading);

	var _dialog = __webpack_require__(1);

	var _dialog2 = _interopRequireDefault(_dialog);

	var _calendar = __webpack_require__(3);

	var _calendar2 = _interopRequireDefault(_calendar);

	var _util = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var loader = new _loading2.default();
	loader.active();

	//通过ES6模块,引用dialog组件

	//实例化
	var dialog = new _dialog2.default({});

	var calendar = new _calendar2.default({
	    initDate: new Date(),
	    count: 4
	});

	(0, _util.test)();
	$('.list-date-in').html((0, _util.getUrlParams)('dateLiveIn')).on('click', function () {
	    var el = $(this);
	    calendar.show(function (data) {
	        el.html(data);
	    });
	});
	$('.list-date-out').html((0, _util.getUrlParams)('dateLeave')).on('click', function () {
	    var el = $(this);
	    calendar.show(function (data) {
	        el.html(data);
	    });
	});

	//请求数据，渲染列表
	$.ajax('../data/hotel.json').done(function (data) {
	    var res = data.result.hotel_list;
	    setTimeout(function () {
	        $('.hotel-list').html(template(res)); //调用渲染函数
	        loader.stop();
	    }, 1000);
	}).error(function () {
	    dialog.alert('网络错误，请重试', function () {
	        window.location.reload();
	    });
	});
	//利用模板字符串定义渲染函数
	var template = function template(data) {
	    return ('' + data.map(function (value, index) {
	        return '<dl class="hotel-item" price="' + function () {

	            if (value.low_price < 10000) {
	                return 100;
	            } else if (value.low_price < 20000) {
	                return 200;
	            } else if (value.low_price < 30000) {
	                return 300;
	            } else if (value.low_price < 40000) {
	                return 400;
	            } else if (value.low_price < 50000) {
	                return 500;
	            } else {
	                return 1000;
	            }
	        }() + '" stars="' + function () {
	            switch (value.stars) {
	                case '经济型':
	                    return 1;
	                    break;
	                case '二星':
	                    return 2;
	                    break;
	                case '三星':
	                    return 3;
	                    break;
	                case '四星':
	                    return 4;
	                    break;
	                case '五星':
	                    return 5;
	                    break;
	            }
	        }() + '">\n            <dt><img src="../' + value.image + '" alt=""></dt>\n            <dd>\n                <p class="hotel-title">' + value.name + '</p>\n                <p class="hotel-score"><span>4.7\u5206 <em>\u793C</em> </span><span class="hotel-price">\uFFE5' + value.low_price / 100 + '<sub>\u8D77</sub></span></p>\n                <p class="hotel-grade"><span>' + value.stars + '</span></p>\n                 <p class="hotel-location"><span>' + value.addr + '</span><span class="hotel-distance">' + value.distance + 'km</span></p>\n            </dd>\n        </dl>';
	    }).join('') //map返回一个数组，数组中的每一项是渲染好的list，利用join将所有的list拼接在一起
	    ).trim(); //去掉模板字符串中的换行以及空格
	};

	var filterBox = $('.filter-items');
	$('.filter-nav').on('click', "span", function () {
	    if ($(this).hasClass('active')) {
	        filterBox.css('display', 'none');
	        $(this).removeClass('active');
	        $('.mask-layer').css({ 'display': 'none', 'opacity': '0' });
	    } else {
	        $('.mask-layer').css({ 'display': 'block', 'opacity': '0.3' });
	        $(this).addClass('active').siblings().removeClass('active');
	        filterBox.css('display', 'block');
	        filterBox.css('left', -$(this).index() * 100 + '%');
	    }
	});
	filterBox.on('click', '.check-box', function () {
	    var el = $(this);
	    var index = el.parent().index();
	    if (el.hasClass('checked')) {
	        el.removeClass('checked');
	    } else {
	        el.addClass('checked');

	        if (index == 0) {
	            el.parent().siblings().find('.check-box').removeClass('checked');
	        } else {
	            el.parents('.filter-box').children().eq(0).find('.check-box').removeClass('checked');

	            var flag = el.parents('.filter-box').attr('class').split(' ')[1];
	            var filter = el.parent().attr(flag);

	            screen(flag, filter);
	        }
	    }
	});

	function screen(flag, filter) {
	    var filter_item_list = filterBox.find('.checked');
	    var screen_items = {
	        stars: [],
	        price: [],
	        brand: [],
	        distance: []
	    };

	    filter_item_list.each(function (index, value) {
	        var el = $(this);
	        var flag = el.parents('.filter-box').attr('class').split(' ')[1];
	        var filter = el.parent().attr(flag);
	        screen_items[flag].push(filter);
	    });

	    console.log(screen_items);
	    var wrap = $('.hotel-list');
	    wrap.children().css('display', '');
	    var str = '';
	    for (var i in screen_items) {
	        for (var j = 0; j < screen_items[i].length; j++) {
	            str += '[' + i + '=' + screen_items[i][j] + ']' + ',';
	        }
	    }
	    str = str.substring(0, str.length - 1);
	    console.log(str);
	    wrap.children().not(str).css('display', 'none');
	}

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Loading = function () {
	    function Loading() {
	        _classCallCheck(this, Loading);

	        var ml = document.querySelector('.mask-layer');
	        if (!ml) {
	            var el = document.createElement('div');
	            el.className = 'mask-layer';
	            el.style.opacity = '.7';
	            document.body.appendChild(el);
	            this.masker = el;
	        } else {
	            this.masker = ml;
	        }

	        this.tpl = '\n    <ul class="">\n        <li class="loading-circle lc1"></li>\n        <li class="loading-circle lc2"></li>\n        <li class="loading-circle lc3"></li>\n        <li class="loading-circle lc4"></li>\n        <li class="loading-circle lc5"></li>\n        <li class="loading-circle lc6"></li>\n        <li class="loading-circle lc7"></li>\n        <li class="loading-circle lc8"></li>\n    </ul>\n'.trim();
	    }

	    _createClass(Loading, [{
	        key: 'active',
	        value: function active() {
	            this.masker.style.cssText = 'opacity:.7;display:block;z-index:10;';
	            var el = document.createElement('div');
	            el.className = 'load-wrap';
	            el.innerHTML = this.tpl;
	            document.body.appendChild(el);
	        }
	    }, {
	        key: 'stop',
	        value: function stop() {
	            document.querySelector('.mask-layer').removeAttribute('style');
	            document.body.removeChild(document.querySelector('.load-wrap'));
	        }
	    }]);

	    return Loading;
	}();

	exports.default = Loading;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function getUrlParams(name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return decodeURI(r[2]);
	    }
	    return null;
	}

	function test() {
	    console.log('this is function test, you can do something here...add your code...');
	}

	exports.getUrlParams = getUrlParams;
	exports.test = test;

/***/ }
]);