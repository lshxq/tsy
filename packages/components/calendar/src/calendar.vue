<template>
  <div class="tsy-calendar-main-panel">
    <div :class="showBorderComputed">
      <div class="button-row">
        <div class="left button-group">
          <div class="button" @click='month(-12)'>
            &lt;&lt;
          </div>
          <div class="button" @click='month(-1)'>
            &lt;
          </div>
        </div>
        <div class="middle button-group">{{displayComputed}}</div>
        <div class="right button-group">
          <div class="button" @click='month(1)'>
            &gt;
          </div>
          <div class="button" @click='month(12)'>
            &gt;&gt;
          </div>
        </div>
      </div>
      
      <div class="label-row even-7">
        <div class="item">一</div>
        <div class="item">二</div>
        <div class="item">三</div>
        <div class="item">四</div>
        <div class="item">五</div>
        <div class="item">六</div>
        <div class="item">日</div>
      </div>

      <div class="date-picker-panel">
        <div class="even-7" v-for="(row, idx) of datePickerDataComputed" :key="idx">
          <div :class="cellClass(date)" v-for="(date, idx) of row" :key="idx" @click="cellClicked(date)">{{date.getDate()}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../../../utils.js';


export default {
  name: 'SyCalendar',
  props: {
    value: {
      type: Date,
      default() {
        return new Date();
      }
    },
    showBorder: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  data() {
    let {
      value
    } = this;
    if (!(value instanceof Date)) {
      value = new Date()
    }
    return {
      display: value
    }
  },
  computed: {
    showBorderComputed() {
      return this.showBorder ? 'tsy-calendar-border': null;
    },
    displayComputed() {
      const {display} = this
      return utils.formatDate(display, 'yyyy年MM月') 
    },
    datePickerDataComputed() {
      const data = [];
      const {display, previousMonthComputed, previousMonthDayCountComputed} = this;
      
      const year = display.getFullYear();
      const currMonth = display.getMonth();

      const dayCount = utils.getMonthDay(year, currMonth); // 当前月的天数

      const firstDayInMonth = new Date(display.getFullYear(), display.getMonth(), 1)// 当前显示月份的第一天
      const day = firstDayInMonth.getDay(); // 第一天是周几
      const row1 = [];
      for (let idx=0; idx<day-1; idx++) {
       row1.push(new Date(previousMonthComputed.year, previousMonthComputed.month, previousMonthDayCountComputed - idx))
      }
      row1.reverse();
      let index=1; // 当前月已经加入了几天到数组
      for (let idx=row1.length; idx<7; idx++) {
        row1.push(new Date(year, currMonth, index));
        index++;
      }
      data.push(row1);

      let currRow = []
      for (; index<=dayCount; index++) {
        currRow.push(new Date(year, currMonth, index));
        if (currRow.length === 7) {
          data.push(currRow);
          currRow = []
        }
      }

      if (currRow.length > 0) { // 说明这个月的最后1天不是周日，还需要用下个月的几天 补这一周的几天
        let dateInNextMonth = 1;
        for (let idx=currRow.length; idx<7; idx++) {
          const {
            nextMonthComputed
          } = this
          currRow.push(new Date(nextMonthComputed.year, nextMonthComputed.month, dateInNextMonth));
          dateInNextMonth++;
        }
        data.push(currRow);
      }
      
      return data
    },

    previousMonthComputed() {
      const {display} = this;
      const date = utils.getPreviousMonth(display.getFullYear(), display.getMonth());
      return date
    },

    nextMonthComputed() {
      const {display} = this;
      const date = utils.getNextMonth(display.getFullYear(), display.getMonth());
      return date
    },

    previousMonthDayCountComputed() {
      const {
        previousMonthComputed: date
      } = this
      return utils.getMonthDay(date.year, date.month)
    }
  },
  methods: {
    setDisplay(date) {
      this.display = date;
    },
    cellClicked(date) {
      this.$emit('input', date);
      this.display = date;
    },
    cellClass(date) {
      const {
        display,
        value
      } = this;
      const gray = display.getMonth() != date.getMonth();
      const highlight = date.getFullYear() === value.getFullYear() && date.getMonth() === value.getMonth() && date.getDate() === value.getDate();
      const today = new Date();
      const todayMark = date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
      return {
        'date-item': true,
        item: true,
        gray,
        highlight,
        today: todayMark,
      }
    },
    month(mon) {
      const {display} = this;
      this.display = new Date(display.getFullYear(), display.getMonth() + mon, display.getDate());
    }
  }
}
</script>

<style lang="css" scoped>
.tsy-calendar-main-panel {
  width: 100%;
  min-width: 300px;
  user-select: none;
  color: #444;
}
.tsy-calendar-border {
  border: 1px solid lightgray;
  border-radius: 5px;
  box-shadow: 0 0 20px lightgray;
}

.button-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: 1px solid lightgray;
  padding: 5px
}

.button-row>.button-group {
  display: flex;
  align-items: center;
}
.button-group>.button{
  margin: 3px;
  padding: 3px;
  cursor: pointer;
}

.button-group>.button:hover{
  font-weight: bold;
}



.even-7 {
  display: flex;
}
.even-7>.item {
  width: calc(100% / 7);
  text-align: center;
  border: 1px solid rgba(0,0,0,0);
  margin: 5px;
  padding: 5px;
  min-height: 22px;
  vertical-align: middle;
}
.even-7>.date-item {
  cursor: pointer;
}
.even-7>.date-item:hover {
  font-weight: bolder;
  border: 1px solid lightgray;
  box-shadow: 0 0 12px lightgray;
}
.even-7>.gray {
  color: lightgray;
}
.even-7>.highlight {
  color: orangered;
  border: 1px solid lightgray;
  box-shadow: 0 0 12px lightgray;
}
.even-7>.today {
  color: orangered;
}
</style>