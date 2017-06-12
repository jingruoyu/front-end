<template>
    <div class="calendar-container">
        <div class="calendar-left">
            <div class="calendar-title">
                <span class="calendar-title-cont">{{leftData.title}}</span>
            </div>
            <div class="calendar-content">
                <table>
                    <thead>
                    <tr>
                        <th class="sunday">日</th>
                        <th>一</th>
                        <th>二</th>
                        <th>三</th>
                        <th>四</th>
                        <th>五</th>
                        <th>六</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="week in leftData.data">
                        <td v-for="j in week" :title="j.status==0?'¥'+j.price:(j.status==1?'不可购买': disableText)">
                            <div @click.stop="selectDate(j)"
                                 :class="{'calendar-hover':j.status==0,'calendar-selected':selectedPeriod(j.dateTimestamp)}"
                                 v-if="j.date>0">
                                <span class="calendar-date-num">{{j.today==0?'今天':j.date}}</span>
                                <span class="price">
                                    {{j.status==0?'¥'+j.price:(j.status==2? disableText :'')}}
                                </span>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="calendar-right">
            <div class="calendar-title">
                <span class="calendar-title-cont">{{rightData.title}}</span>
            </div>
            <div class="calendar-content">
                <table>
                    <thead>
                    <tr>
                        <th class="sunday">日</th>
                        <th>一</th>
                        <th>二</th>
                        <th>三</th>
                        <th>四</th>
                        <th>五</th>
                        <th>六</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="week in rightData.data">
                        <td v-for="j in week" :title="j.status==0?'¥'+j.price:(j.status==1?'不可购买': disableText)">
                            <div @click.stop="selectDate(j)"
                                 :class="{'calendar-hover':j.status==0,'calendar-selected':selectedPeriod(j.dateTimestamp)}"
                                 v-if="j.date>0">
                                <span class="calendar-date-num">{{j.today==0?'今天':j.date}}</span>
                                <span class="price">
                                    {{j.status==0?'¥'+j.price:(j.status==2? disableText :'')}}
                                </span>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="calendar-action">
            <div class="calendar-prev" @click.stop="switchDate('prev')">
                <span class="calendar-prev-outer"></span>
                <span class="calendar-prev-inner"></span>
            </div>
            <div class="calendar-next" @click.stop="switchDate('next')">
                <span class="calendar-next-outer"></span>
                <span class="calendar-next-inner"></span>
            </div>
        </div>
    </div>
</template>
<style scoped src="./panel.css"></style>
<script>
    var util = require('./lib/utils');
    module.exports = {
        name: 'price-calendar',
        data: function () {
            return {
                series: '',
                startDate: '',
                endDate: '',
                leftData: [],
                rightData: [],
                currentMonth: '',
                selected: {
                    start: '',
                    end: ''
                },
                disableText: '已售出'
            }
        },
        props: {
            price: {
                type: Array
            }
        },
        beforeMount: function () {
            var _this = this;
            _this.priceData = _this.price;
            var monthData = util.monthData(_this.priceData);
            this.leftData = monthData.leftData;
            this.rightData = monthData.rightData;
            this.currentMonth = monthData.leftData.title;
            //console.log(JSON.stringify(this.leftData));
            // console.log(JSON.stringify(this.rightData));
        },
        watch: {
            price: {
                handler: function (newVal) {
                    this.priceData = newVal;
                    var monthData = util.monthData(this.priceData);
                    this.leftData = monthData.leftData;
                    this.rightData = monthData.rightData;
                    this.currentMonth = monthData.leftData.title;
                },
                deep: true
            }
        },
        methods: {
            selectedPeriod: function (time) {
                return (time >= this.selected.start && time <= this.selected.end) || (time == this.selected.start);
            },
            switchDate: function (type) {
                var year = this.currentMonth.split('-')[0];
                var month = this.currentMonth.split('-')[1];
                year = parseInt(year);
                month = parseInt(month);
                if (type === 'prev') {
                    if (month - 1 === 0) {
                        month = 12;
                        year = year - 1;
                    } else {
                        month = month - 1;
                    }
                } else {
                    if (month + 1 === 13) {
                        month = 1;
                        year = year + 1;
                    } else {
                        month = month + 1;
                    }
                }
                year = parseInt(year);
                month = parseInt(month);

                var data = util.monthData(this.priceData, year, month);
                this.leftData = data.leftData;
                this.rightData = data.rightData;
                this.currentMonth = data.leftData.title;
            },
            selectDate: function (data) {
                if (data.status != 0) {
                    return;
                }
                if (this.selected.start) {
                    if (this.selected.end) {
                        this.selected.start = data.dateTimestamp;
                        this.selected.end = '';
                    } else {
                        if (data.dateTimestamp < this.selected.start) {
                            this.selected.start = data.dateTimestamp;
                        } else {
                            if (this.series != data.series) {
                                this.selected.start = data.dateTimestamp;
                            } else {
                                this.selected.end = data.dateTimestamp;
                                this.$emit('daterange', this.selected);
                            }
                        }
                    }
                } else {
                    this.selected.start = data.dateTimestamp;
                }
                this.series = data.series;
            }
        }
    }
</script>