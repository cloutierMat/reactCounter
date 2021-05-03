import { useState } from "react"
import { Button } from "./buttons"
import { Status } from "./status"

export function Counter() {
	const [count, setCount] = useState(0)
	const [serverStatus, setServerStatus] = useState("Waiting for connection")

	const clickHandler = (name) => {
		return async () => {
			try {
				const response = await fetch(`http://localhost:8087/counter/${name}`)
				const countObj = await response.json()
				setCount(countObj.count)
				setServerStatus('Online')
			} catch (error) {
				setServerStatus('Offline')
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