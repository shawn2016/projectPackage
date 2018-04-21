//返回顶部
function imj2() {
    this.init();
}
imj2.prototype = {
    constructor: imj2,
    init: function () {
        this._initBackTop();
    },
    _initBackTop: function () {
        var $backTop = this.$backTop = $('<div class="m-top-cbbfixed">' +
            '<a class="m-top-weixin m-top-cbbtn"">' +
            '<span class="m-top-weixin-icon"></span><div></div>' +
            '</a>' +
            '<a class="m-top-go m-top-cbbtn">' +
            '<span class="m-top-goicon"></span>' +
            '</a>' +
            '</div>');
        $('body').append($backTop);
        $backTop['click'](function () {
            $("html, body").animate({
                scrollTop: 0
            }, 120);
        });
        var timmer = null;
        $(window).bind("scroll", function () {
            var d = $(document).scrollTop(),
                e = $(window).height();
            0 < d ? $backTop['css']("bottom", "10px") : $backTop['css']("bottom", "-90px");
            clearTimeout(timmer);
            timmer = setTimeout(function () {
                clearTimeout(timmer)
            }, 100);
        });
    }
}
var imj2 = new imj2();
//end返回顶部


// 移动端收齐
function toogleMenu(type, views) {
    // 移动端展开移动端
    if ($('.mobile-inner-header-icon').hasClass('mobile-inner-header-icon-out')) {
        $('.mobile-inner-header-icon').removeClass('mobile-inner-header-icon-out')
        $('.mobile-inner-header-icon').addClass('mobile-inner-header-icon-click')
        $('.nav-box').css('display', 'block')
        $(".nav-box").animate({
            height: '100%'
        });
    } else {
        $(".nav-box").animate({
            height: '0'
        }, 300, function (params) {
            $('.nav-box').css('display', 'none')
        });
        $('.mobile-inner-header-icon').addClass('mobile-inner-header-icon-out')
        $('.mobile-inner-header-icon').removeClass('mobile-inner-header-icon-click')
    }
    if (type) {
        location.href = location.href.replace(/(.*\/){0,}([^.]+).*/ig, '$1' + views + '.html')
        $("html, body").animate({
            scrollTop: 0
        }, 300);
    }
}
$(document).ready(function () {
    // $('.nav-box').css('display', 'none')
    // $(".nav-box").animate({
    //     height: '0'
    // });

})
