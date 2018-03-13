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
};