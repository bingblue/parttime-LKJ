$(function () {
  /**
   * 弹框
   * title 弹框标题
   * callback 回调函数
   */
  function bomb ({title = '确认清空所有未读消息？'}, callback) {
    let $str = $(`<div class="bomb-wp">
                <div class="bomb-ct">
                  <img src="../../img/bomb_icon.png" alt="" class="bomb-icon">
                  <p class="bomb-title">${title}</p>
                  <div class="btn-wp clearfix">
                    <i class="line"></i>
                    <a data-close="0" href="javascript:;" class="cancle-btn">取消</a>
                    <a data-close="1" href="javascript:;" class="sure-btn">确认</a>
                  </div>
                </div>
              </div>`)
    $str.appendTo('body').show()
    $str.find('[data-close]').click(function (e) {
      $str.remove()
      let dataclose = $(e.target).attr('data-close')
      callback(dataclose)
    })
  }
  /**
   * 左滑删除
   * el 滑动元素
   */
  function leftslideDelete (el) {
    let [touchstartX, touchstartY, touchmoveX, touchmoveY, touchendX] = [0, 0, 0, 0, 0]
    $(el).on('touchstart', function (event) {
      touchstartX = event.changedTouches[0].pageX
      touchstartY = event.changedTouches[0].pageY
      // console.log(touchstartX, touchstartY)
    })
    $(el).on('touchmove', function (event) {
      touchmoveX = event.changedTouches[0].pageX
      touchmoveY = event.changedTouches[0].pageY
      let distanceX = Math.abs(touchmoveX - touchstartX)
      let distanceY = Math.abs(touchmoveY - touchstartY)
      // console.log(distanceX, distanceY)
      if (distanceX > distanceY) {
        event.preventDefault()
      }
    })
    let canslide // 1代表可滑动 2代表上一个滑动的
    $(el).on('touchend', function (event) {
      touchendX = event.changedTouches[0].pageX
      let distanceX = touchendX - touchstartX
      $('.delete-btn').html('删除')
      if (distanceX > 0) { // 左滑
        $(el).animate({
          marginLeft: '0'
        }, 500)
        $(this).data('canslide', 1)
      } else if (distanceX < 0 && Math.abs(distanceX) > 50) { // 右滑
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
            marginLeft: '-8.9rem'
          }, 500)
          $(this).data('canslide', 2)
        } else if (canslide === 2) {
          return false
        }
      }
    })
  }
  leftslideDelete('.msg-ul .li-wp-fa')
  // $('.msg-ul .li-wp-fa').on('touchend', function (event) {
  //   touchendX = event.changedTouches[0].pageX
  //   let distanceX = touchendX - touchstartX
  //   if (distanceX > 0) { // 左滑
  //     $('.msg-ul .li-wp-fa').animate({
  //       marginLeft: '0'
  //     }, 500)
  //     if ($(this).parent('li').index() === lastindex) {
  //       $(this).addClass('candelete')
  //     }
  //   } else if (distanceX < 0 && Math.abs(distanceX) > 50) { // 右滑
  //     if ($(this).parent('li').index() !== lastindex) {
  //       $('.msg-ul li').eq(lastindex).find('.li-wp-fa').animate({
  //         marginLeft: '0'
  //       }, 500)
  //       lastindex = $(this).parent('li').index()
  //       // console.log('lastindex' + lastindex)
  //       $(this).animate({
  //         marginLeft: '-8.9rem'
  //       }, 500)
  //     } else if ($(this).hasClass('candelete')) {
  //       $(this).animate({
  //         marginLeft: '-8.9rem'
  //       }, 500)
  //     }
  //   }
  // })

  /**
   * 点击删除
   */
  $('.delete-btn').on('click', function () {
    let _this = this
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
  /**
   * 校时页面切换tab
   */
  $('.left-tab').click(function () {
    $(this).addClass('tab-active')
    $('.leftside').removeClass('none')
    $('.rightside').addClass('none')
    $('.right-tab').removeClass('tab-active')
  })
  $('.right-tab').click(function () {
    $(this).addClass('tab-active')
    $('.rightside').removeClass('none')
    $('.leftside').addClass('none')
    $('.left-tab').removeClass('tab-active')
  })
  /**
   * 返回上一页
   */
  $('.deletepage-btn, .return-img').click(function () {
    history.go(-1)
  })
})
