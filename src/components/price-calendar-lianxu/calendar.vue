<template>
    <div class="calendar-container" ref="calendar" @click.stop="">
        <div class="calendar-title" >
            <span class="calendar-pre-month" v-if="pre" @click="changeMonth('pre')">前</span>
            <span class="calendar-title-cont">{{calendar.title}}</span>
            <span class="calendar-next-month" v-if="next" @click="changeMonth('next')">后</span>
        </div>
        <div class="calendar-content" :class="getContentClass">
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
                    <tr v-for="week in calendar.data">
                        <td v-for="day in week" :title="day.available=='true'?'￥'+day.price:(day.available=='false'?disableText:'不可购买')">
                            <div v-if="day.date" :class="{'calendar-hover':day.available=='true','calendar-selected':hasSelectedDate(day)}" @click.stop="selectDate(day)">
                                <span class="calendar-date-num">{{day.today==0?"今天":day.date}}</span>
                                <span class="calendar-date-price">{{day.available=='true'?'￥'+day.price:(day.available=='false'?disableText:"")}}</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script src='./calendar.js'></script>
<style src="./calendar.css" scoped></style>