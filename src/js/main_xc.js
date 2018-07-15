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
      this.addMachinesAllcheck()
      this.searchInputClose()
    },
    /**
     * 搜索页面表单清除
     */
    searchInputClose () {
      var $close = $('.search-header .search-close')
      var $input = $('.search-header .search-input')
      $input.on('keyup', function () {
        if ($(this).val().trim()) {
          $close.show()
        } else {
          $close.hide()
        }
      })
      $close.on('click', function () {
        $(this).hide()
        $input.val('')
      })
    },
    /**
     * 机车列表全选
     */
    addMachinesAllcheck () {
      var $infoItem = $('.machines .machines-info-item')
      var $allBtn = $('.machines-footer .all-btn')
      $infoItem.on('click', function () {
        var $this = $(this)
        if ($this.hasClass('disabled')) {
          return false
        }
        if ($this.hasClass('active')) {
          $this.removeClass('active')
          checkIsAll()
        } else {
          $this.addClass('active')
          checkIsAll()
        }
      })
      $allBtn.on('click', function () {
        var $notDisabled = $('.machines .machines-info-item:not(.disabled)')
        var $this = $(this)
        if ($this.hasClass('active')) {
          $(this).removeClass('active')
          $notDisabled.removeClass('active')
        } else {
          $(this).addClass('active')
          $notDisabled.addClass('active')
        }
      })
      checkIsAll()
      function checkIsAll () {
        var $active = $('.machines .machines-info-items .active')
        var $notDisabled = $('.machines .machines-info-item:not(.disabled)')
        if ($active.length === $notDisabled.length) {
          $allBtn.addClass('active')
        } else {
          $allBtn.removeClass('active')
        }
      }
      $('.machines-changeType-box, .machines-changeType-box .machines-change-btn').on('click', function () {
        $('.machines-changeType-box').hide()
      })
      $('.machines-changeType-box .machines-change-type').on('click', function (event) {
        event.stopPropagation()
      })
      $('.machines-footer .machines-start').on('click', function () {
        $('.machines-start-comfirm').show()
      })
      $('.machines-start-comfirm').on('click', function () {
        $(this).hide()
      })
    },
    /**
     * 复核 confirm 弹窗
     */
    addReviewBtn () {
      $('.review-footer .btn-primary').on('click', function () {
        $('.review-box .review-error-btn').show()
      })
      $('.review-box .review-error-btn').on('click', function () {
        $(this).hide()
      })
      var $confirm = $('.review-box .review-confirm')
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
      var $reviewDom = $('#review')
      var $user = $('#user')
      var $close = $reviewDom.siblings('.login-input-close')
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
        var $this = $(this)
        var user = $this.val().trim()
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
      $('.version-review,.review-info-box,.review-box,.padding-machines').on('scroll', function (event) {
        event.stopPropagation()
      })
    }
  }
  commont.init()
})
