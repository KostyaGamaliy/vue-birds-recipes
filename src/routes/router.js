import { createRouter, createWebHistory } from "vue-router"
import CreateBird from "@/pages/CreateBirdPage.vue"
import BirdsPage from "@/pages/BirdsPage.vue"
import RecipesPage from "@/pages/RecipesPage.vue"

const routes = [
	{
		path: "/createBird",
		name: "CreateBird",
		component: CreateBird,
	},
	{
		path: "/birds",
		name: "BirdsPage",
		component: BirdsPage,
	},
	{
		path: "/birds/recipes",
		name: "RecipesPage",
		component: RecipesPage,
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})
export default router
