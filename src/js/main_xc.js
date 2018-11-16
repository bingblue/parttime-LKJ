$(function () {
  isAjax = false
  /**
   * 功能介绍,每个方法请写注释，按下面模板来写.
   * @author <作者>
   * @param {类型} 参数名 描述.
   * @param {string} name=alice 姓名(默认alice).
   * @param {object} option 配置信息.
   * @return {Number} 返回值描述.
   */
  commont = {
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
      this.footerTab()
      // this.selectLoad()
      this.searchBody()
      this.searchfilter()
      this.searchLink()
      this.settingLocation()
      this.chooseLocation()
      this.choosePlan()
      this.search()
      this.searchversion()
      this.adddialog()
      this.settingUpdate()
      // 上下拉加载实例
      // this.loadEvent('machines', this.addLoadImg, this.addLoadImg)
      // this.loadEvent('msgList', this.addLoadImg, this.addLoadImg)
      this.toastEvent()
      this.searchSelect()
    },
    footerTab: function () {
      var that = this
      $('.comm-footer .footer-item').on('click', function () {
        var $this = $(this)
        $('.version-mark, .version-info').hide()
        $('.comm-des img').removeClass('active')
        $('.read-btn').removeClass('active')
        that.closeLoading()
        that.closeToast2()
        that.closeToast3()
        if (!$this.hasClass('active')) {
          $this.addClass('active').siblings().removeClass('active')
          var $index = $this.index()
          if ($index == 4) {
            var h = $(document).height() - $('.comm-header').height() - $('.comm-footer').height() + 'px'
            $('.msg-list').css({
              maxHeight: h
            })
          }
          $('.xc-tab .xc-tab-item').eq($index).addClass('active').siblings().removeClass('active')
        }
      })
    },
    /**
     * @param { String } message 内容
     * @param { Number } time 消失时间 默认3000
     * @param { String } color 背景颜色
     * @param { String } position 位置 top center bottom
     */
    toast: function (message, time, color, position) {
      time = time || 3000
      color = color || 'rgba(0, 0, 0, .6)'
      position = position || 'center'
      var $p = $("<p style='z-index:9999;' class='xc-toast " + position + "'>" + message + '</p>')
      $('.xc-toast').remove()
      $p.css({ backgroundColor: color })
      $('body').append($p)
      setTimeout(function () {
        $p.remove()
      }, time)
    },
    /**
     * @param { String } message 内容
     * @param { String } color 背景颜色
     * @param { String } position 位置 top center bottom
     */
    toast2: function (message, color) {
      color = color || '#fff'
      var position = 'center'
      var $p = $("<div class='xc-toast2-box'><div class='xc-toast2 " + position + "'><img class='music-ani' src='../../img/read-loading.png'/>" + message + '</p><div>')
      $('.xc-toast2-box').remove()
      $p.find('.xc-toast2').css({ backgroundColor: color })
      $('body').append($p)
      // $('.xc-toast2-box').on('click', function () {
      //   $(this).remove()
      // })
    },
    closeToast2: function () {
      isAjax = false
      $('.xc-toast2-box').remove()
    },
    closeLoading: function () {
      isAjax = false
      $('div.machines-loading').remove()
    },
    /**
     * @param { String } message 内容
     * @param { String } color 背景颜色
     */
    toast3: function (message, time) {
      var position = 'center'
      var $p = $("<div class='xc-toast3 " + position + "'><img class='music-ani' src='../../img/load.png'/>" + message + '</div>')
      $('.xc-toast3').remove()
      $('body').append($p)
    },
    closeToast3: function () {
      isAjax = false
      $('.xc-toast3').remove()
    },
    /**
     * 上下拉 模拟添加加载动画 一秒后删除
     */
    addLoadImg: function (id, type) {
      var $div = $('#' + id)
      if (isAjax) {
        return false
      }
      var $str = '<div class="machines-loading"><img src="../../img/read-loading.png" class="img music-ani" alt="加载中">加载中</div>'
      var $imgBox = $($str)
      if (type == 'top') {
        $div.prepend($imgBox)
      } else {
        $div.append($imgBox)
      }
      isAjax = true
      setTimeout(function () {
        $imgBox.remove()
        isAjax = false
      }, 100000)
    },
    /**
     * 添加上下拉加载
     * @param {String} id 元素id
     * @param {Function} bottomFun 下拉触发事件
     * @param {Function} topFun 上拉触发事件
     */
    loadEvent: function (id, bottomFun, topFun) {
      var that = this
      $('#' + id).mutouch({
        offsetY: 50, // 上下滑动超过50px才触发事件
        onSwipeTop: function () {
          if (isAjax) {
		        return false
		      }
          var parent = $('#' + id).parent()
          if (parent.scrollTop() + parent.height() >= $('#' + id).height()) {
            that.addLoadImg(id)
            bottomFun()
          }
        },
        onSwipeDown: function () {
          if (isAjax) {
		        return false
		      }
          var parent = $('#' + id).parent()
          if (!parent.scrollTop()) {
            that.addLoadImg(id, 'top')
            topFun()
          }
        }
      })
    },
    // 检测版本
    settingUpdate: function () {
      $('#settingUpdate').on('click', function () {
        $(".xc-dialog[dialog='title']").show()
      })
      $(".xc-dialog[dialog='title'] .dialog-sure").on('click', function () {
        $(".xc-dialog[dialog='title']").hide()
        $(".xc-dialog[dialog='pross']").show()
      })
    },
    // dialog
    adddialog: function () {
      $('.xc-dialog .dialog-cancel').on('click', function () {
        $(this).parents('.xc-dialog').hide()
      })
    },
    // 版本信息
    searchversion: function () {
      var $searchversion = $('#searchversion')
      var $name = this.getUrlParms('name')
      $searchversion.text($name ? $name + '版本信息' : 'DF11-0311版本信息')
    },
    // 搜索
    search: function () {
      console.log('')
      // $('.search-cancle').on('click', function () {
      //   var q = $('.search-input').val()
      //   window.location.href = '/html/search/searchversion.html?name=' + q
      // })
    },
    // 计划选择
    choosePlan: function () {
      $('#plan-choose-body').on('click', function (event) {
        event.stopPropagation()
        var $this = $(this)
        if ($this.hasClass('active')) {
          $this.removeClass('active')
        } else {
          $this.addClass('active')
        }
      })
      $('#plan-choose-body .select-items li').on('click', function () {
        var $this = $(this)
        if (!$this.hasClass('acitve')) {
          // 这里写请求 请求成功回调里面的方法改变样式即可
          $this.addClass('active').siblings().removeClass('active')
          $('#plan-choose-body .plan-choose-name').text($this.text())
        }
      })
      $('body').on('click', function () {
        $('#plan-choose-body').removeClass('active')
      })
    },
    // 选择换装地点 - 点击之后跳转到选择页面地址栏参数 location
    chooseLocation: function () {
      $('#setting-locations .setting-location').on('click', function () {
        var location = $(this).text()
        window.location.href = './review.html?location=' + location
      })
    },
    // 版本复核设置-地点切换 默认获取地址栏参数 location 没有参数百善站为默认站
    settingLocation: function () {
      var location = this.getUrlParms('location') || '百善站'
      var $location = $('#location')
      $location.html(location)
    },
    // 查询机车
    searchLink: function () {
      // $('#searchLink .search-link-item').on('click', function () {
      //   var $this = $(this)
      //   $('#searchLink').hide()
      //   $('.searchLink-input').val($this.find('.search-link-name').text())
      //   // if (!$this.hasClass('active')) {
      //   //   $this.addClass('active').siblings().removeClass('active')
      //   // }
      // })
      // $('.searchLink-input').on('keyup', function () {
      //   if (!$(this).val()) {
      //     $('#searchLink').hide().show()
      //   }
      // })
    },
    // 查询条件
    searchfilter: function () {
      $('#searchfilter .search-item').on('click', function () {
        var $this = $(this)
        if (!$this.hasClass('condition')) {
          $this.addClass('condition')
          if ($this.hasClass('all')) {
            $this.siblings().addClass('condition')
          }
        } else {
          if ($this.hasClass('all')) {
            $this.siblings().removeClass('condition')
          } else {
            $this.siblings('.all').removeClass('condition')
          }
          $this.removeClass('condition')
        }
      })
    },
    // 查询切换
    searchBody: function () {
      $('.js-search-list').click(function () {
        $('.machines2').hide()
        if ($('.machines').hasClass('none')) {
          $('.machines.none').removeClass('none')
        } else {
          $('.machines').addClass('none')
        }
      })
      $('#search-body .search-item').on('click', function () {
        var $this = $(this)
        if (!$this.hasClass('active')) {
          $this.addClass('active').siblings().removeClass('active')
          $('.search-select-name').text($this.find('.name').text())
          $('.machines').addClass('none')
        }
      })
      $('.search-nodress-item').on('click', function () {
        var $this = $(this)
        if (!$this.hasClass('active')) {
          $this.addClass('active').siblings().removeClass('active')
          $('.search-input').val($this.find('.search-nodress-name').text())
        }
      })
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
     * 版本复核-所属段切换
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
          // 这里写请求，请求成功运行下面的js即可
          $('#setting-review-local').text($this.text())
          $this.addClass('active').siblings().removeClass('active')
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
      $('.setting-server-val .setting-server-input').on('keyup', function () {
        if ($(this).val().length) {
          $(this).siblings('.close').show()
        } else {
          $(this).siblings('.close').hide()
        }
      })
      $('.setting-server-val .close').on('click', function () {
        $(this).siblings('input').val('')
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
      $infoItem.on('click', 'a', function (e) {
        e.stopPropagation()
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
      $('.machines-upLoad').click(function () {
        $('.machines-changeType-box').show()
      })
      $('.machines-changeType-box .machines-change-type').on('click', function (event) {
        event.stopPropagation()
      })
      $('.machines-change-types li').on('click', function () {
        var $this = $(this)
        if (!$this.hasClass('active')) {
          $this.addClass('active').siblings().removeClass('active')
          $('.machines-changeType-box').hide()
          commont.toast('换装类型：' + $this.text(), 2000)
        }
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
          $(this).closest('.review-info-item').remove()
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
      var $read = $('.read-btn')
      var that = this
      $read.click(function () {
        that.closeLoading()
        that.closeToast2()
        that.closeToast3()
        if ($(this).hasClass('active')) {
          close()
          $(this).removeClass('active')
        } else {
          open()
          $(this).addClass('active')
        }
      })
      var open = function () {
        var h = $(document).height() - $('.comm-header').height() - $('.comm-footer').height() + 'px'
        $('.version-info,.version-mark').show()
        $('.version-info-box').css({
          maxHeight: h,
          overflow: 'auto'
        })
        $('.comm-des img').addClass('active')
      }
      var close = function () {
        $('.version-mark, .version-info').hide()
        $('.comm-des img').removeClass('active')
        $('.read-btn').removeClass('active')
      }
      $('.version-mark').click(function () {
        close()
      })
      $('.version-info .version-info-item').on('click', function () {
        var $this = $(this)
        if (!$this.hasClass('active')) {
          $this.addClass('active').siblings().removeClass('active')
          var $readBtn = $this.closest('.xc-tab-item').find('.read-btn')
          $readBtn.find('p').text($this.text())
          $readBtn.click()
        }
      })
      $('#readFile').on('click', function () {
        $(".xc-dialog[dialog='read']").show()
      })
    },
    /**
     * 添加侧边栏事件
     */
    addSliderBarEvent: function () {
      $('.comm-header .comm-operating').click(function () {
        $('body').addClass('slider-bar-open')
        return false
      })
      $('.wrap .markBg').click(function () {
        $('body').removeClass('slider-bar-open')
      })
      $('.wrap').click(function () {
        if ($('body').hasClass('slider-bar-open')) {
          $('body').removeClass('slider-bar-open')
        }
      })
    },
    /**
     * 添加登录页面的一些事件
     */
    addLoginEvent: function () {
      var $reviewDom = $('#review')
      var $user = $('.user-input')
      var $close = $reviewDom.siblings('.login-input-close')
      var $userclose = $reviewDom.siblings('.login-input-user-close')
      $reviewDom.keyup(function () {
        var $review = $(this).val().trim()
        if ($review) {
          $close.show(200)
        } else {
          $close.hide(200)
        }
      })
      $close.click(function () {
        $reviewDom.val('').focus().removeClass('active')
        $(this).hide(200)
      })
      $userclose.click(function () {
        $user.val('').focus().removeClass('active')
        $(this).hide(200)
      })
      $user.keyup(function () {
        var $this = $(this)
        var user = $this.val().trim()
        if (user) {
          $this.addClass('active')
          $userclose.show(200)
        } else {
          $this.removeClass('active')
          $userclose.hide(200)
        }
      })
    },
    addScrollPrev: function () {
      $('.version-review,.review-info-box,.review-box,.padding-machines').on('scroll', function (event) {
        event.stopPropagation()
      })
    },
    getUrlParms: function (name) {
      var url = window.location.search // 获取url中"?"符后的字串
      var theRequest = new Object()
      if (url.indexOf('?') != -1) {
        var str = url.substr(1)
        strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
        }
      }
      return theRequest[name]
    },
    toastEvent: function () {
      $('body').on('click', '.xc-toast', function () {
        $(this).remove()
      })
    },
    searchSelect: function () {
      // $('.search-select').click(function () {
      //   var $this = $(this)
      //   if ($this.hasClass('active')) {
      //     $this.removeClass('active')
      //   } else {
      //     $this.addClass('active')
      //   }
      // })
      $('.search-select .search-select-group li').click(function (e) {
        var $this = $(this)
        if (!$this.hasClass('active')) {
          $this.addClass('active').siblings().removeClass('active')
          $this.closest('.search-select').removeClass('active')
            .find('.search-select-name').text($this.text())
        }
        e.stopPropagation()
      })
    }
  }
  commont.init()
})
