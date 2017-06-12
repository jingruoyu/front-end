<template>
    <div class="date-wrap" ref="dataWrap">
        <input @click.stop="showCalendar"
               v-model="selectedDate"
               class="date-input"
               type="text"
               placeholder="选择日期"
               ref="dateInput">
        <div v-show="show" class="date-calendar-root" @click='show=false'>
            <div ref="dateCalendar" class="date-calendar-wrap" @click.stop="">
                <calendar class="calendar" ref="calendar_left"  v-on:changeMonth="changeMonth" :pre="true" :next="false" :calendar="calendarData.leftData"></calendar>
                <calendar class="calendar" ref="calendar_right" v-on:changeMonth="changeMonth" :pre="false" :next="true" :calendar="calendarData.rightData"></calendar>
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
        width: 100%;
        height: 100%;
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
</style>
<script scoped>
    var calendar = require('./calendar.vue');
    //var util = require('./lib/utils');
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
        /*props: {
            price: {
                type: Array
            }
        },*/
        data: function () {
            return {
                show: false,
                startDate: '2016-12-31',
                endDate: '2017-01-01',
                selectedDate: [],
                calendarData: {
                    leftData: {"title":"2017-05","data":[[{"date":0,"today":-1},{"date":1,"today":-1},{"date":2,"today":-1},{"date":3,"today":-1},{"date":4,"today":-1},{"date":5,"today":-1},{"date":6,"today":-1}],[{"date":7,"today":-1},{"date":8,"today":-1},{"date":9,"today":-1},{"date":10,"today":-1},{"date":11,"today":-1},{"date":12,"today":-1},{"date":13,"today":-1}],[{"date":14,"today":-1},{"date":15,"today":-1},{"date":16,"today":-1},{"date":17,"today":-1},{"date":18,"today":-1},{"date":19,"today":-1},{"date":20,"today":-1}],[{"date":21,"today":-1},{"date":22,"today":-1},{"date":23,"today":-1},{"date":24,"today":-1},{"date":25,"today":-1},{"date":26,"today":-1},{"date":27,"today":-1}],[{"date":28,"today":-1},{"date":29,"today":-1},{"date":30,"today":-1},{"date":31,"today":0,"price":"1","available":"true","status":"0","dateId":"20170531","dateTimestamp":1496188800000,"series":0},{"date":0,"today":-1},{"date":0,"today":-1},{"date":0,"today":-1}]]},
                    rightData: {"title":"2017-06","data":[[{"date":0,"today":0},{"date":0,"today":0},{"date":0,"today":0},{"date":0,"today":0},{"date":1,"today":1,"price":"1","available":"true","status":"0","dateId":"20170601","dateTimestamp":1496275200000,"series":0},{"date":2,"today":1,"price":"1","available":"true","status":"0","dateId":"20170602","dateTimestamp":1496361600000,"series":0},{"date":3,"today":1,"price":"1","available":"true","status":"0","dateId":"20170603","dateTimestamp":1496448000000,"series":0}],[{"date":4,"today":1,"available":"false","status":"2","dateId":"20170604","dateTimestamp":1496534400000,"series":0},{"date":5,"today":1,"available":"false","status":"2","dateId":"20170605","dateTimestamp":1496620800000,"series":0},{"date":6,"today":1,"available":"false","status":"2","dateId":"20170606","dateTimestamp":1496707200000,"series":0},{"date":7,"today":1,"available":"false","status":"2","dateId":"20170607","dateTimestamp":1496793600000,"series":0},{"date":8,"today":1,"price":"1","available":"true","status":"0","dateId":"20170608","dateTimestamp":1496880000000,"series":0},{"date":9,"today":1,"price":"1","available":"true","status":"0","dateId":"20170609","dateTimestamp":1496966400000,"series":0},{"date":10,"today":1,"available":"false","status":"2","dateId":"20170610","dateTimestamp":1497052800000,"series":0}],[{"date":11,"today":1,"price":"1","available":"true","status":"0","dateId":"20170611","dateTimestamp":1497139200000,"series":0},{"date":12,"today":1,"available":"false","status":"2","dateId":"20170612","dateTimestamp":1497225600000,"series":0},{"date":13,"today":1,"available":"false","status":"2","dateId":"20170613","dateTimestamp":1497312000000,"series":0},{"date":14,"today":1,"available":"false","status":"2","dateId":"20170614","dateTimestamp":1497398400000,"series":0},{"date":15,"today":1,"available":"false","status":"2","dateId":"20170615","dateTimestamp":1497484800000,"series":0},{"date":16,"today":1,"available":"false","status":"2","dateId":"20170616","dateTimestamp":1497571200000,"series":0},{"date":17,"today":1,"available":"false","status":"2","dateId":"20170617","dateTimestamp":1497657600000,"series":0}],[{"date":18,"today":1,"available":"false","status":"2","dateId":"20170618","dateTimestamp":1497744000000,"series":0},{"date":19,"today":1,"available":"false","status":"2","dateId":"20170619","dateTimestamp":1497830400000,"series":0},{"date":20,"today":1,"available":"false","status":"2","dateId":"20170620","dateTimestamp":1497916800000,"series":0},{"date":21,"today":1,"available":"false","status":"2","dateId":"20170621","dateTimestamp":1498003200000,"series":0},{"date":22,"today":1,"price":"1","available":"true","status":"0","dateId":"20170622","dateTimestamp":1498089600000,"series":0},{"date":23,"today":1,"price":"1","available":"true","status":"0","dateId":"20170623","dateTimestamp":1498176000000,"series":0},{"date":24,"today":1,"price":"1","available":"true","status":"0","dateId":"20170624","dateTimestamp":1498262400000,"series":0}],[{"date":25,"today":1,"price":"1","available":"true","status":"0","dateId":"20170625","dateTimestamp":1498348800000,"series":0},{"date":26,"today":1,"available":"false","status":"2","dateId":"20170626","dateTimestamp":1498435200000,"series":0},{"date":27,"today":1,"available":"false","status":"2","dateId":"20170627","dateTimestamp":1498521600000,"series":0},{"date":28,"today":1,"price":"1","available":"true","status":"0","dateId":"20170628","dateTimestamp":1498608000000,"series":0},{"date":29,"today":1,"price":"1","available":"true","status":"0","dateId":"20170629","dateTimestamp":1498694400000,"series":0},{"date":30,"today":1,"price":"1","available":"true","status":"0","dateId":"20170630","dateTimestamp":1498780800000,"series":0},{"date":0,"today":0}]]}
                },
                top: 0,
                left: 0
            }
        },
        beforeMount: function () {},
        watch: {
            price: {
                handler: function (newVal) {
                    /*var monthData = util.monthData(newVal);
                    this.calendarData.leftData = monthData.leftData;
                    this.calendarData.rightData = monthData.rightData;
                    this.currentMonth = monthData.leftData.title;*/
                },
                deep: true
            },
            show: function (newVal,oldVal) {
            if (newVal==false&&oldVal==true) {
                var days = [].concat(this.$refs.calendar_left.selectDays,this.$refs.calendar_right.selectDays);
                days.sort(function(pre,next){
                    return pre.dateId - next.dateId;
                })
                this.selectedDate = days.map(function(item){
                    return item.dateId;
                }).join(',');
                if (this.selectedDate.length > 17) {
                    this.selectedDate = this.selectedDate.slice(0,17) + '...';
                }
                if (this.selectedDate.length) {
                    this.$emit('pricedaterange', {
                        dateList:days
                    });
                }
            }
        }

        },
        components: {
            calendar: calendar
        },
        methods: {
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
            calendarTop = (clientHeight - rect.bottom > 300)?rect.bottom:rect.top-300;
            this.$refs.dateCalendar.style.left = calendarLeft + "px";
            this.$refs.dateCalendar.style.top = calendarTop + "px";
            this.show = true;
        },
            changeMonth (type) {
                console.log(type);
            }
        }
    }
</script>