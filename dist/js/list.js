/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _loading = __webpack_require__(6);

	var _loading2 = _interopRequireDefault(_loading);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var loader = new _loading2.default();
	loader.active();

	setTimeout(function () {
	    loader.cancel();
	}, 3000);

/***/ },

/***/ 6:
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
	            document.body.appendChild(el);
	        }

	        this.tpl = '\n    <ul class="">\n        <li class="loading-circle lc1"></li>\n        <li class="loading-circle lc2"></li>\n        <li class="loading-circle lc3"></li>\n        <li class="loading-circle lc4"></li>\n        <li class="loading-circle lc5"></li>\n        <li class="loading-circle lc6"></li>\n        <li class="loading-circle lc7"></li>\n        <li class="loading-circle lc8"></li>\n    </ul>\n'.trim();
	    }

	    _createClass(Loading, [{
	        key: 'active',
	        value: function active() {
	            document.querySelector('.mask-layer').style.display = 'block';
	            document.querySelector('.mask-layer').style.opacity = '.7';
	            var el = document.createElement('div');
	            el.className = 'load-wrap';
	            el.innerHTML = this.tpl;
	            document.body.appendChild(el);
	        }
	    }, {
	        key: 'cancel',
	        value: function cancel() {
	            document.querySelector('.mask-layer').removeAttribute('style');
	            document.body.removeChild(document.querySelector('.load-wrap'));
	        }
	    }]);

	    return Loading;
	}();

	exports.default = Loading;

/***/ }

/******/ });