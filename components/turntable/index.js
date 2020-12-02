
/**
 * 大转盘抽奖
 */

var app = getApp();

Component({

  data: {
    awardsList: [],
    animationData: {},
    btnDisabled: '',
  },

  attached: function (e) {
    this.drawAwardRoundel();
  },
  methods: {
    //画抽奖圆盘
    drawAwardRoundel: function () {
      var awards = [
        { 'id': 0, 'name': '1元红包' },
        { 'id': 1, 'name': '5元话费' },
        { 'id': 2, 'name': '6元红包' },
        { 'id': 3, 'name': '8元红包' },
        { 'id': 4, 'name': '10元话费' },
        { 'id': 5, 'name': '10元红包' }
      ];
      var awardsList = [];
      var turnNum = 1 / awards.length;  // 文字旋转 turn 值

      // 奖项列表
      for (var i = 0; i < awards.length; i++) {
        awardsList.push({ turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: awards[i] });
      }
      console.log(awardsList);
      this.setData({
        awardsList: awardsList
      });
    },

    //发起抽奖
    playReward: function () {
      //中奖index
      var awardIndex = 1;
      var runNum = 8;//旋转8周
      var duration = 4000;//时长

      // 旋转角度
      this.runDeg = this.runDeg || 0;
      this.runDeg = this.runDeg + (360 - this.runDeg % 360) + (360 * runNum - awardIndex * (360 / 6))
      //创建动画
      var animationRun = wx.createAnimation({
        duration: duration,
        timingFunction: 'ease'
      })
      animationRun.rotate(this.runDeg).step();
      this.setData({
        animationData: animationRun.export(),
        btnDisabled: 'disabled'
      });

      // 中奖提示
      setTimeout(function () {
        wx.showModal({
          title: '恭喜',
          content: '获得' + (this.data.awardsList[awardIndex].award.name),
          showCancel: false
        });
        this.setData({
          btnDisabled: ''
        });
      }.bind(this), duration);

    },
  }
})
