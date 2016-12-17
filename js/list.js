import load from '../component/loading';
let loader = new load();
//loader.active();

//通过ES6模块,引用dialog组件
import Dialog from '../component/dialog';
//实例化
let dialog = new Dialog({});

import Calendar from '../component/calendar';
let calendar = new Calendar({
    initDate: new Date(),
    count:4
});

import {getUrlParams} from '../component/util';
$('.list-date-in').html(getUrlParams('dateLiveIn')).on('click',function () {
    let el = $(this);
    calendar.show(function (data) {
        el.html(data)
    })
});
$('.list-date-out').html(getUrlParams('dateLeave')).on('click',function () {
    let el = $(this);
    calendar.show(function (data) {
        el.html(data)
    })
});


/*const data = [
    { first: 'Jane', last: 'Bond' },
    { first: 'Lars', last: 'Croft' },
];
let str='';
let fn = function (data) {
    return `<table>
        ${
            data.map(function (value,index) {return `<tr><td>${value.first}</td></tr>`})
        }
    </table>`
};*/

$.ajax('../data/hotel.json')
    .done((data)=>{
       let res = data.result.hotel_list;
       console.log(template(res));
       $('.hotel-list').html(template(res));
    });

const template = (data)=>{
    return `${
        data.map((value,index)=> {
            return `<dl class="hotel-item">
            <dt><img src="../${value.image}" alt=""></dt>
            <dd>
                <p class="hotel-title">${value.name}</p>
                <p class="hotel-score"><span>4.7分 <em>礼</em> </span><span class="hotel-price">￥${value.low_price/100}<sub>起</sub></span></p>
                <p class="hotel-grade"><span>${value.stars}</span></p>
                <p class="hotel-location"><span>${value.addr}</span><span class="hotel-distance">${value.distance}km</span></p>
            </dd>
        </dl>`
        }).join('')
        }`.trim()
};
