/**
 * 取的属性值
 * @param obj  取值对象
 * @param attr  属性
 * @param value 为属性赋值的值
 * @returns {*}
 */
function css(obj, attr, value) {
    if (arguments.length == 2)
        return parseFloat(obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, false)[attr]);
    else if (arguments.length == 3)
        switch (attr) {
            case 'width':
            case 'height':
            case 'paddingLeft':
            case 'paddingTop':
            case 'paddingRight':
            case 'paddingBottom':
                value = Math.max(value, 0);
            case 'left':
            case 'top':
            case 'marginLeft':
            case 'marginTop':
            case 'marginRight':
            case 'marginBottom':
                obj.style[attr] = value + 'px';
                break;
            case 'opacity':
                obj.style.filter = "alpha(opacity:" + value * 100 + ")";
                obj.style.opacity = value;
                break;
            default:
                obj.style[attr] = value;
        }

    return function (attr_in, value_in) {
        css(obj, attr_in, value_in)
    };
}

var GP_MOVE_TYPE = {
    BUFFER: 1,
    FLEX: 2
};

/**
 * 运动入口函数
 * @param obj 运动对象
 * @param oTarget 标值{"left":200,...}
 * @param iType 运动方式(缓冲/弹性)
 * @param fnCallBack 回调函数
 * @param fnDuring 在运动过程中执行的函数
 */
function gpStartMove(obj, oTarget, iType, fnCallBack, fnDuring) {
    var fnMove = null;
    /*if (obj.timer != 'undefined') {
        clearInterval(obj.timer);
    }*/
    clearInterval(obj.timer);
    switch (iType) {
        case GP_MOVE_TYPE.BUFFER:
            fnMove = gpDoMoveBuffer;
            break;
        case GP_MOVE_TYPE.FLEX:
            fnMove = gpDoMoveFlex;
            break;
    }

    obj.timer = setInterval(function () {
        fnMove(obj, oTarget, fnCallBack, fnDuring);
    }, 15);
}

/**
 * 缓冲运动
 * @param obj  运动对象
 * @param oTarget 目标值{"left":200,...}
 * @param fnCallBack 回调函数
 * @param fnDuring 在运动过程中执行的函数
 */
function gpDoMoveBuffer(obj, oTarget, fnCallBack, fnDuring) {
    var bStop = true;
    var attr = '';
    var speed = 0;
    var cur = 0;

    for (attr in oTarget) {
        cur = css(obj, attr);
        if (oTarget[attr] != cur) {
            bStop = false;

            speed = (oTarget[attr] - cur) / 5;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            css(obj, attr, cur + speed);
        }
    }

    if (fnDuring) fnDuring.call(obj);

    if (bStop) {
        clearInterval(obj.timer);
        obj.timer = null;

        if (fnCallBack) fnCallBack.call(obj);
    }
}

/**
 * 弹性运动
 * @param obj 运动对象
 * @param oTarget 目标值{"left":200,...}
 * @param fnCallBack 回调函数
 * @param fnDuring 在运动过程中执行的函数
 */
function gpDoMoveFlex(obj, oTarget, fnCallBack, fnDuring) {
    var bStop = true;
    var attr = '';
    var speed = 0;
    var cur = 0;

    for (attr in oTarget) {
        if (!obj.oSpeed) obj.oSpeed = {};
        if (!obj.oSpeed[attr]) obj.oSpeed[attr] = 0;
        cur = css(obj, attr);
        if (Math.abs(oTarget[attr] - cur) > 1 || Math.abs(obj.oSpeed[attr]) > 1) {
            bStop = false;

            obj.oSpeed[attr] += (oTarget[attr] - cur) / 5;
            obj.oSpeed[attr] *= 0.7;
            var maxSpeed = 65;
            if (Math.abs(obj.oSpeed[attr]) > maxSpeed) {
                obj.oSpeed[attr] = obj.oSpeed[attr] > 0 ? maxSpeed : -maxSpeed;
            }

            css(obj, attr, cur + obj.oSpeed[attr]);
        }
    }

    if (fnDuring) fnDuring.call(obj);

    if (bStop) {
        clearInterval(obj.timer);
        obj.timer = null;
        if (fnCallBack) fnCallBack.call(obj);
    }
}