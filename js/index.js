var swipe = require('../lib/swiper');
new swipe('.swiper-container',{
    autoplay: 3000,
    loop:true
});


//获取城市数据
let cities = require('../data/cityData');
import City from '../component/city';
//将城市数据传给city module
let cityComponent = new City(cities);

$('.data-city').on('click',function () {
    var el = $(this);
    //city module callback
    cityComponent.show(function (data) {
        el.html(data);
    });
});