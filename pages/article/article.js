// pages/indexarticle/indexarticle.js
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    showModal: false,
  },
  telSubmit: function() {
    this.setData({
      showModal: true
    })
  },
  closeMod: function() {
    this.setData({
      showModal: false
    })
  },
  preventTouchMove: function() {
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //拨打电话
  makePhoneCall(e) {
    console.log(e.currentTarget.dataset)
    let phoneNumber=e.currentTarget.dataset.phonenumber
    wx.makePhoneCall({
      phoneNumber,
      fail: err => {
        wx.showModal({
          title: '拨打失败',
          content: '请检查是否输入了正确的电话号码',
          showCancel: false
        });
      }
    });
  },
  formSubmitHandle2: function(e) {
    var  that =this
    if ( e.detail.value.username== '') {
      wx.showToast({
        title:'姓名不能为空',
        duration: 2000,
        mask: true,
        icon: 'none'
      });
      return false;
    }
    // 判断手机号是否正确
    if (!(/^1[34578]\d{9}$/.test(e.detail.value.iphone))) {
      wx.showToast({
        title:'请输入正确的手机号码',
        duration: 2000,
        mask: true,
        icon: 'none'
      });
      return false;
    }
    wx.request({
      url: "https://m.szhqzl.cn/phonecomplate", //请求地址
      method: 'POST',
      dataType: 'json',
      data:{
        name:e.detail.value.username,
        phoneno:e.detail.value.iphone,
        note:e.detail.value.content,
        host:'https://m.szhqzl.cn/'+'?referer=wx_applet',
      },
      success: function (res) {
        wx.showToast({
          title:'电话提交成功 我们将尽快与你们联系',
          duration: 2000,
          mask: true,
          icon: 'none'
        });
      },
      fail: function (err) {
        console.log('错误码：' + err.errCode);
        console.log('错误信息：' + err.errMsg);
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 监听页面加载的生命周期函数
    this.setData({id:options.id})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 监听页面初次渲染完成的生命周期函数
    var that=this
    //品牌列表
    wx.request({
      url: app.globalData.baseUrl+"article/?id="+that.data.id, //请求地址
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        that.setData({ thisarticleinfos:res.data });
        console.log(res.data )
        WxParse.wxParse('article', 'html', that.data.thisarticleinfos.body, that, 5);
      },
      fail: function (err) {
        console.log('错误码：' + err.errCode);
        console.log('错误信息：' + err.errMsg);
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})