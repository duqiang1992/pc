(function () {
    var tobox1 = document.getElementById('tobox1');
    var fWin=document.getElementById('fWin');
    window.onscroll = function () {
        if (utils.win('scrollTop') >= utils.win('clientHeight')) {
            utils.css(fWin,'display','block');
            utils.css(tobox1, 'opacity', 1)
        } else {
            utils.css(tobox1, 'opacity', 0);
            utils.css(fWin,'display','none')
        }
    };
    tobox1.onclick = toTop;
    function toTop() {
        var target = utils.win('scrollTop');
        var duration = 1000;
        var f = 30;
        var step = target / duration * f;
        var timer = setInterval(function () {
            var curPosi = utils.win('scrollTop');
            if (curPosi <= 0) {
                clearInterval(timer);
                return;
            }
            curPosi-=step;
            utils.win('scrollTop', curPosi)
        }, f)
    }
    changPost();
    function changPost(){
        var types = document.getElementById('types');
        var aA = types.getElementsByTagName('a');
        var aSpan = types.getElementsByTagName('span');
        var aB = types.getElementsByTagName('b');
        for (var i = 0; i < aA.length; i++) {
            (function (index) {
                aA[index].onmouseenter = function () {
                    //aSpan.style.backgroundImage='url()'
                    aB[index].style.color = 'white';
                    switch (index) {
                        case 0:
                            utils.css(aSpan[0], 'backgroundPosition', '-720px 0');
                            break;
                        case 1:
                            utils.css(aSpan[1], 'backgroundPosition', '-1008px 0');
                            break;
                        case 2:
                            utils.css(aSpan[2], 'backgroundPosition', '-936px 0');
                            break;
                        case 3:
                            utils.css(aSpan[3], 'backgroundPosition', '-1104px 0');
                            break;
                        case 4:
                            utils.css(aSpan[4], 'backgroundPosition', '-1296px 0');
                            break;
                        default:
                            utils.css(aSpan[5], 'backgroundPosition', '-552px 0');
                    }
                };
                aA[index].onmouseleave = function () {
                    //aSpan.style.backgroundImage='url()'
                    aB[index].style.color = '#666';
                    switch (index) {
                        case 0:
                            utils.css(aSpan[0], 'backgroundPosition', '-696px 0');
                            break;
                        case 1:
                            utils.css(aSpan[1], 'backgroundPosition', '-984px 0');
                            break;
                        case 2:
                            utils.css(aSpan[2], 'backgroundPosition', '-912px 0');
                            break;
                        case 3:
                            utils.css(aSpan[3], 'backgroundPosition', '-1080px 0');
                            break;
                        case 4:
                            utils.css(aSpan[4], 'backgroundPosition', '-1272px 0');
                            break;
                        default:
                            utils.css(aSpan[5], 'backgroundPosition', ' -528px 0');

                    }
                }
            })(i)
        }
    }
})();
