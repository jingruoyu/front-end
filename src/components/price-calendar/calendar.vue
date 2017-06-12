<template>
    <div class="calendar-container" ref="calendar" @click.stop="">
        <div class="calendar-title">
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
<script scoped>
module.exports = {
    data () {
        return {
            disableText: "已售出",
            selectDays:[]
        }
    },
    props:['pre','next','calendar'],
    computed: {
        getContentClass () {
            if(this.pre && this.next) {
                return 'single-calendar';
            }else if(this.pre) {
                return 'left-calendar';
            }else {
                return 'right-calendar'
            }
        }
    },
    methods: {
        selectDate (day) {
            if(!day.available||day.available=="false") return;
            if(this.selectDays.indexOf(day)===-1){
                this.selectDays.push(day);
            } else {
                var index = this.selectDays.indexOf(day);
                this.selectDays.splice(index,1);
            }
        },
        hasSelectedDate (day) {
            return this.selectDays.indexOf(day)===-1?false:true;
        },
        changeMonth (type) {
            this.$emit('changeMonth',type);
        }
    }
}
</script>
<style src="./calendar.css" scoped></style>