var swipe = require('../lib/swiper');
new swipe('.swiper-container',{
    autoplay: 3000,
    loop:true
});

var cities = require('../data/cityData');

import City from '../component/city';
var cityComponent = new City(cities);

$('.data-city').on('click',function () {
    cityComponent.show();
});