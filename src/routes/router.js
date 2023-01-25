import { createRouter, createWebHistory } from 'vue-router'
import CreateBird from '@/pages/CreateBirdPage.vue'
import BirdsPage from '@/pages/BirdsPage.vue'
import RecipesPage from '@/pages/RecipesPage.vue'
import ChangeBirdPage from '@/pages/ChangeBirdPage'
import ChangeRecipePage from '@/pages/ChangeRecipePage'
import AddRecipePage from '@/pages/AddRecipePage'
import ErrorPage from '@/pages/ErrorPage'
import AuthorizationPage from '@/pages/Authorization'
import store from '@/pinia/store'
import AllRecipesPage from '@/pages/AllRecipesPage'
import RecipeInformation from '@/pages/RecipeInformation'

const routes = [
	{
		path: '/createBird',
		name: 'CreateBird',
		component: CreateBird
	},
	{
		path: '/authorize',
		name: 'AuthorizationPage',
		component: AuthorizationPage
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'ErrorPage',
		component: ErrorPage
	},
	{
		path: '/',
		name: 'BirdsPage',
		component: BirdsPage
	},
	{
		path: '/bird/:birdId',
		name: 'ChangeBirdPage',
		component: ChangeBirdPage
	},
	{
		path: '/recipes/:birdId',
		name: 'RecipesPage',
		component: RecipesPage
	},
	{
		path: '/recipes/:birdId/:recipeId',
		name: 'ChangeRecipePage',
		component: ChangeRecipePage
	},
	{
		path: '/addrecipe/:birdId',
		name: 'AddRecipePage',
		component: AddRecipePage
	},
	{
		path: '/allrecipes',
		name: 'AllRecipesPage',
		component: AllRecipesPage
	},
	{
		path: '/allrecipes/:recipeId',
		name: 'RecipeInformation',
		component: RecipeInformation
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

router.beforeEach((to, from, next) => {
	if (
		!store.state.isAuth &&
		(to.name === 'CreateBird' ||
			to.name === 'AddRecipePage' ||
			to.name === 'ChangeRecipePage' ||
			to.name === 'ChangeBirdPage')
	) {
		router.push('/authorize')
	} else next()
})
export default router
