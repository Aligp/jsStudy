/**
 * 缓冲运动
 * 任意值运动
 * @param obj  运动者
 * @param iTarget  目标值
 * @param attr  所发生运动的属性
 * @param fn 函数（链式运动）singleAttrMove
 */
function anyMove(obj, iTarget, attr, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var iCur = 0;
        if (attr == 'opacity') {
            iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
        } else {
            iCur = parseInt(getStyle(obj, attr));
        }
        var iSpeed = (iTarget - iCur) / 8;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        if (iCur == iTarget) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
        else {
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
                obj.style.opacity = (iCur + iSpeed) / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }
        }
    }, 30)
}

var iSpeed = 0;
var left = 0;

function startMove(obj, iTarget) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        iSpeed += (iTarget - obj.offsetLeft) / 5;
        iSpeed *= 0.7;
        left += iSpeed;
        //使用left变量，能让误差减到最小（小数误差），
        //像素只能是整数，而iSpeed每次都是小数，会把小数部分丢弃掉，累积多了，误差就大，
        //最后让obj.style.left等于变量的值，而不是每次都加上iSpeed的值，
        //每次都加，就会每次舍弃小数部分
        // obj.style.left = obj.offsetLeft + iSpeed + 'px';
        if (Math.abs(iSpeed) < 1 && Math.abs(left - iTarget) < 1) {
            //停止条件就是速度足够小并且距离足够近
            clearInterval(obj.timer);
            obj.style.left = iTarget + 'px';
        } else {
            obj.style.left = left + 'px';
        }
    }, 30)
}

/**
 * 获取属性值
 * @param obj
 * @param attr  所获取的属性
 * @returns {*} 返回属性值
 */
function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}

/**
 * 设置属性以及属性值
 * @param obj
 * @param json
 */
function setStyle(obj, json) {
    for (var attr in json) {
        obj.style[attr] = json[attr];
    }
}

/**
 * 缓冲运动
 * 可以同时改变多个属性
 * @param obj
 * @param json {attr1:iTarget1,attr2:iTarget2,...}
 * @param fn
 * moreAttrMove
 */
function syncMove(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var bStop = true; //所有的值都到达了目标值
        for (var attr in json) {
            //1.取当前值
            var iCur = 0;
            if (attr == 'opacity') {
                iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                iCur = parseInt(getStyle(obj, attr));
            }
            //2.计算速度
            var iSpeed = (json[attr] - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            //3.检查停止
            if (iCur != json[attr]) {
                bStop = false;
            }
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
                obj.style.opacity = (iCur + iSpeed) / 100;
            } else {
                obj.style[attr] = iCur + iSpeed + 'px';
            }
        }
        if (bStop) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 30)
}

/**
 * 弹性运动
 * @param obj
 * @param oTarget
 * @param fn
 */
function startMove(obj, oTarget, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var bStop = true;
        for (attr in oTarget) {

            if (!obj.oSpeed) obj.oSpeed = {};
            if (!obj.oLeft) obj.oLeft = 0;
            if (!obj.oSpeed[attr]) obj.oSpeed[attr] = 0;
            cur = getStyle(obj,attr);
            // console.log(parseInt(cur)+'---'+obj.offsetLeft);
            obj.oSpeed[attr] += (oTarget[attr] - parseInt(cur)) / 5;
            obj.oSpeed[attr] *= 0.7;
            obj.oLeft += obj.oSpeed[attr];

            if (Math.abs(obj.oSpeed[attr]) < 1 && Math.abs(obj.oLeft - oTarget[attr]) < 1) {
                //停止条件就是速度足够小并且距离足够近
                clearInterval(obj.timer);
                obj.style[attr] = oTarget[attr] + 'px';
            } else {
                bStop = false;
                obj.style[attr] = obj.oLeft + 'px';
            }

        }

        if (bStop) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 30);

}

/**
 * 获取id
 * @param obj
 * @returns {HTMLElement | null}
 */
function id(obj) {
    return document.getElementById(obj);
}

/**
 * 事件绑定
 * @param obj
 * @param ev
 * @param fn
 */
function bind(obj, ev, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function () {
            fn.call(obj);
        })
    }
}

/**
 * 获取可视区宽高
 * @returns {{w: number, h: number}}
 */
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    }
}

/**
 * 添加class
 * @param obj
 * @param sClass
 */
function addClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

/**
 * 删除class
 * @param obj
 * @param sClass
 */
function removeClass(obj, sClass) {
    var aClass = obj.className.split(' ');
    if (!obj.className) return;
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) {
            aClass.splice(i, 1);
            obj.className = aClass.join(' ');
            break;
        }
    }
}

/**
 * 选择某个元素下的给定的特定class的元素集合
 * @param oParent
 * @param sClass
 * @returns {Array}
 */
function getByClass(oParent, sClass) {
    var aEle = oParent.getElementsByTagName("*");
    var aResult = [];
    var i = 0;

    for (i = 0; i < aEle.length; i++) {
        if (aEle[i].className == sClass) {
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}



