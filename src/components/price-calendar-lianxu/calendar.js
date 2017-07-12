module.exports = {
    data () {
        return {
            disableText: "已售出",
            startDate: null
        }
    },
    props: {
        pre: {
            default: true
        },
        next: {
            default: true
        },
        calendar: {
            required: true
        },
        selectDays: {
            required: true
        }
    },
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
            this.$emit("daterange",day);
        },
        hasSelectedDate (day) {
            return this.selectDays.some(function(item){
                return item.dateId === day.dateId;
            })
        },
        changeMonth (type) {
            this.$emit('changeMonth',type,this.calendar);
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