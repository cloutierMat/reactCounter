import { useState, useEffect } from "react"
import { Button } from "./Buttons"
import { Status } from "./Status"

export function Counter() {
	const [count, setCount] = useState(0)
	const [serverStatus, setServerStatus] = useState("Waiting for connection")
	const [path, setPath] = useState('http://localhost:8087/counter/')
	const [store, setStore] = useState("mine")
	const [pos, setPos] = useState(0)

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(path + store)
			const obj = await response.json()
			setCount(obj.count)
			setServerStatus(obj.status)
		}
		fetchData()
		setInterval(fetchData, 3000)
	}, [path, store])

	const clickHandler = (name) => {
		return async () => {
			try {
				const response = await fetch(path + name, {
					method: "post",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ store, pos })
				})
				const countObj = await response.json()
				setCount(countObj.count)
				setServerStatus(countObj.status)
			} catch (error) {
				setServerStatus("error in handling your request")
			}
		}
	}

	return (
		<>
			<h1>
				Capacity Counter
			</h1>
			<h4>Current Count: {count}</h4>
			<section>{["increase", "decrease"].map(name => {
				return <Button className="btn" name={name} onClick={clickHandler(name)} key={name} />
			})}
			</section>
			<section className="status"> <Status serverStatus={serverStatus} /></section>
		</>)
}