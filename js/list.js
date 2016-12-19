import load from '../component/loading';
let loader = new load();
loader.active();

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

//请求数据，渲染列表
$.ajax('../data/hotel.json')
    .done(data=>{
       let res = data.result.hotel_list;
       setTimeout(function () {
           $('.hotel-list').html(template(res));//调用渲染函数
           loader.stop();
       },1000);
    })
    .error(()=>{
        dialog.alert('网络错误，请重试',function () {
            window.location.reload();
        })
    });
//利用模板字符串定义渲染函数
const template = data =>{
    return `${
        data.map((value,index)=> {
            return `<dl class="hotel-item" stars="${
                function(){
                    switch (value.stars){
                        case '经济型': return 1;
                            break;
                        case '二星': return 2;
                            break;
                        case '三星': return 3;
                            break;
                        case '四星': return 4;
                            break;
                        case '五星': return 5;
                            break;
                    }
                }()
            }">
            <dt><img src="../${value.image}" alt=""></dt>
            <dd>
                <p class="hotel-title">${value.name}</p>
                <p class="hotel-score"><span>4.7分 <em>礼</em> </span><span class="hotel-price">￥${value.low_price/100}<sub>起</sub></span></p>
                <p class="hotel-grade"><span>${value.stars}</span></p>
                 <p class="hotel-location"><span>${value.addr}</span><span class="hotel-distance">${value.distance}km</span></p>
            </dd>
        </dl>`
        }).join('')//map返回一个数组，数组中的每一项是渲染好的list，利用join将所有的list拼接在一起
        }`.trim();//去掉模板字符串中的换行以及空格
};


let filterBox = $('.filter-items');
$('.filter-nav').on('click',"span",function () {
    if($(this).hasClass('active')){
        filterBox.css('display','none');
        $(this).removeClass('active');
        $('.mask-layer').css({'display':'none','opacity':'0'});
    }else{
        $('.mask-layer').css({'display':'block','opacity':'0.3'});
        $(this).addClass('active').siblings().removeClass('active');
        filterBox.css('display','block');
        filterBox.css('left',-$(this).index()*100+'%');
    }
});
filterBox.on('click','.check-box',function () {
    let el = $(this);
    if(el.hasClass('checked')){
        el.removeClass('checked')
    }else{
        el.addClass('checked');

        let flag = el.parents('.filter-box').attr('class').split(' ')[1];
        let filter = el.parent().attr(flag);
        $('.hotel-list').children().css('display','');
        $('.hotel-list').children().not('['+flag+'='+filter+']').css('display','none');
    }
});







