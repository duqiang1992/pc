(function () {
    var liList = document.getElementById('liList');
    var aLi = liList.getElementsByTagName('li');
    var lastBoxR2 = document.getElementById('lastBoxR2');
    var aDl = lastBoxR2.getElementsByTagName('dl');
    for (var i = 0; i < aDl.length; i++) {
        aLi[i].index = i;
        aLi[i].onmouseover = function () {
            aDl[this.index].style.display = 'block'
        };
        aLi[i].onmouseout = function () {
            aDl[this.index].style.display = 'none'
        }
    }
})();