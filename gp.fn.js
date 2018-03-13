/**
 * 通过class获取某一obj下给定值的obj
 * @param oParent
 * @param sClass
 * @returns {Array}
 */
function getByClass(oParent, sClass) {
    var aEle = oParent.getElementsByTagName('*');
    var aResult = [];
    var re = new RegExp('\\b' + sClass + '\\b', 'i');
    var i = 0;

    for (i = 0; i < aEle.length; i++) {
        if (re.test(aEle[i].className)) {
            aResult.push(aEle[i]);
        }
    }

    return aResult;
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
 *  取得给定两个数之间的一个随机数
 * @param min  最小数
 * @param max  最大数
 * @returns {*}
 */
function rnd(min, max) {
    return parseInt((Math.random() * 999999) % (max - min + 1)) + min;
}

/**
 * 获取url参数
 * @returns {Object}
 * @constructor
 *  如下调用
 *  var Request = new Object();
 *  Request = GetRequest();
 */
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

/**
 * 浅拷贝，对象引用的时候，改变新对象不影响原来的
 * @param obj
 * @returns {Object}
 */
function copy(obj) {
    var newObj = {};
    for (var attr in obj) {
        newObj[attr] = obj[attr];
    }
    return newObj;
}

/**
 * 深拷贝
 * @param obj
 * @returns {Object}
 */
function deepCopy(obj) {
    if (typeof obj != 'object') {
        return obj;
    }
    var newObj = {};
    for (var attr in obj) {
        newObj[attr] = deepCopy(obj[attr]);
    }
    return newObj;
}

function deepCopy2(obj) {
    var newObj = {};
    for (var attr in obj) {
        if (typeof obj[attr] == 'object') {
            newObj[attr] = deepCopy2(obj[attr]);
        } else {
            newObj[attr] = obj[attr];
        }
    }
    return newObj;
}

/**
 * 给定的数组排序
 * @param arr 给定的数组
 * @param boolean true为正序，false为倒序
 * @returns {*}
 */
function quickSort(arr, boolean) {
    if (arr.length <= 1) {
        return arr;
    }
    //找到中间的数
    var num = Math.floor(arr.length / 2);
    var numVal = arr.splice(num, 1);

    var left = [];
    var right = [];

    for (var i = 0; i < arr.length; i++) {
        if (boolean) {
            if (arr[i] < numVal) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        } else {
            if (arr[i] < numVal) {
                right.push(arr[i]);
            } else {
                left.push(arr[i]);
            }
        }
    }

    return quickSort(left, boolean).concat([numVal], quickSort(right, boolean));

<<<<<<< HEAD
}
=======
}
>>>>>>> c1111dfb9a6504df3b63fc6205fa683c19e16fbc
