function Drag(id) {
    this.oDiv = document.getElementById(id);
    this.disX = 0;
    this.disY = 0;

    var that = this;

    this.oDiv.onmousedown = function (ev) {
        that.fnDown(ev);
        return false;
    }
};

Drag.prototype.fnDown = function (ev) {
    var ev = ev || event;
    this.disX = ev.clientX - this.oDiv.offsetLeft;
    this.disY = ev.clientY - this.oDiv.offsetTop;

    var _this = this;

    document.onmousemove = function (ev) {
        _this.fnMove(ev);
    };
    document.onmouseup = function () {
        _this.fnUp();
    };
};

Drag.prototype.fnMove = function (ev) {
    var oEvent = ev || event;
    this.oDiv.style.left = oEvent.clientX - this.disX + 'px';
    this.oDiv.style.top = oEvent.clientY - this.disY + 'px';
};

Drag.prototype.fnUp = function () {
    document.onmousemove = null;
    document.onmouseup = null;
}