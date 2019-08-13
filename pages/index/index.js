//index.js
//获取应用实例
const app = getApp()

Page({
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
})
