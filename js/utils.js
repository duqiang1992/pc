/**
 * Created by du on 2016/8/14.
 */
var utils=(function(){
    var flag='getComputedStyle' in window;
    return {
        //makeArray:类组数转数组
        makeArray:function(arg){
            var ary=[];
            if(flag){
                return ary=Array.prototype.slice.call(arg)
            }
            else{
                for(var i=0;i<arg.length;i++){
                    ary.push(arg[i])
                }
            }
            return ary
        },
        //jsonParse:
        jsonParse:function(str){
            return 'JSON' in window? JSON.parse(str):eval('('+str+')');
        },
        //win:对body属性的操作与赋值
        win:function win(attr,value){
            if(value===undefined){
                return document.documentElement[attr]||document.body[attr]
            }
            document.documentElement[attr]=document.body[attr]=value
        },
        //rnd:
        rnd:function rnd(n,m){
            n=Number(n);
            m=Number(m);
            if(isNaN(n)||isNaN(m)){
                return Math.random();
            };
            if(n>m){
                var tmp=m;
                m=n;
                n=tmp;
            }
            return Math.round(Math.random()*(m-n)+n);
        },
        //元素名，属性
        //1：getByClass通过classNmae获取元素组
        getByClass:function getByClass(strClass,parent){
            parent=parent||document;
            if(flag){
                return this.makeArray(parent.getElementsByClassName(strClass));
            }
            var aryClass=strClass.replace(/(^ +)|( +$)/g,'').split(/\s+/g);
            var curELe=parent.getElementsByTagName('*');
            var reg=null;
            var ary=[];
            for(var i=0;i<curELe.length;i++){
                var bok=true;
                var cur=curELe[i];
                for(var j=0;j<aryClass.length;j++){
                    reg=new RegExp('\\b'+aryClass[j]+'\\b');
                    if(!reg.test(cur.className)){
                        bok=false;
                        break
                    }
                }
                if(bok){
                    ary.push(cur)
                }
            }
            return ary
        },
        hasClass:function hasClass(curEle,cName){
            var reg=new RegExp('(^| +)'+cName+'( +|$)');
            return reg.test(curEle.className)
        },
        addClass:function setClass(curEle,addClass){
            var aryClass=addClass.replace(/(^ +)|( +$)/g,'').split(/\s+/);
            for (var i=0;i<aryClass.length;i++){
                if(!this.hasClass(curEle,aryClass[i])){
                    curEle.className+=' '+aryClass[i]
                }
            }
        },
        removeClass:function removeClass(curEle,remClass){
            var aryClass=remClass.replace(/(^ +)|( +$)/g,'').split(/\s+/);
            var reg=null;
            for(var i=0;i<aryClass.length;i++){
                if (this.hasClass(curEle,aryClass[i])){
                     reg=new RegExp('\\b'+aryClass[i]+'\\b');
                    curEle.className=curEle.className.replace(reg,' ').replace(/(^ +)|( +$)/g,'').replace(/\s+/g,' ')
                }
            }
        },
        getCss:function getCss(curEle,attr){
            var val=null;
            var reg=null;
            if(flag){
                val=getComputedStyle(curEle,false)[attr];
            }else{
                if(attr==='opacity'){
                    val=curEle.style.filter;
                    reg=/^alpha\(opacity[=:](\d+)\)$/;
                    return reg.test(val)?reg.exec(val)[1]/100:1;
                }
              val= curEle.currentStyle[attr]
            }
            reg=/^[+-]?((\d)|([1-9]\d+))(\.\d+)?(px|pt|em|rem)$/i;
            return reg.test(val)?parseFloat(val):val;
        },
        setCss:function setCss(curEle,attr,value){
            if(attr==='float'){
                curEle.style.cssFloat=value;
                curEle.style.styleFloat=value;
                return
            }
            if(attr==='opacity'){
                curEle.style[attr]=value;
                curEle.style.filter='alpha(opacity='+(value*100)+')';
                return
            }
            var reg=/^(height|width|left|right|bottom|top|lineHeight|((margin|padding)(left|right|bottom|top)?))$/gi;
            if(reg.test(attr)){
                if(!(value==='auto'||value.toString().indexOf('%')!==-1)){
                    value=parseFloat(value)+'px';
                }
            }
            curEle.style[attr]=value;
        },
        setGroupCss:function setGroupCss(curEle,opt){
            if(opt.toString()!=='[object Object]')return;
            for (var attr in opt){
                this.setCss(curEle,attr,opt[attr])
            }
        },
        css:function css(curEle){
            var arg2=arguments[1];
                if (typeof arg2==='string'){
                    var arg3=arguments[2];
                    if(arg3===undefined){
                       return this.getCss(curEle,arg2)
                    }
                    else{
                        this.setCss(curEle,arg2,arg3)
                    }
                }
                if(arg2.toString()==='[object Object]'){
                    this.setGroupCss(curEle,arg2)
                }
            },
        offset:function(curEle){
            var l=curEle.offsetLeft;
            var t=curEle.offsetTop;
            var parent=curEle.offsetParent;
            while (parent){
                if(navigator.userAgent.indexOf('MSIE 8.0')!==-1){
                    l+=parent.clientLeft;
                    t+=parent.clientTop;
                }
                l+=parent.offsetLeft;
                t+=parent.offsetTop;
                parent=parent.offsetParent;
            }
            return {left:l,top:t}
        },
        //元素节点
        getChildren:function getChildren(curEle,tagName){
            var nodeList=curEle.childNodes;
            var ary=[];
            for(var i=0;i<nodeList.length;i++){
                var curEle=nodeList[i];
                if(curEle.nodeType===1){
                    if(tagName!==undefined){
                        if(curEle.tagName.toLowerCase()===tagName.toLowerCase()){
                            ary.push(curEle)
                    }
                    }
                    else{
                        ary.push(curEle)
                    }
                }
            }
            return ary
        },
        pre:function pre(curEle){
            if(flag){
                return curEle.previousElementSibling
            }
                var pre=curEle.previousSibling;
                while (pre&&pre.nodeType!==1){
                    pre=pre.previousSibling
                }
            return pre
            },
        preAll:function preAll(curEle){
            var pre=this.pre(curEle);
            var ary=[];
            while (pre){
                ary.unshift(pre);
                pre=this.pre(pre);

            }
            return ary
        },
        next:function next(curEle){
            if(flag){
                return curEle.nextElementSibling
            }
            var next=curEle.nextSibling;
            while (next&&next.nodeType!==1){
                next=next.nextSibling
            }
            return next
        },
        nextAll:function nextAll(curEle){
            var next=this.next(curEle);
            var ary=[];
            while (next){
                ary.push(next);
                next=this.next(next);

            }
            return ary
        },
        sibling:function sibling(curEle){
            var ary=[];
            var pre=this.pre(curEle);
            if(pre){ary.unshift(pre)}
            var next=this.next(curEle);
            if(next){ary.push(next)}
            return ary
        },
        siblings:function siblings(curEle){
            var ary1=this.preAll(curEle);
            var ary2=this.nextAll(curEle);
            return ary1.concat(ary2)
        },
        firstChild:function firstChild(curEle){
            var ary=this.getChildren(curEle);
            return ary[0]
        },
        lastChild:function lastChild(curEle){
            var ary=this.getChildren(curEle);
            return ary[ary.length-1]
        },
        index:function index(curEle){
            var ary=this.preAll(curEle);
            return ary.length
        },
        //元素动态创建
        appendChild:function appendChild(parent,curEle){
            parent.append(curEle)
        },
        prependChild:function prependChild (parent,curEle){
            var first=this.firstChild(parent);
            if(first){
                first.parentNode.insertBefore(curEle,first)
            }
            else{
                parent.appendChild(curEle)
            }
        },
        insertBefore:function insertBefore(newEle,oldEle){
            oldEle.parentNode.insertBefore(newEle,oldEle)
        },
        insetAfter:function insetAfter(newEle,oldEle){
            var next=this.next(oldEle);
            if(next){
                oldEle.parentNode.insertBefore(newEle,next)
            }else{
                oldEle.parentNode.appendChild(newEle);
            }
        }
    }
})();