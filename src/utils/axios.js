import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
	timeout: 10000,
	headers: {
		'X-RapidAPI-Key': 'd1fbb82f10msh78689a358e02a4cp19499ajsn0da38ecc5ccd',
		'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
	}
})

export default instance
