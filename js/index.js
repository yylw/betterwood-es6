let swipe = require('../lib/swiper');
new swipe('.swiper-container',{
    autoplay: 3000,
    loop:true
});


//获取城市数据
let cities = require('../data/cityData');
//ES6原生模块
import City from '../component/city';
//将城市数据传给city module
let cityComponent = new City(cities);

$('.data-city').on('click',function () {
    let el = this;
    //city module callback
    cityComponent.show(function (data) {
        el.html(data);
    });
});

