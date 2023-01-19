import axios from "axios"

const instance = axios.create({
	baseURL: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
	timeout: 10000,
	headers: {
		"X-RapidAPI-Key": "d1fbb82f10msh78689a358e02a4cp19499ajsn0da38ecc5ccd",
		"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
	},
})

export default instance

/*export default function (name) {
	return axios
		.request({
			method: "GET",
			url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random",
			params: { number: "20", tags: name.replace(" ", ",").toLowerCase() },
			headers: {
				"X-RapidAPI-Key": "d1fbb82f10msh78689a358e02a4cp19499ajsn0da38ecc5ccd",
				"X-RapidAPI-Host":
					"spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
			},
		})
		.then(function (response) {
			return response.data
		})
		.catch(function (error) {
			console.error(error)
		})
}*/
