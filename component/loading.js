class Loading{
    constructor(){
        let ml = document.querySelector('.mask-layer');
        if(!ml){
            let el = document.createElement('div');
            el.className='mask-layer';
            document.body.appendChild(el);
            this.masker = el;
        }
        this.masker = ml;

        this.tpl=`
    <ul class="">
        <li class="loading-circle lc1"></li>
        <li class="loading-circle lc2"></li>
        <li class="loading-circle lc3"></li>
        <li class="loading-circle lc4"></li>
        <li class="loading-circle lc5"></li>
        <li class="loading-circle lc6"></li>
        <li class="loading-circle lc7"></li>
        <li class="loading-circle lc8"></li>
    </ul>
`.trim();
    }

    active(){
        this.masker.style.cssText = 'opacity:1;display:block';
        let el = document.createElement('div');
        el.className = 'load-wrap';
        el.innerHTML = this.tpl;
        document.body.appendChild(el);
    }

    stop(){
        document.querySelector('.mask-layer').removeAttribute('style');
        document.body.removeChild(document.querySelector('.load-wrap'));
    }
}


export default Loading