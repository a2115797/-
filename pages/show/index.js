const app = getApp()

Page({
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '组件展示',
      'color': false,
      'class':'5'
    },
    show: ''
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({show: options.name});
  },

})
