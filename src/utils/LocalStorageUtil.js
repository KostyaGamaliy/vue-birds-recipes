export function getData(key, value) {
	let dataDet = localStorage.getItem(key)

	if (dataDet) {
		return (value = JSON.parse(dataDet))
	} else {
		setData(key, value)
	}
}

export function setData(key, value) {
	return localStorage.setItem(key, JSON.stringify(value))
}
