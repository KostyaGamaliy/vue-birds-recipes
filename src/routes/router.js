import { createRouter, createWebHistory } from 'vue-router'
import CreateBird from '@/pages/CreateBirdPage.vue'
import BirdsPage from '@/pages/BirdsPage.vue'
import RecipesPage from '@/pages/RecipesPage.vue'
import ChangeBirdPage from '@/pages/ChangeBirdPage'
import ChangeRecipePage from '@/pages/ChangeRecipePage'
import AddRecipePage from '@/pages/AddRecipePage'

const routes = [
	{
		path: '/createBird',
		name: 'CreateBird',
		component: CreateBird
	},
	{
		path: '/birds',
		name: 'BirdsPage',
		component: BirdsPage
	},
	{
		path: '/birds/bird/:birdId',
		name: 'ChangeBirdPage',
		component: ChangeBirdPage
	},
	{
		path: '/birds/recipes/:birdId',
		name: 'RecipesPage',
		component: RecipesPage
	},
	{
		path: '/birds/recipes/:birdId/:recipeId',
		name: 'ChangeRecipePage',
		component: ChangeRecipePage
	},
	{
		path: '/birds/addrecipe/:birdId',
		name: 'AddRecipePage',
		component: AddRecipePage
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})
export default router
