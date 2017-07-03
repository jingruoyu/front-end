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

    .confirm,.cancel {
        height: 100%;
        width: 80px;
        float: right;
        border: 0;
        margin: 0;
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
    import calendar from './calendar.vue'
    var format = function (timestamp) {
        var timeData = new Date(timestamp);
        var year = timeData.getFullYear();
        var month = timeData.getMonth() + 1;
        var date = timeData.getDate();
        month = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;
        return year + '-' + month + '-' + date;
    };
    export default {
        name: 'price-calendar',
        components:{
            calendar: calendar
        },
        props: {
            price: {
                type: Object,
                default: {}
            }
        }
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
                    leftData: {},
                    rightData: {}
                }
            }
        },
        beforeMount: function () {
            var monthData = this.monthData(this.price);
            this.calendarData.leftData = monthData.leftData;
            this.calendarData.rightData = monthData.rightData;
        },
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
                console.log('before'+this.selectedDate);
                if (this.selectedDate.length > 17) {
                    return this.selectedDate.slice(0,17) + '...';
                } else {
                    return this.selectedDate;
                }
                console.log('after'+this.selectedDate);
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
                    data: [],
                };
                var weekList = []
                var today = new Date();
                var firstDayWeek = date.getDay();
                weekList = weekList.concat(new Array(firstDayWeek).fill({date: 0,today: 0}));
                while (oldMonth === date.getMonth()) {
                    var data = {
                        date: day,
                        today: today>date?-1:(today === date?0:1),
                        dateId: format(date)
                    }
                    if (this.price[format(date)]) {
                        for(var key in this.price[format(date)]) {
                            data[key] = this.price[format(date)][key];
                        }
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