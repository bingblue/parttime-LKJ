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
      this.addLoginEvent()
      this.addSliderBarEvent()
      this.addReadEvent()
      this.addReviewmkEvent()
      this.addReviewDelete()
      this.addScrollPrev()
      this.addReviewBtn()
      this.addMachinesAllcheck()
      this.searchInputClose()
      this.settingSwitch()
      this.settingServer()
      this.settingReview()
      this.locations()
      this.settingPlan()
      this.selectLoad()
    },
    selectLoad: function () {
      var startX = 0
      var startY = 0
      var endX = 0
      var endY = 0
      var distanceX = 0
      var distanceY = 0
      var isAjax = false
      $('#machines, #loading').on('touchstart', function (e) {
        startX = e.originalEvent.changedTouches[0].pageX
        startY = e.originalEvent.changedTouches[0].pageY
      })
      $('#machines, #loading').on('touchmove', function (e) {
        if (isAjax) {
          return false
        }
        var $this = $(this)
        endX = e.originalEvent.changedTouches[0].pageX
        endY = e.originalEvent.changedTouches[0].pageY
        distanceX = endX - startX
        distanceY = endY - startY
        if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX > 100) {
        } else if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX < -100) {
        } else if (Math.abs(distanceX) < Math.abs(distanceY) && distanceY < 0) {
        } else if (Math.abs(distanceX) < Math.abs(distanceY) && distanceY > 0) {
          var scrollHeight =
          document.body.scrollTop || document.documentElement.scrollTop
          var mscrollHeight = $this.scrollTop()
          if (!scrollHeight && !mscrollHeight) {
            var $loading = $this.find('.machines-loading')
            $loading.show()
            isAjax = true
            setTimeout(function () {
              $loading.hide()
              isAjax = false
            }, 1000)
          }
        }
      })
    },
    /**
     * 导入计划
     */
    settingPlan: function () {
      $('.setting-plan .tit').on('click', function () {
        $(this).hide()
      })
    },
    /**
     * 选择换装地点
     */
    locations: function () {
      var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
      var $letters = $('#setting-location-letters')
      var $letterStr = []
      letters.forEach(function (Initials) {
        $letterStr.push("<p class='setting-location-letter'>" + Initials + '</p>')
      })
      $letterStr = $letterStr.join('')
      $letters.append($letterStr)
      $('.setting-locations .setting-location').each(function (index, ele) {
        var $ele = $(ele)
        var $str = $ele.text()
        var $Initials = ''
        if ($str === '长沙') {
          $Initials = HanZi_PinYin.get($str).charAt(2)
        } else {
          $Initials = HanZi_PinYin.get($str).charAt(0)
        }
        $ele.addClass($Initials)
      })
      $letters.find('.setting-location-letter').on('click', function () {
        var $this = $(this)
        var $letter = $this.text()
        var $ele = $('.setting-locations').find('.' + $letter).eq(0)
        var $top = $ele.length ? $ele.position().top : 0
        var $paddingTop = $('.setting-locations').css('paddingTop')
        $paddingTop = Number($paddingTop.substring(0, $paddingTop.length - 2))
        $('html,body').animate({'scrollTop': ($top - $paddingTop)}, 200)
      })
    },
    /**
     * 版本复核
     */
    settingReview: function () {
      var $box = $('.setting-review-locals-box')
      var $locals = $('.setting-review-locals-box .setting-review-locals')
      $box.on('click', function () {
        $(this).hide()
      })
      $locals.on('click', function (event) {
        event.stopPropagation()
      })
      $('.setting-review-locals-box .setting-review-local').on('click', function () {
        var $this = $(this)
        if (!$this.hasClass('cancel')) {
          $('#setting-review-local').text($this.text())
        }
        $box.hide()
      })
      $('.setting .review-select').on('click', function () {
        $box.show()
      })
    },
    // 密码维护表单清空
    settingServer: function () {
      $('.setting-password-item input').on('keyup', function () {
        var $this = $(this)
        var $close = $this.siblings('.close-btn')
        if ($this.val().trim()) {
          if ($this.hasClass('in') && $this.val().length === 6) {
            $close.hide()
            return false
          }
          $close.show()
        } else {
          $close.hide()
        }
        $this.siblings('.error-msg').hide()
      })
      $('.setting-password-item .close-btn').on('click', function () {
        var $this = $(this)
        $this.siblings('input').val('')
        $this.hide()
      })
      /**
       * 密码修改保存
       */
      $('#passwordSave').on('click', function () {
        var $confrimpassword = $('#confrimpassword').val()
        var $password = $('#password').val()
        if ($confrimpassword.length !== 6 || $password.length !== 6) {
          console.log('请设置6位密码！')
          return false
        }
        if ($confrimpassword !== $password) {
          $('#comfirm-error-msg').show()
        } else {
          // 请求数据判断旧密码是否正确
        }
        $('#old-error-msg').show()
        $('.close-btn').hide()
      })
      /**
       * 服务器设置错误弹窗
       */
      $('.setting-server .setting-server-error').on('click', function () {
        $(this).hide()
      })
    },
    /**
     * 验证授权
     */
    reviewPassWord: function ($name, func) {
      var h = $('.setting').height() - $('.xc-body .setting-main').height()
      if (h > 0) {
        $('.xc-body .setting').css('marginTop', -h)
      }
      var fn = func || ''
      var $verificationBox = $('.setting .verification-password-box')
      $('#verification-password #verification-name').text($name)
      $verificationBox.show()
      $('#verification-password-input').focus()
      $('#verification-password-input').on('keyup', function () {
        var $length = $(this).val().length
        $('#verification-password .verification-password-item').removeClass('active')
        $('#verification-password .verification-password-item:lt(' + $length + ')').addClass('active')
        if ($length === 6) {
          // 进行验证 这里未进行验证直接进入下一步
          $('.verification-cancel').click()
          $('#verification-password-input').off('keyup')
          fn && fn()
        }
      })
    },
    /**
     * 设置页面相关事件
     */
    settingSwitch: function () {
      var that = this
      // 右侧开关
      $('.setting .name-box .btn-wrap').on('click', function () {
        var $this = $(this)
        if ($this.hasClass('verification')) {
          var $name = $this.siblings('span').text()
          that.reviewPassWord($name, function () {
            if ($this.hasClass('active')) {
              $this.removeClass('active')
            } else {
              $this.addClass('active')
            }
          })
        } else {
          if ($this.hasClass('active')) {
            $this.removeClass('active')
          } else {
            $this.addClass('active')
          }
        }
      })
      // 链接的验证
      var $verificationBox = $('.setting .verification-password-box')
      $('.setting .setting-items .href').on('click', function (event) {
        event.preventDefault()
        var $this = $(this)
        var $href = $this.attr('href') // 记录应该跳转的链接
        if (!$this.hasClass('verification')) {
          window.location.href = $href
        } else {
          var $name = $this.find('.name-box span').text()
          that.reviewPassWord($name, function () {
            window.location.href = $href
          })
        }
      })
      $verificationBox.on('click', function () {
        $(this).hide()
        $('#verification-password .verification-password-item').removeClass('active')
        $('#verification-password-input').val('').blur()
        $('.xc-body .setting').css('marginTop', 0)
      })
      $('.verification-cancel').on('click', function () {
        $verificationBox.hide()
        $('#verification-password .verification-password-item').removeClass('active')
        $('#verification-password-input').val('').blur()
        $('.xc-body .setting').css('marginTop', 0)
      })
      $('.verification-password').on('click', function (event) {
        event.stopPropagation()
      })
    },
    /**
     * 搜索页面表单清除
     */
    searchInputClose: function () {
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
        $input.val('').focus()
      })
    },
    /**
     * 机车列表全选
     */
    addMachinesAllcheck: function () {
      var $infoItem = $('.machines .machines-info-item')
      var $allBtn = $('.machines-footer .all-btn')
      $infoItem.on('click', function () {
        var $this = $(this)
        if ($this.hasClass('not')) {
          return false
        }
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
    addReviewBtn: function () {
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
    addReviewDelete: function () {
      var $ele = $('.review-info-box .review-info-item')
      var startX = 0
      var startY = 0
      var endX = 0
      var endY = 0
      var distanceX = 0
      var distanceY
      $ele.bind('touchstart', function (e) {
        startX = e.originalEvent.changedTouches[0].pageX
        startY = e.originalEvent.changedTouches[0].pageY
      })
      $ele.bind('touchend', function (e) {
        // 获取滑动屏幕时的X,Y
        endX = e.originalEvent.changedTouches[0].pageX
        endY = e.originalEvent.changedTouches[0].pageY
        // 获取滑动距离
        distanceX = endX - startX
        distanceY = endY - startY
        // 判断滑动方向
        if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX > 50) {
          $(this).removeClass('active').find('.item-delete').removeClass('active').html('删除')
        } else if (Math.abs(distanceX) > Math.abs(distanceY) && distanceX < -50) {
          $(this).addClass('active').siblings().removeClass('active').find('.item-delete').removeClass('active').html('删除')
        }
      })
      /**
       * 确认删除
       */
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
    addReviewmkEvent: function () {
      $('.review-info-mark').click(function () {
        $(this).hide().siblings('.review-clearBtn').hide()
      })
    },
    /**
     * 添加读取事件
     */
    addReadEvent: function () {
      var $read = $('#read')
      $read.click(function () {
        if ($(this).hasClass('active')) {
          close()
          $(this).removeClass('active')
        } else {
          open()
          $(this).addClass('active')
        }
      })
      var open = function () {
        $('.version-info,.version-mark').show()
        $('.comm-des img').addClass('active')
        $('.signal-bluetooth-box').hide()
      }
      var close = function () {
        $('.version-mark, .version-info').hide()
        $('.comm-des img').removeClass('active')
        $('.signal-bluetooth-box').show()
        $('#read').removeClass('active')
      }
      $('.version-mark').click(function () {
        close()
      })
    },
    /**
     * 添加侧边栏事件
     */
    addSliderBarEvent: function () {
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
    addLoginEvent: function () {
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
        $reviewDom.val('').focus()
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
    addScrollPrev: function () {
      $('.version-review,.review-info-box,.review-box,.padding-machines').on('scroll', function (event) {
        event.stopPropagation()
      })
    }
  }
  commont.init()
})
