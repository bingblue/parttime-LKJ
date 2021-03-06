'use strict'

$(function () {
  /**
   * 弹框
   * title 弹框标题
   * callback 回调函数
   */
  function bomb (_ref, callback) {
    var _ref$title = _ref.title,
      title = _ref$title === undefined ? '确认清空所有未读消息？' : _ref$title

    var $str = $('<div class="bomb-wp">\n                <div class="bomb-ct">\n                  <img src="../../img/bomb_icon.png" alt="" class="bomb-icon">\n                  <p class="bomb-title">' + title + '</p>\n                  <div class="btn-wp clearfix">\n                    <i class="line"></i>\n                    <a data-close="0" href="javascript:;" class="cancle-btn">\u53D6\u6D88</a>\n                    <a data-close="1" href="javascript:;" class="sure-btn">\u786E\u8BA4</a>\n                  </div>\n                </div>\n              </div>')
    $str.appendTo('body').show()
    $str.find('[data-close]').click(function (e) {
      $str.remove()
      var dataclose = $(e.target).attr('data-close')
      callback(dataclose)
    })
  }
  /**
   * 左滑删除
   * el 滑动元素
   */
  function leftslideDelete (el) {
    var touchstartX = 0,
      touchstartY = 0,
      touchmoveX = 0,
      touchmoveY = 0,
      touchendX = 0

    $(el).on('touchstart', function (event) {
      touchstartX = event.originalEvent.changedTouches[0].pageX
      touchstartY = event.originalEvent.changedTouches[0].pageY
      // console.log(touchstartX, touchstartY)
    })
    $(el).on('touchmove', function (event) {
      touchmoveX = event.originalEvent.changedTouches[0].pageX
      touchmoveY = event.originalEvent.changedTouches[0].pageY
      var distanceX = Math.abs(touchmoveX - touchstartX)
      var distanceY = Math.abs(touchmoveY - touchstartY)
      // console.log(distanceX, distanceY)
      if (distanceX > distanceY) {
        event.preventDefault()
      }
    })
    var canslide = void 0 // 1代表可滑动 2代表上一个滑动的
    $(el).on('touchend', function (event) {
      touchendX = event.originalEvent.changedTouches[0].pageX
      var distanceX = touchendX - touchstartX
      $('.delete-btn').html('删除')
      if (distanceX > 0) {
        // 左滑
        $(el).animate({
          marginLeft: '0'
        }, 500)
        $(this).data('canslide', 1)
      } else if (distanceX < 0 && Math.abs(distanceX) > 50) {
        // 右滑
        canslide = $(this).data('canslide')
        if (canslide === 1) {
          $(el).each(function () {
            if ($(this).data('canslide') === 2) {
              $(this).animate({
                marginLeft: '0'
              }, 500)
              $(this).data('canslide', 1)
            }
          })
          $(this).animate({
            marginLeft: '-4.45rem'
          }, 500)
          $(this).data('canslide', 2)
        } else if (canslide === 2) {
          return false
        }
      }
    })
  }
  leftslideDelete('.msg-ul .li-wp-fa')

  /**
   * 点击删除
   */
  $('.delete-btn').on('click', function () {
    if ($(this).html() === '确认删除') {
      var len = $(this).parents('.msg-ul').find('li').length
      len = len - 1
      if (!len) {
        $(this).parents('ul').prev('.date-txt').remove()
      }
      $(this).parents('li').remove()
    }
    var _this = this
    $(_this).html('确认删除')
  })
  /**
   * 清空消息
   */
  $('.deleteall-btn').click(function () {
    bomb({}, function (data) {
      console.log(data)
      if (data === '1') {
        $('.date-txt, .msg-ul').remove()
      }
    })
  })
  $('.delete-review-btn').click(function () {
    bomb({
      title: '确认清空复核数据吗?'
    }, function (data) {
      console.log(data)
      if (data === '1') {
        $('.version-review .review-info-item').remove()
      }
    })
  })
  /**
   * 校时页面切换tab
   */
  $('.left-tab').click(function () {
    $(this).addClass('tab-active')
    $('.wj-tab').removeClass('m-right')
    $('.right-tab').removeClass('tab-active')
  })
  $('.right-tab').click(function () {
    $(this).addClass('tab-active')
    $('.wj-tab').addClass('m-right')
    $('.left-tab').removeClass('tab-active')
  })
  /**
   * 返回上一页
   */
  $('.deletepage-btn, .return-img').click(function () {
    window.history.go(-1)
  })
})
