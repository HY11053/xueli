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

  //内容详情页
  toArticle(event){
    //获取点击跳转对应的下标
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/article/article?id='+id,
    })
  },
  onLoad: function () {
    // 监听页面加载的生命周期函数
    var that=this
    //施工案例
    wx.request({
      url: app.globalData.baseUrl+"getarticlelist/?take=6&orderby=click&typeid=6", //请求地址
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        that.setData({ anlis:res.data });
      },
      fail: function (err) {
        console.log('错误码：' + err.errCode);
        console.log('错误信息：' + err.errMsg);
      }
    });
    //租赁问答
    wx.request({
      url: app.globalData.baseUrl+"getarticlelist/?take=4&orderby=click&typeid=9", //请求地址
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        that.setData({ asks:res.data });
      },
      fail: function (err) {
        console.log('错误码：' + err.errCode);
        console.log('错误信息：' + err.errMsg);
      }
    });
    //租赁服务
    wx.request({
      url: app.globalData.baseUrl+"getarticlelist/?take=4&orderby=click&typeid=10", //请求地址
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        that.setData({ services:res.data });
      },
      fail: function (err) {
        console.log('错误码：' + err.errCode);
        console.log('错误信息：' + err.errMsg);
      }
    });

    //租赁费用
    wx.request({
      url: app.globalData.baseUrl+"getarticlelist/?take=4&orderby=click&typeid=11", //请求地址
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        that.setData({ feiyongs:res.data });
      },
      fail: function (err) {
        console.log('错误码：' + err.errCode);
        console.log('错误信息：' + err.errMsg);
      }
    });
  },

})
