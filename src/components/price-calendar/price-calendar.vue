<template>
    <div class="date-wrap" ref="dataWrap">
        <input @click.stop="showCalendar"
               v-model="shortSelectedDate"
               class="date-input"
               type="text"
               placeholder="选择日期"
               :title="selectedDate"
               ref="dateInput">
        <div v-show="show" class="date-calendar-root" @click="closeCalendar">
            <div ref="dateCalendar" class="date-calendar-wrap" @click.stop="">
                <calendar class="calendar" ref="calendar_left"  v-on:changeMonth="changeMonth" v-on:daterange="getRange" :pre="true" :next="false" :calendar="calendarData.leftData"></calendar>
                <calendar class="calendar" ref="calendar_right" v-on:changeMonth="changeMonth" v-on:daterange="getRange" :pre="false" :next="true" :calendar="calendarData.rightData"></calendar>
                <p class="priceTotal">已选择  <em class="hot">{{dateRangeCount}}</em> 天，共 <em class="hot">{{priceTotal}}</em> 元
                    <button class="confirm" @click="confirmDate">确认</button>
                    <button class="cancel" @click="cancelDate">取消</button>
                </p>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .date-wrap {
        position: relative;
        width: 222px;
    }

    .date-calendar-root {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9999999999999999999;
        font-size: 0;
    }

    .date-calendar-wrap {
        position: fixed;
        width: 700px;
        z-index: 9999999999999999999;
        font-size: 0;
    }

    .date-input {
        padding-left: 10px;
        width: 210px;
        height: 40px;
        background: #fff url(./img/calendar-icon.png) no-repeat 190px center;
        background-size: 17px 20px;
        border: 1px solid #d5d5d5;
        color: #666;
        font-size: 14px;
    }

    .priceTotal {
        height: 40px;
        vertical-align: center;
        padding-left: 20px;
        font-family: "Microsoft YaHei";
        font-size: 16px;
        line-height: 40px;
        background-color: white;
        border-left: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc; 
    }

    .hot {
        color: red;
    }

    button {
        height: 100%;
        width: 80px;
        float: right;
        border: 0;
        cursor: pointer;
    }

    .cancel {
        background-color: white;
        border-left: 1px solid #ccc;
    }

    .confirm {
        background-color: #fc634d;
        color: white;
    }
