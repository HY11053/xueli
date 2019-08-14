// pages/indexarticle/indexarticle.js
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 监听页面加载的生命周期函数
    this.setData({realpath:options.realpath})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  // 监听页面初次渲染完成的生命周期函数
      var that=this
      //品牌列表
      wx.request({
        url: app.globalData.baseUrl+"indexarticle/?realpath="+that.data.realpath, //请求地址
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          that.setData({ indexarticle:res.data });
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