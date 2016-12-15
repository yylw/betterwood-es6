class Calendar{
    constructor(){
        this.component = document.querySelector('.pick-date');
        let wrap = document.querySelector('.calendar-days');
        this.wrap = wrap;
        wrap.innerHTML = this.renderOneMonth(2016,10)+this.renderOneMonth(2016,11)+this.renderOneMonth(2016,12);
        this.bindEvent();
    }

    hide(){
        this.component.className = this.component.className.replace(/\s?plugin-active/, '');
    }

    show(callback) {
        this.component.className += ' plugin-active';
        this.callback = callback || function () {
            console.log('你没有写回调函数，请在show方法中添加')
        }
    }

    bindEvent(){
        let that = this;
        this.wrap.addEventListener('click',function (e) {
            let day = 0;
            if(e.target.tagName.toUpperCase() == 'LI'){
                day = e.target.innerHTML;
                that.selectedDate = e.target.parentNode.getAttribute('date')+'-'+day;
                that.callback(that.selectedDate);
                that.hide()
            }

        })
    }

    renderOneMonth(year,month){
        let bd = this.getWeekIndex(year,month);
        let d = this.getDays(year,month);
        let ad = 42-d-bd;
        console.log(ad);
        let start = this.getBeforeDay(year,month);
        let str = '';
        for(let i=0; i<bd; i++){
            str+='<li class="day to-gray">'+(start+i)+'</li>'
        }
        for(let j=0;j<d;j++){
            str+='<li class="day">'+(1+j)+'</li>'
        }
        for(let k=0; k<ad; k++){
            str+='<li class="day to-gray">'+(1+k)+'</li>'
        }
        return `<ul date="${year}-${month}" class="m-date clearfix">${str}</ul>`
    }

    getBeforeDay(year,month){
        let [beforeDays,leftDays] = [this.getDays(year,month-1),this.getWeekIndex(year,month)];
        return beforeDays - leftDays + 1;
    }

    getWeekIndex(year,month){
        return new Date(year,month-1,1).getDay();
    }

    getDays(year,month){
        if(month<1){
            year--;
            month = 12
        }
        let days = 0;
        let arr = [1,3,5,7,8,10,12],
            arr2 = [4,6,9,11];
        if(arr.indexOf(month)>-1){
            days=31;
        }else if(arr2.indexOf(month)>-1){
            days = 30
        }else{
            if(year%400==0 || year%100!=0&&year%4==0){
                days = 29
            }else{
                days = 28
            }
        }
        return days;
    }
}


export default Calendar;