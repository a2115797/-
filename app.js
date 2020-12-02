App({
  onLaunch: function () {
    // 获取导航高度；
    wx.getSystemInfo({
      success: res => {
        //导航高度
        this.globalData.navHeight = res.statusBarHeight * (750 / res.windowWidth) + 97;
      }, fail(err) {}
    });
    
    const updateManager = wx.getUpdateManager();
    
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      
    })
    
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    });
    
    updateManager.onUpdateFailed(function () {
      return that.Tips({title:'新版本下载失败'});
    });
  },
  globalData: {
    navHeight: 0,
  },
})
