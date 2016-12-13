class City {
    constructor(data) {
        this.data = data;
        this.component = document.querySelector('.pick-city');

        this.init();
    }

    bindEvent() {
        this.component.querySelector('.back').onclick = function () {
            this.hide();
        }.bind(this)
    }

    init() {
        this.render();

        $(this.component).html(this.tpl);

        this.bindEvent();
    }

    show() {
        this.component.className += ' plugin-active';
    }

    hide() {
        this.component.className = this.component.className.replace(/\s?plugin-active/, '');
    }

    render() {
        //获取有数据生成的字母表，渲染dom
        let alpha = this.getAlphabet();
        let str='',str2='',str3='';
        alpha.forEach((value,index)=>{
            str+=`<span>${value}</span>`
        });
        this.alphalist = str;
        //获取hotlist数据，然后渲染
        let hotlist = this.data.hotList;
        hotlist.forEach((value,index)=>{
            str2+=`<span>${value[0]}</span>`
        });
        this.hotlist = str2;
        //根据citylist渲染整个城市数据
        let citylist = this.classifyData;
        citylist.forEach((v,i)=>{
            str3+=`<div class="city-alpha-list">
                    <p class="city-title">${v.alpha}</p>
                    <ul class="city-area">
                        \{list\}
                    </ul>
                </div>`;
            let str4 ='';
            v['data'].forEach((val,idx)=>{
                str4+=`<li>${val[0]}</li>`
            });
            str3 = str3.replace('{list}',str4);
        });

        this.citylist = str3;
        this.tpl = `<div class="city-component">
        <header class="header">
            <span class="left-arrow back"></span>
            <h2>选择城市</h2>
        </header>
        <div class="city-content">
            <div class="city-wrap-hot">
                <div class="city-title">热门城市</div>
                <div class="city-area clearfix">
                    ${this.hotlist}
                </div>
            </div>
            <div class="city-wrap">
                ${this.citylist}
            </div>
        </div>
        <div class="city-alphabet">
            ${this.alphalist}
        </div>
    </div>`;
    }

    getAlphabet(){
        let [data,alphabet,alphaobj] = [this.data.cityList,[],{}];
        data.forEach((v,i)=>{
            let upperAlpha = v[1].charAt(0).toUpperCase();
            if(alphabet.indexOf(upperAlpha)==-1){
                alphabet.push(upperAlpha);
                alphaobj[upperAlpha] = [];
            }
            alphaobj[upperAlpha].push(v);
        });
        let arr=[];
        for(let i in alphaobj){
            arr.push({
                alpha:i,
                data:alphaobj[i]
            })
        }
        this.classifyData = arr.sort(function(a,b){
            return a.alpha.charCodeAt(0) - b.alpha.charCodeAt(0)
        });

        return alphabet.sort();
    }
}


export default City;