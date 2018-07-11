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
      this.addReadEvent()
      this.addReviewmkEvent()
      this.addReviewDelete()
      this.addScrollPrev()
      this.addReviewBtn()
    },
    addReviewBtn () {
      $('.review-footer .btn-primary').on('click', function () {
        $('.review-box .review-error-btn').show()
      })
      $('.review-box .review-error-btn').on('click', function () {
        $(this).hide()
      })
      $confirm = $('.review-box .review-confirm')
      $('.review-footer .btn-default').on('click', function () {
        $confirm.show()
      })
      $confirm.on('click', function () {
        $(this).hide()
      })
      $confirm.find('.review-confirm-inner').on('click', function (event) {
        event.stopPropagation()
      })
      $confirm.find('.cancel').on('click', function () {
        console.log('取消')
        $confirm.hide()
      })
      $confirm.find('.primary').on('click', function () {
        console.log('确定')
        $confirm.hide()
      })
    },
    /**
     * 添加复核删除确认删除事件
     */
    addReviewDelete () {
      $('.review-info-box .review-info-item').click(function () {
        var $this = $(this)
        if ($this.hasClass('active')) {
          $this.removeClass('active').find('.item-delete').removeClass('active').html('删除')
        } else {
          $this.addClass('active').siblings().removeClass('active').find('.item-delete').removeClass('active').html('删除')
        }
      })
      $('.review-info-box .review-info-item .item-delete').click(function () {
        var $this = $(this)
        if ($this.hasClass('active')) {
          console.log('确认删除!')
        } else {
          $this.addClass('active').html('确认删除')
        }
        return false
      })
    },
    /**
     * 关闭清空版本复核阴影
     */
    addReviewmkEvent () {
      $('.review-info-mark').click(function () {
        $(this).hide().siblings('.review-clearBtn').hide()
      })
    },
    /**
     * 添加读取事件
     */
    addReadEvent () {
      var $read = $('#read')
      $read.click(function () {
        $(this).parent().siblings('.version-info,.version-mark').show()
        $('.comm-des img').addClass('active')
        $('.signal-bluetooth-box').hide()
      })
      $('.version-mark,.comm-des').click(function () {
        $('.version-mark, .version-info').hide()
        $('.comm-des img').removeClass('active')
        $('.signal-bluetooth-box').show()
      })
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
    },
    addScrollPrev: function () {
      $('.version-review,.review-info-box,.review-box').on('scroll', function (event) {
        event.stopPropagation()
      })
    }
  }
  commont.init()
})
