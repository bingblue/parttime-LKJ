$(function () {
  /**
   * 功能介绍,每个方法请写注释，按下面模板来写.
   * @author <作者>
   * @param {类型} 参数名 描述.
   * @param {string} name=alice 姓名(默认alice).
   * @param {object} option 配置信息.
   * @return {Number} 返回值描述.
   */
  function name (name, option) {
    return 1
  }
  var type = 2
  name(type)
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
   */
  let [touchstartX, touchstartY, touchmoveX, touchmoveY, touchendX, lastindex] = [0, 0, 0, 0, 0]
  $('.msg-ul .li-wp-fa').on('touchstart', function (event) {
    touchstartX = event.changedTouches[0].pageX
    touchstartY = event.changedTouches[0].pageY
    // console.log(touchstartX, touchstartY)
  })
  $('.msg-ul .li-wp-fa').on('touchmove', function (event) {
    touchmoveX = event.changedTouches[0].pageX
    touchmoveY = event.changedTouches[0].pageY
    let distanceX = Math.abs(touchmoveX - touchstartX)
    let distanceY = Math.abs(touchmoveY - touchstartY)
    // console.log(distanceX, distanceY)
    if (distanceX > distanceY) {
      event.preventDefault()
    }
  })
  $('.msg-ul .li-wp-fa').on('touchend', function (event) {
    touchendX = event.changedTouches[0].pageX
    let distanceX = touchendX - touchstartX
    if (distanceX > 0) { // 左滑
      $('.msg-ul .li-wp-fa').animate({
        marginLeft: '0'
      }, 500)
      if ($(this).parent('li').index() === lastindex) {
        $(this).addClass('candelete')
      }
    } else if (distanceX < 0 && Math.abs(distanceX) > 50) { // 右滑
      if ($(this).parent('li').index() !== lastindex) {
        $('.msg-ul li').eq(lastindex).find('.li-wp-fa').animate({
          marginLeft: '0'
        }, 500)
        lastindex = $(this).parent('li').index()
        // console.log('lastindex' + lastindex)
        $(this).animate({
          marginLeft: '-8.9rem'
        }, 500)
      } else if ($(this).hasClass('candelete')) {
        $(this).animate({
          marginLeft: '-8.9rem'
        }, 500)
      }
    }
  })
  /**
   * 点击删除
   */
  $('.delete-btn').on('click', function () {
    let _this = this
    bomb({}, function (data) {
      console.log(data)
      if (data === '1') {
        $(_this).parent('li').remove()
      }
    })
  })
})
