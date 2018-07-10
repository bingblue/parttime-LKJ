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
   *
   */
  let [touchstartX, touchstartY, touchmoveX, touchmoveY, touchendX, lastindex] = [0, 0, 0, 0, 0]
  $('.msg-ul .li-wp-fa').on('touchstart', function (e) {
    touchstartX = event.changedTouches[0].pageX
    touchstartY = event.changedTouches[0].pageY
    // console.log(touchstartX, touchstartY)
  })
  $('.msg-ul .li-wp-fa').on('touchmove', function (e) {
    touchmoveX = event.changedTouches[0].pageX
    touchmoveY = event.changedTouches[0].pageY
    let distanceX = Math.abs(touchmoveX - touchstartX)
    let distanceY = Math.abs(touchmoveY - touchstartY)
    // console.log(distanceX, distanceY)
    if (distanceX > distanceY) {
      e.preventDefault()
    }
  })
  $('.msg-ul .li-wp-fa').on('touchend', function (e) {
    touchendX = event.changedTouches[0].pageX
    let distanceX = touchendX - touchstartX
    if (distanceX > 0) { // 左滑
      $('.msg-ul .li-wp-fa').animate({
        marginLeft: '0'
      }, 500)
    } else if (distanceX < 0 && Math.abs(distanceX) > 50 && $(this).parent('li').index() !== lastindex) { // 右滑
      $('.msg-ul li').eq(lastindex).find('.li-wp-fa').animate({
        marginLeft: '0'
      }, 500)
      lastindex = $(this).parent('li').index()
      // console.log('lastindex' + lastindex)
      $(this).animate({
        marginLeft: '-8.9rem'
      }, 500)
    }
  })
})
