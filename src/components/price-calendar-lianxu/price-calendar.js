var calendar = require('./calendar.vue');
var util = require('./lib/utils.js');
var format = function (timestamp) {
    var timeData = new Date(timestamp);
    var year = timeData.getFullYear();
    var month = timeData.getMonth() + 1;
    var date = timeData.getDate();
    month = month < 10 ? '0' + month : month;
    date = date < 10 ? '0' + date : date;
    return '' + year + month + date;
}
module.exports = {
    name: 'price-calendar',
    components:{
        calendar: calendar
    },
    props: {
        price: {
            type: Array
        }
    },
    data: function () {
        return {
            show: false,
            selectedDate: '',
            selectedDate_tmp: '',
            selectDays: [],
            selectDays_tmp: [],
            currentSelectDays: [],//正在选择的日期区段
            dateRangeCount:0,
            priceTotal:0,
            calendarData: {
                leftData: null,
                rightData: null
            },
            startDate: null,//当前时段起始日期
            endDate: null,//当前时段结束日期
            priceDate: null//价格和日期结合对象
        }
    },
    beforeMount: function () {
        var year = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        this.priceDate = util.handlePrice(this.price);
        this.calendarData.leftData = util.monthData(this.price, year, month);
        month = month + 1;
        if (month > 12) {
            month = parseInt(year) + 1;
            month = month % 12;
        }
        this.calendarData.rightData = util.monthData(this.price, year, month);
    },
    watch: {
        price: {
            handler: function (newVal) {
                var year = new Date().getFullYear();
                var month = new Date().getMonth() + 1;
                this.priceDate = util.handlePrice(this.price);
                this.calendarData.leftData = util.monthData(newVal, year, month);
                month = month + 1;
                if (month > 12) {
                    month = parseInt(year) + 1;
                    month = month % 12
                }
                this.calendarData.rightData = util.monthData(newVal, year, month);
            },
            deep: true
        },
        show: function (newVal,oldVal) {
            if (newVal===true&&oldVal===false) {
                this.leftSelectDays_tmp = [].concat(this.$refs.calendar_left.selectDays);
                this.rightSelectDays_tmp = [].concat(this.$refs.calendar_right.selectDays);
                this.selectedDate_tmp = this.selectedDate;
                this.selectDays_tmp = [...this.selectDays];
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
        },
        getSelectDays () {
            var self = this;
            if (this.startDate) {
                var _index = -1;
                this.selectDays.forEach(function(item,index){
                    if (item.dateId === self.startDate.dateId) {
                        _index = index;
                    }
                })
                var tmp = [...self.selectDays];
                if (_index !== -1) {
                    tmp.splice(_index,1);
                } else {
                    tmp.push(self.startDate);
                }
                return tmp;
            } else {
                return self.selectDays;
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
            var rect = this.$refs.dateInput.getBoundingClientRect();//当前输入框的位置对象
            var clientWidth = document.documentElement.clientWidth;
            var clientHeight = document.documentElement.clientHeight;
            calendarLeft = (clientWidth - rect.left > 700)?rect.left:clientWidth-700;
            calendarTop = (clientHeight - rect.bottom > 340)?rect.bottom:rect.top-340;
            this.$refs.dateCalendar.style.left = calendarLeft + "px";
            this.$refs.dateCalendar.style.top = calendarTop + "px";
            this.show = true;
        },
        changeMonth (type,calendarData) {
            var year = calendarData.title.split('-')[0];
            var month = calendarData.title.split('-')[1];
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
            var monthData = util.monthData(this.price, year, month);
            for (var key in monthData) {
                calendarData[key] = monthData[key];
            }
            /*if (this.calendarData.leftData.title === calendarData.title) {
                this.calendarData.leftData = util.monthData(this.price, year, month);
            } else {
                this.calendarData.rightData = util.monthData(this.price, year, month);
            }*/
        },
        getRange (day) {
            if (this.isNull(this.startDate)&&day.available === 'true') {
                this.startDate = day;
                return;
            }
            if(day.dateTimestamp < this.startDate.dateTimestamp) {
                this.endDate = this.startDate;
                this.startDate = day;
            } else {
                this.endDate = day;
            }
            //遍历起止日期间的所有日期
            var startDateTimestamp = this.startDate.dateTimestamp;
            var endDateTimestamp = this.endDate.dateTimestamp;
            while (startDateTimestamp <= endDateTimestamp) {
                var tmp = this.priceDate[format(startDateTimestamp)];
                if (tmp && tmp.available === 'true') {
                    var index = this.selectDays.indexOf(tmp);
                    if (index === -1) {
                        this.selectDays.push(tmp);
                    } else {
                        this.selectDays.splice(index,1);
                    }
                }
                startDateTimestamp = startDateTimestamp + 86400000;
            }

            this.selectedDate = this.selectDays.map(function(item){
                return item.dateId;
            }).join(',');
            this.dateRangeCount = this.selectDays.length;
            this.priceTotal = 0;
            for (var i=0,len=this.selectDays.length;i<len;i++) {
                this.priceTotal += parseFloat(this.selectDays[i].price);
            }

            this.startDate = null;
            this.endDate = null;
/*            var days = [].concat(this.$refs.calendar_left.selectDays,this.$refs.calendar_right.selectDays);
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
            }*/
        },
        cancelDate () {
            this.selectedDate = this.selectedDate_tmp;
            this.selectDays = [...this.selectDays_tmp];
            this.dateRangeCount = 0;
            this.priceTotal = 0;
            this.show = false;
        },
        confirmDate () {
            this.selectDays.sort(function (pre,next) {
                return pre.dateTimestamp - next.dateTimestamp
            })
            this.$emit('pricedaterange', {
                dateList:this.selectDays
            });
            this.show = false;
        },
        isNull (param) {
            if(!param && typeof(param)!="undefined" && param!=0) {
                return true;
            } else {
                return false;
            }
        }
    }
}