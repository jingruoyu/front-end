import Hello from '../components/Hello.vue'
import showId from '../components/showId.vue'
import bar from '../components/bar.vue'


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

export default routes;

