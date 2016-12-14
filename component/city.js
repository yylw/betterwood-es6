class City {
    constructor(data) {
        this.data = data;
        this.component = document.querySelector('.pick-city');

        this.init();
    }

    init() {
        this.render();

        $(this.component).html(this.tpl);

        this.getPosition();

        this.bindEvent();
    }

    bindEvent() {
        let that = this;
        let scroller = this.component.querySelector('.city-content');
        this.component.querySelector('.back').onclick = function () {
            this.hide();
        }.bind(this);
        $(this.component).on('click','.target-alpha',function () {
            scroller.scrollTop=that.heights[$(this).html()]-45;
        });
        $(this.component).on('click','[city]',function () {
            that.callback($(this).attr('city'));
            that.hide()
        })
    }

    getPosition(){
        let heights = {};
        $(this.component).find('[alpha]').each(function (index,value) {
            heights[$(this).attr('alpha')] = $(this).offset().top;
        });
        this.heights = heights;
        console.log(heights);

    }

    show(callback) {
        this.component.className += ' plugin-active';
        this.callback = callback || function () {
                console.log('你没有写回调函数，请在show方法中添加')
            }
    }

    hide() {
        this.component.className = this.component.className.replace(/\s?plugin-active/, '');
    }

    render() {
        //获取有数据生成的字母表，渲染dom
        let alpha = this.getAlphabet();
        let str='',str2='',str3='';
        alpha.forEach((value,index)=>{
            str+=`<span class="target-alpha">${value}</span>`
        });
        this.alphalist = str;
        //获取hotlist数据，然后渲染
        let hotlist = this.data.hotList;
        hotlist.forEach((value,index)=>{
            str2+=`<span city="${value[0]}">${value[0]}</span>`
        });
        this.hotlist = str2;
        //根据citylist渲染整个城市数据
        let citylist = this.classifyData;
        citylist.forEach((v,i)=>{
            str3+=`<div class="city-alpha-list">
                    <p class="city-title" alpha="${v.alpha}">${v.alpha}</p>
                    <ul class="city-area">
                        \{list\}
                    </ul>
                </div>`;
            let str4 ='';
            v['data'].forEach((val,idx)=>{
                str4+=`<li city="${val[0]}">${val[0]}</li>`
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