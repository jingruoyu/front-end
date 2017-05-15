import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '../components/Hello.vue'
import showId from '../components/showId.vue'
import bar from '../components/bar.vue'

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

