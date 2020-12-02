import { getLogo } from '../../api/api.js';

let app = getApp();

Component({
  properties: {
    marks: {
      type: Array,
      value:[],
    },
    map: {
      type: Object,
      value: {
        date: 'date'
      }
    }
  },
  data: {
    date : {},
    year : '',
    month: '',
    today: '',
    table: {},
    calendar: [],
    weekLabel: ['日','一','二','三','四','五','六'],
    yearAndMonth: '',
    monthDays: []
  },
  observers: {
    'year, month': function (year, month){
      this.setData({
        yearAndMonth: year + '年' + month + '月'
      });
      
      if((year%4==0||year%400==0)&&year%100!=0){
        this.setData({
          monthDays: [31,29,31,30,31,30,31,31,30,31,30,31]
        });
      } else {
        this.setData({
          monthDays: [31,28,31,30,31,30,31,31,30,31,30,31]
        });
      }
    }
  },
  attached() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    
    this.setData({
      date: date,
      year: year,
      month: month,
      today: {day: date.getDate(), month: month, year: year}
    });
    this.update(); 
  },
  methods: {
    tapDay(e){
      this.triggerEvent('tapDay', e.currentTarget.dataset['date']);
    },
    prevMon(){
      var temp = '';
      if(this.data.month>1)
        this.setData({ month: this.data.month - 1 });
      else
        this.setData({ year: this.data.year - 1, month: 12 });

      this.update();
    },
    nextMon(){
    	var temp = '';
    	if(this.data.month<12)
    		this.setData({ month: this.data.month + 1 });
    	else{
    		this.setData({ year: this.data.year + 1, month: 1 });
    	}
    	this.update();
    },
    update(){
      const that = this;
      var dt=new Date(this.data.year,this.data.month-1,1);
      var firstDay = dt.getDay();
      var rows=5;
      var cols=7;
      var k=1;
      var isEnd = false;
      var tableRow = [];
      var calendar = [];
      
      for(let i=1; !isEnd; i++){
        tableRow = [];
        for(let j=0;j<7;j++){
          if(i==1&&j<firstDay)
            tableRow.push({});
          else{
            if(k > this.data.monthDays[this.data.month - 1]){
              tableRow.push({});
              isEnd = true;
              continue;
            }
            let day = k < 10 ? '0'+k : k;
            let month = this.data.month < 10 ? '0'+this.data.month : this.data.month;
            let date = this.data.year + '-' + month + '-' + day;
            let mark = this.data.marks.find(function(mark){return mark[that.data.map.date] == date}) || null;
            
            tableRow.push({
              date: date,
              year: this.data.year,
              month: this.data.month,
              day: k,
              beforeToday: this.data.year < this.data.today.year || (this.data.year == this.data.today.year && this.data.month < this.data.today.month) || (this.data.year == this.data.today.year && this.data.month == this.data.today.month && k < this.data.today.day),
              isToday: this.data.year == this.data.today.year && this.data.month == this.data.today.month && k == this.data.today.day,
              isWeekend: (j%7==0||j%7==6),
              mark: mark
            });
            
            k++;
          }
        }
        calendar.push(tableRow);
      }
      this.setData({ calendar: calendar});
      console.log(this.data.calendar)
    },
  }
})