//===================================//
//**************String**************//
//===================================//

//字符串去除两边空格
String.prototype.Trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};

//字符串去除左边空格
String.prototype.LTrim = function () {
    return this.replace(/(^\s*)/g, '');
};

//字符串去除右边空格
String.prototype.RTrim = function () {
    return this.replace(/(\s*$)/g, '');
};

/**
 * 在String的原型上：把指定时间格式的字符串换成我们想要的各种形式
 * @returns {string}
 */
String.prototype.gpFormatTime = function () {
    var reg = /^(\d{4})(?:-|\/|\.|:)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})(?:\s+)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})$/g;
    var ary = [];
    this.replace(reg, function () {
        ary = ([].slice.call(arguments)).slice(1, 7);
    });
    var format = arguments[0] || "{0}年{1}月{2}日 {3}:{4}:{5}";
    return format.replace(/{(\d+)}/g, function () {
        var val = ary[arguments[1]];
        return val.length === 1 ? "0" + val : val;
    })
};
//var str2 = '2018-3-31 10:09:10';
//console.log(str2.gpFormatTime("{0}年{1}月{2}日 {3}:{4}:{5}"))


//===================================//
//***************Array***************//
//===================================//

//校验数组中是否包含给定的值
Array.prototype.contains = function (needle) {
    for (i in this) {
        if (this[i] == needle) return true;
    }
    return false;
};

//删除数组中对应的数据
Array.prototype.removeByValue = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
    return this;
};

//数组去重
Array.prototype.gpUnique = function gpUnique() {
    var obj = {};
    for (var i = 0; i < this.length; i++) {
        var cur = this[i];
        if (obj[cur] == cur) {
            this[i] = this[this.length - 1];
            this.length--;
            i--;
            continue;
        }
        obj[cur] = cur;
    }
    obj = null;
    return this;
}
