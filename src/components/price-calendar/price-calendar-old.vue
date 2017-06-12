<template>
    <div class="date-wrap" ref="dataWrap">
        <input @click.stop="showPanel"
               v-model="selectedDate"
               class="date-input"
               type="text"
               placeholder="选择日期"
               ref="dateInput">
        <div ref="datePanel" v-show="show" class="date-panel-wrap">
            <date-panel ref="refPanel" v-on:daterange="getRange" :price="priceData"></date-panel>
        </div>
    </div>
</template>
<style scoped>
    .date-wrap {
        position: relative;
        width: 222px;
    }

    .date-panel-wrap {
        position: fixed;
        width: 700px;
        z-index: 9999999999999999999;
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
    var datePanel = require('./panel.vue');
    var po = require('./lib/utils');
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
        props: {
            price: {
                type: Array
            }
        },
        data: function () {
            return {
                show: false,
                startDate: '2016-12-31',
                endDate: '2017-01-01',
                selectedDate: '',
                priceData: '',
                top: 0,
                left: 0
            }
        },
        beforeMount: function () {
            var _this = this;
            this.priceData = this.price;
            // document.addEventListener('click', function (e) {
            //     _this.show = po.isParent(e.target, _this.$refs.datePanel) || po.isParent(e.target, _this.$refs.dataWrap);
            // });
        },
        watch: {
            price: {
                handler: function (newVal) {
                    this.priceData = newVal;
                },
                deep: true
            },
            show: function (val) {
            }
        },
        components: {
            datePanel: datePanel
        },
        methods: {
            showPanel: function (e) {
                var _this = this;
                if (this.show) {
                    return;
                }

                var closePanel = function () {
                    _this.show = false;
                    document.querySelector('.date-panel-wrap').style.display = 'none';
                    document.removeEventListener('click', closePanel);
                };

                document.addEventListener('click', closePanel);
                this.show = true;
                var scrollTop;
                var now = this.$route.path;
                if (now.indexOf('buy') >= 0) {
                    this.$refs.refPanel.disableText = '已售出';
                    scrollTop = document.querySelector('.main-list').scrollTop;
                } else if (now.indexOf('distribute') >= 0) {
                    this.$refs.refPanel.disableText = '已分配';
                    scrollTop = document.querySelector('.purchase-distribution').scrollTop;
                } else {
                    this.$refs.refPanel.disableText = '已售出';
                    scrollTop = document.querySelector('.main-list').scrollTop;
                }
                var clientHeight = document.documentElement.scrollHeight;
                var inputLeft = e.pageX;
                var inputTop = e.pageY;
                var top = (clientHeight - inputTop - 42 + scrollTop > 300) ? inputTop + 42 - scrollTop : inputTop - 300 - scrollTop;
                var left = (inputLeft + 222 > 700) ? inputLeft - (700 - 222) : 0;
                // var top = e.pageY;
                // var left = e.pageX;
                this.top = top;
                this.left = left;
                var body = document.getElementsByTagName('body')[0];
                this.$refs.datePanel.style.left = left + 'px';
                this.$refs.datePanel.style.top = top + 'px';
                body.appendChild(this.$refs.datePanel);
                this.show = true;
            },
            getRange: function (data) {
                var start = format(data.start);
                var end = format(data.end);
                this.selectedDate = start + ' 至 ' + end;
                this.$emit('pricedaterange', {
                    startDate: start,
                    endDate: end
                });
                this.show = false;
            }
        }
    }
</script>