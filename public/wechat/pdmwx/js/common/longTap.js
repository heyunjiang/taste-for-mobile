/*
 * 单击、长按事件对象
 * v 1.0
 * designer: heyunjiang
 * time: 2017.7.25
 *
 * EXAMPLE USE
 *
 * new longTouch(element,singlefun[,longtapfun])
 * 
 */
(function(window){
    'use strict';
    function longTouch(el,singlefun,longtapfun){
        this.startTime = '';
        this.endTime = '';
        this.longTime = 350;
        this.startX = 0;
        this.startY = 0;
        this.el = el;
        this.singlefun = singlefun;
        this.longtapfun = longtapfun||'';
        this.init();
    }
    longTouch.prototype.init = function(){
        if(typeof(this.el)!='object'){return ;}
        let lt = this;
        this.el.addEventListener('touchstart',function(e){
            e.preventDefault();
            lt.startX = e.changedTouches[0].clientX;
            lt.startY = e.changedTouches[0].clientY;
            lt.startTime = new Date().getTime();
        });
        this.el.addEventListener('click',function(e){
            return typeof(lt.singlefun)=='function'?lt.singlefun(e):'';
        });
        this.el.addEventListener('touchend',function(e){
            lt.endTime = new Date().getTime();
            //是否滑动了
            if(Math.abs(e.changedTouches[0].clientX-lt.startX)>5 || Math.abs(e.changedTouches[0].clientY-lt.startY)>5){
                return ;
            }
            if(lt.endTime-lt.startTime>lt.longTime){
                return typeof(lt.longtapfun)=='function'?lt.longtapfun(e):'';
            }else{
                return typeof(lt.singlefun)=='function'?lt.singlefun(e):'';
            }
        });
    }
    window.longTouch = longTouch;
})(window);