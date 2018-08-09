(function(win, doc) {
    function change() {
        var cWidth;
        if (document.documentElement.clientWidth < 320) {
            cWidth = 320;
        } else if (document.documentElement.clientWidth > 750) {
            cWidth = 750;
        } else {
            cWidth = document.documentElement.clientWidth;
        };
        document.documentElement.style.fontSize = cWidth / 18.75 + 'px';
    }

    win.addEventListener('resize', change, false);
    win.addEventListener('DOMContentLoaded', change, false);
})(window, document);