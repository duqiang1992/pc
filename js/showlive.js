
(function(){
    var oHead = document.getElementById('head');
    var oList = document.getElementById('list');
    var oCity = document.getElementById('logoCity');
    var liveDiv = document.getElementById('live');
    var aLi = oList.getElementsByTagName('li');
    var aSpan = oList.getElementsByTagName('span');
    var showCode = document.getElementById('boxCode');
    var lastAfter = document.getElementById('lastAfter');
    var triangle = document.getElementById('triangle');
    var phone=document.getElementById('phone');
    var ph=document.getElementById('a.ph');
    var bok = true;
    aLi[0].style.color = 'red';
    oCity.onclick = function () {
        if (bok) {
            triangle.className = 'click';
            animate(oList, {top: 50}, 100);
            bok = false

        } else {
            triangle.className = '';
            animate(oList, {top: 0}, 100);
            bok = true;
        }
    };
    for (var i = 0; i < aLi.length; i++) {
        (function (index) {
            aLi[i].onclick = function () {
                for (var j = 0; j < aLi.length; j++) {
                    (function (index) {
                        aLi[index].style.color = '#999';
                    })(j)
                }
                liveDiv.innerHTML = aLi[index].innerHTML;
                aLi[index].style.color = 'red';
                animate(oList, {top: 2}, 200);
                bok = true;
            }
        })(i)
    }
    lastAfter.onmouseenter = function () {
        showCode.style.display = 'block';
        phone.className='last';
        ph.style.color='white'
    };
    lastAfter.onmouseleave = function () {
        showCode.style.display = 'none';
        phone.className='first';
        ph.style.color='#999'
    }
})();