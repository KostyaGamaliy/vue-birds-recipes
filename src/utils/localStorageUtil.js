export function saveDataToLocalStorage(key, data) {
	localStorage.setItem(key, JSON.stringify(data))
}

export function getDataFromLocalStorage(key) {
	return JSON.parse(localStorage.getItem(key))
}
