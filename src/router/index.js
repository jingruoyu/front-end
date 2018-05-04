import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '../components/Hello.vue'
import calendar from '../components/price-calendar/calendar.vue'
import priceCalendar from '../components/price-calendar/price-calendar.vue'

Vue.use(VueRouter)

const routes =  [
    {
        path: '/',
        redirect: '/index'
    },{
        path: '/index',
        name: 'Hello',
        component: Hello,
        meta:{title:'hello'}
    },{
        path: '/calendar',
        name: 'calendar',
        meta:{title:'calendar'},
        component: calendar,
    },{
        path: '/priceCalendar',
        name: 'priceCalendar',
        meta:{title:'priceCalendar'},
        component: priceCalendar,
    }
]

const router = new VueRouter({
    mode:'history',
    routes
})

router.beforeEach((to,from,next)=>{
    console.log(to);
    document.title = to.meta.title;
    next();
})

export default router;

