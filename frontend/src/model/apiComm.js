const path = 'http://localhost:8087/counter/'

async function refresh(offset, store) {
	const result = offset ? await update() : await getCount(store)
	return result
}

async function update(operation, store) {
	try {
		const response = await fetch(path + operation, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(store)
		})
		const countObj = await response.json()
		return countObj
	} catch (error) {
	}
}

async function getCount(store) {
	try {
		const response = await fetch(path + store)
		const result = await response.json()
		return result
	} catch (error) {
		console.log('error in getcount', error)
		return {
			serverStatus: "Couldn't connect",
			dbStatus: ""
		}
	}
}

const apiComm = { refresh, getCount, update }
export default apiComm

