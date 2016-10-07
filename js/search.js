(function(){
    var types=document.getElementById('types');
    var aS=types.getElementsByTagName('a');
    var clickBox=document.getElementById('clickBox');
    var a=utils.getChildren(clickBox,'div');
    for(var i=0;i<aS.length;i++){
        (function(index){
            aS[i].onclick=function() {
                var curT=utils.win('scrollTop');
                var t = utils.offset(a[index]).top-100;
                var step = t / 300;
                var timer = setInterval(function () {
                    if(curT>=t){
                        utils.win('scrollTop',t);
                        clearInterval(timer)
                    }
                     curT += step;
                    utils.win('scrollTop', curT)
                }, 5)
            }
        })(i)
    }
})();
