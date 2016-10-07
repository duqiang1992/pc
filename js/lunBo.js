/**
 * Created by du on 2016/8/29.
 */
(function () {
    var lunBOx = document.getElementById('lunBo');
    var oDiv = lunBOx.getElementsByTagName('div')[0];
    var aDiv = oDiv.getElementsByTagName('div');
    var oUl = lunBOx.getElementsByTagName('ul')[0];
    var aLi = lunBOx.getElementsByTagName('li');
    var oI = lunBOx.getElementsByTagName('i')[0];
    var timer = null;
    var step = -1;
    var bok = true;
    clearInterval(timer);
    timer = setInterval(move, 2000);
    function move() {
        if (step >= aDiv.length - 1) {
            step = -1
        }
        step++;
        setBanner()
    }

    function setBanner() {
        for (var i = 0; i < aDiv.length; i++) {
            if (i === step) {
                utils.css(aDiv[i], 'zIndex', 1);
                animate(aDiv[i], {opacity: 1}, 1000, function () {
                    var siblings = utils.siblings(this);
                    for (var i = 0; i < siblings.length; i++) {
                        animate(siblings[i], {opacity: 0})
                    }
                });
                continue;
            }
            utils.css(aDiv[i], 'zIndex', 0)
        }
        banner()
    }

    function banner() {
        for (var i = 0; i < aLi.length; i++) {
            if (i === step) {
                aLi[i].className = 'on';
            } else {
                aLi[i].className = '';
            }
        }
    }

    handBanner();
    function handBanner() {
        for (var i = 0; i < aLi.length; i++) {
            (function (index) {
                aLi[i].onclick = function () {
                    step = index;
                    setBanner();
                    banner();
                }
            })(i)
        }
    }

    overOut();
    function overOut() {
        lunBOx.onmouseover = function () {
            clearInterval(timer)
        };
        lunBOx.onmouseout = function () {
            timer = setInterval(move, 2000);
        }
    }

    oI.onclick = function () {
        if (bok) {
            utils.removeClass(oI, 'on');
            bok = false;
        } else {
            utils.addClass(oI, 'on');
            bok = true;
        }
    };
    var oBottom=document.getElementById('bottom');
    var aBtn=document.getElementById('abtn');
    aBtn.onclick=function(){
        oBottom.style.display='none'
    }
})();