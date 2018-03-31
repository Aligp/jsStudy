/*
* ie：   execScript()
* !ie : eval()
*
* ==事件源==
*   ie: window.event.srcElement
*   !ie: event.target
*
* ==输入连续触发==
*   ie: onpropertychange
*   !ie: oninput
*
* ==选中文字==
*   function selectText() {
        if (document.selection) { //ie
            return document.selection.createRange().text;
        } else { //标准
            //window.getSelection()是一个对象，转成字符串
            return window.getSelection().toString()
        }
    }
*
* */