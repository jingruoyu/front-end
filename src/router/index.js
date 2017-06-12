import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '../components/Hello.vue'
import showId from '../components/showId.vue'
import bar from '../components/bar.vue'
import calendar from '../components/price-calendar/calendar.vue'
import priceCalendar from '../components/price-calendar/price-calendar.vue'

Vue.use(VueRouter)

const routes =  [
    {
        path: '/',
        name: 'Hello',
        component: Hello,
        meta:{title:'hello'},
        children:[
        {
            path:'bar',
            name:bar,
            component:bar,
            meta: { title:'bar' }
        }
        ]
    },
    {
        path: '/calendar',
        name: 'calendar',
        meta:{title:'calendar'},
        component: calendar,
    },
    {
        path: '/priceCalendar',
        name: 'priceCalendar',
        meta:{title:'priceCalendar'},
        component: priceCalendar,
    },
    {
        path: '/:id',
        name: 'id',
        meta:{title:'bar'},
        component: showId,
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

