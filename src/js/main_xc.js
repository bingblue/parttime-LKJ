$(function () {
  /**
   * 功能介绍,每个方法请写注释，按下面模板来写.
   * @author <作者>
   * @param {类型} 参数名 描述.
   * @param {string} name=alice 姓名(默认alice).
   * @param {object} option 配置信息.
   * @return {Number} 返回值描述.
   */
  var commont = {
    /**
     * 初始化
     */
    init: function () {
      this.initFontSize()
      this.addLoginEvent()
      this.addSliderBarEvent()
    },
    /**
     * 添加侧边栏事件
     */
    addSliderBarEvent () {
      $('.comm-header .comm-operating').click(function () {
        $('body').addClass('slider-bar-open')
      })
      $('.wrap .markBg').click(function () {
        $('body').removeClass('slider-bar-open')
      })
    },
    /**
     * 添加登录页面的一些事件
     */
    addLoginEvent () {
      var $reviewDom = $('#review'),
        $user = $('#user'),
        $close = $reviewDom.siblings('.login-input-close')
      $reviewDom.keyup(function () {
        var $review = $(this).val().trim()
        if ($review) {
          $close.show(200)
        } else {
          $close.hide(200)
        }
      })
      $close.click(function () {
        $reviewDom.val('')
        $(this).hide(200)
      })
      $user.keyup(function () {
        var $this = $(this),
          user = $this.val().trim()
        if (user) {
          $this.addClass('active')
        } else {
          $this.removeClass('active')
        }
      })
    },
    /**
     * 初始化根目录节点
     */
    initFontSize: function () {
      function change () {
        var cWidth
        if (document.documentElement.clientWidth < 320) {
          cWidth = 320
        } else if (document.documentElement.clientWidth > 750) {
          cWidth = 750
        } else {
          cWidth = document.documentElement.clientWidth
        };
        document.documentElement.style.fontSize = cWidth / 18.75 + 'px'
      }
      change()
      window.addEventListener('resize', change, false)
      window.addEventListener('DOMContentLoaded', change, false)
    }
  }
  commont.init()
})