</style>
<script scoped>
    var calendar = require('./calendar.vue');
    var format = function (timestamp) {
        var timeData = new Date(timestamp);
        var year = timeData.getFullYear();
        var month = timeData.getMonth() + 1;
        var date = timeData.getDate();
        month = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;
        return year + '-' + month + '-' + date;
    };
    module.exports = {
        name: 'price-calendar',
        components:{
            calendar: calendar
        },
        data: function () {
            return {
                show: false,
                selectedDate: '',
                selectedDate_tmp: '',
                leftSelectDays_tmp: [],
                rightSelectDays_tmp: [],
                dateRangeCount:0,
                priceTotal:0,
                price: {},
                calendarData: {
                    leftData: {"title":"2017-05","data":[[{"date":0,"today":-1},{"date":1,"today":-1},{"date":2,"today":-1},{"date":3,"today":-1},{"date":4,"today":-1},{"date":5,"today":-1},{"date":6,"today":-1}],[{"date":7,"today":-1},{"date":8,"today":-1},{"date":9,"today":-1},{"date":10,"today":-1},{"date":11,"today":-1},{"date":12,"today":-1},{"date":13,"today":-1}],[{"date":14,"today":-1},{"date":15,"today":-1},{"date":16,"today":-1},{"date":17,"today":-1},{"date":18,"today":-1},{"date":19,"today":-1},{"date":20,"today":-1}],[{"date":21,"today":-1},{"date":22,"today":-1},{"date":23,"today":-1},{"date":24,"today":-1},{"date":25,"today":-1},{"date":26,"today":-1},{"date":27,"today":-1}],[{"date":28,"today":-1},{"date":29,"today":-1},{"date":30,"today":-1},{"date":31,"today":0,"price":"1","available":"true","status":"0","dateId":"20170531","dateTimestamp":1496188800000,"series":0},{"date":0,"today":-1},{"date":0,"today":-1},{"date":0,"today":-1}]]},
                    rightData: {"title":"2017-06","data":[[{"date":0,"today":0},{"date":0,"today":0},{"date":0,"today":0},{"date":0,"today":0},{"date":1,"today":1,"price":"1","available":"true","status":"0","dateId":"20170601","dateTimestamp":1496275200000,"series":0},{"date":2,"today":1,"price":"1","available":"true","status":"0","dateId":"20170602","dateTimestamp":1496361600000,"series":0},{"date":3,"today":1,"price":"1","available":"true","status":"0","dateId":"20170603","dateTimestamp":1496448000000,"series":0}],[{"date":4,"today":1,"available":"false","status":"2","dateId":"20170604","dateTimestamp":1496534400000,"series":0},{"date":5,"today":1,"available":"false","status":"2","dateId":"20170605","dateTimestamp":1496620800000,"series":0},{"date":6,"today":1,"available":"false","status":"2","dateId":"20170606","dateTimestamp":1496707200000,"series":0},{"date":7,"today":1,"available":"false","status":"2","dateId":"20170607","dateTimestamp":1496793600000,"series":0},{"date":8,"today":1,"price":"1","available":"true","status":"0","dateId":"20170608","dateTimestamp":1496880000000,"series":0},{"date":9,"today":1,"price":"1","available":"true","status":"0","dateId":"20170609","dateTimestamp":1496966400000,"series":0},{"date":10,"today":1,"available":"false","status":"2","dateId":"20170610","dateTimestamp":1497052800000,"series":0}],[{"date":11,"today":1,"price":"1","available":"true","status":"0","dateId":"20170611","dateTimestamp":1497139200000,"series":0},{"date":12,"today":1,"available":"false","status":"2","dateId":"20170612","dateTimestamp":1497225600000,"series":0},{"date":13,"today":1,"available":"false","status":"2","dateId":"20170613","dateTimestamp":1497312000000,"series":0},{"date":14,"today":1,"available":"false","status":"2","dateId":"20170614","dateTimestamp":1497398400000,"series":0},{"date":15,"today":1,"available":"false","status":"2","dateId":"20170615","dateTimestamp":1497484800000,"series":0},{"date":16,"today":1,"available":"false","status":"2","dateId":"20170616","dateTimestamp":1497571200000,"series":0},{"date":17,"today":1,"available":"false","status":"2","dateId":"20170617","dateTimestamp":1497657600000,"series":0}],[{"date":18,"today":1,"available":"false","status":"2","dateId":"20170618","dateTimestamp":1497744000000,"series":0},{"date":19,"today":1,"available":"false","status":"2","dateId":"20170619","dateTimestamp":1497830400000,"series":0},{"date":20,"today":1,"available":"false","status":"2","dateId":"20170620","dateTimestamp":1497916800000,"series":0},{"date":21,"today":1,"available":"false","status":"2","dateId":"20170621","dateTimestamp":1498003200000,"series":0},{"date":22,"today":1,"price":"1","available":"true","status":"0","dateId":"20170622","dateTimestamp":1498089600000,"series":0},{"date":23,"today":1,"price":"1","available":"true","status":"0","dateId":"20170623","dateTimestamp":1498176000000,"series":0},{"date":24,"today":1,"price":"1","available":"true","status":"0","dateId":"20170624","dateTimestamp":1498262400000,"series":0}],[{"date":25,"today":1,"price":"1","available":"true","status":"0","dateId":"20170625","dateTimestamp":1498348800000,"series":0},{"date":26,"today":1,"available":"false","status":"2","dateId":"20170626","dateTimestamp":1498435200000,"series":0},{"date":27,"today":1,"available":"false","status":"2","dateId":"20170627","dateTimestamp":1498521600000,"series":0},{"date":28,"today":1,"price":"1","available":"true","status":"0","dateId":"20170628","dateTimestamp":1498608000000,"series":0},{"date":29,"today":1,"price":"1","available":"true","status":"0","dateId":"20170629","dateTimestamp":1498694400000,"series":0},
                        {
                            "date":30,
                            "today":1,
                            "price":"1",
                            "available":"true",
                            "dateId":"20170630"
                        },
                        {"date":0,"today":0}]]}
                }
            }
        },
        beforeMount: function () {},
        watch: {
            price: {
                handler: function (newVal) {
                    var monthData = this.monthData(newVal);
                    this.calendarData.leftData = monthData.leftData;
                    this.calendarData.rightData = monthData.rightData;
                },
                deep: true
            },
            show: function (newVal,oldVal) {
                if (newVal===true&&oldVal===false) {
                    this.leftSelectDays_tmp = [].concat(this.$refs.calendar_left.selectDays);
                    this.rightSelectDays_tmp = [].concat(this.$refs.calendar_right.selectDays);
                    this.selectedDate_tmp = this.selectedDate;
                }
            }
        },
        computed: {
            shortSelectedDate: function () {
                if (this.selectedDate.length > 17) {
                    return this.selectedDate.slice(0,17) + '...';
                } else {
                    return this.selectedDate;
                }
            }
        },
        methods: {
            closeCalendar () {
                this.show = false;
                this.cancelDate();
            },
            showCalendar (e) {
                var _this = this;
                if (this.show) {
                    return;
                }
                this.show = true;
                var closeCalendar = function () {
                    _this.show = false;
                };
                // document.addEventListener('click', closeCalendar);
                var now = this.$route.path;
                if (now.indexOf('buy') >= 0) {
                    this.$refs.calendar_left.disableText = '已售出';
                    this.$refs.calendar_right.disableText = '已售出';
                } else if (now.indexOf('distribute') >= 0) {
                    this.$refs.calendar_left.disableText = '已售出';
                    this.$refs.calendar_right.disableText = '已分配';
                } else {
                    this.$refs.calendar_left.disableText = '已售出';
                    this.$refs.calendar_right.disableText = '已售出';
                }
                var calendarLeft = 0;
                var calendarTop = 0;
                var rect = this.$refs.dateInput.getBoundingClientRect();//当前输入框的未知对象
                var clientWidth = document.documentElement.clientWidth;
                var clientHeight = document.documentElement.clientHeight;
                calendarLeft = (clientWidth - rect.left > 700)?rect.left:clientWidth-700;
                calendarTop = (clientHeight - rect.bottom > 340)?rect.bottom:rect.top-340;
                this.$refs.dateCalendar.style.left = calendarLeft + "px";
                this.$refs.dateCalendar.style.top = calendarTop + "px";
                this.show = true;
            },
            changeMonth (type) {
                console.log(type);
                var year = this.calendarData.leftData.title.split('-')[0];
                var month = this.calendarData.leftData.title.split('-')[1];
                year = parseInt(year);
                month = parseInt(month);
                switch (type) {
                    case 'pre':
                        if (month - 1 === 0) {
                            month = 12;
                            year = year - 1;
                        } else {
                            month = month - 1;
                        }
                        break;
                    case 'next':
                        if (month + 1 === 13) {
                            month = 1;
                            year = year + 1;
                        } else {
                            month = month + 1;
                        }
                        break;
                    default:
                        break;
                }
                var monthData = this.monthData(this.price, year, month);
                this.calendarData.leftData = monthData.leftData;
                this.calendarData.rightData = monthData.rightData;
            },
            getRange () {
                var days = [].concat(this.$refs.calendar_left.selectDays,this.$refs.calendar_right.selectDays);
                days.sort(function(pre,next){
                    return pre.dateId - next.dateId;
                })
                this.selectedDate = days.map(function(item){
                    return item.dateId;
                }).join(',');
                this.dateRangeCount = days.length;
                this.priceTotal = 0;
                for (var i=0,len=days.length;i<len;i++) {
                    this.priceTotal += parseFloat(days[i].price);
                }
            },
            cancelDate () {
                this.$refs.calendar_left.selectDays = [].concat(this.leftSelectDays_tmp);
                this.$refs.calendar_right.selectDays = [].concat(this.rightSelectDays_tmp);
                this.selectedDate = this.selectedDate_tmp;
                this.dateRangeCount = 0;
                this.priceTotal = 0;
                this.show = false;
            },
            confirmDate () {
                var days = [].concat(this.$refs.calendar_left.selectDays,this.$refs.calendar_right.selectDays);
                days.sort(function(pre,next){
                    return pre.dateId - next.dateId;
                })
                this.$emit('pricedaterange', {
                    dateList:days
                });
                this.show = false;
            },
            monthData (message,year,month) {
                year = year || new Date().getFullYear();
                month = month || new Date().getMonth() + 1;
                var date = '' + year + '-' + (month<10?'0'+month:month) + '-' + '01'; 
                date = new Date(date);
                return {
                    leftData: this.getDateList(date,message),
                    rightData: this.getDateList(date,message),
                }
            },
            getDateList (date,message) {
                var day = 1;
                var oldMonth = date.getMonth();
                var DateList = {
                    title:date.getFullYear()+'-'+(oldMonth+1<10?'0'+(oldMonth+1):oldMonth+1),
                    data: []
                };
                var weekList = []
                var today = new Date();
                var firstDayWeek = date.getDay();
                weekList = weekList.concat(new Array(firstDayWeek).fill({date: 0,today: 0}));
                while (oldMonth === date.getMonth()) {
                    var data = {
                        date: day,
                        today: today>date?-1:(today === date?0:1)
                    }
                    if(date.getDay() === 0) {
                        DateList.data.push(weekList);
                        weekList = [];
                    }
                    weekList.push(data);
                    date.setDate(day+1);
                    day = date.getDate();
                }
                var lastDayWeek = date.getDay()-1;
                weekList = weekList.concat(new Array(6-lastDayWeek).fill({date: 0,today: 0}));
                DateList.data.push(weekList);
                return DateList;
            }
        }
    }
</script>