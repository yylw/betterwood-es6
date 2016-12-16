import load from '../component/loading';
let loader = new load();
loader.active();


setTimeout(function () {
    loader.cancel();
},3000);