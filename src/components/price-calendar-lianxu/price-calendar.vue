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
                <calendar class="calendar" ref="calendar_left"  v-on:changeMonth="changeMonth" v-on:daterange="getRange" :selectDays="getSelectDays" :calendar="calendarData.leftData"></calendar>
                <calendar class="calendar" ref="calendar_right" v-on:changeMonth="changeMonth" v-on:daterange="getRange" :selectDays="getSelectDays" :calendar="calendarData.rightData"></calendar>
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
<script src='./price-calendar.js'></script>
