import { useState, useEffect, useCallback } from "react"
import Button from "./Buttons"
import Status from "./Status"
import Flipper from './Flipper'
import apiComm from '../model/apiComm'

export function Counter() {
	const [count, setCount] = useState(0)
	const [offset, setOffset] = useState(0)
	const [status, setStatus] = useState({ server: "Waiting for connection", database: "Waiting for connection" })
	const [store, setStore] = useState({ store: "mine", pos: 0 })

	async function fetchData() {
		const result = await apiComm.getCount(store.store)
		if (Object.keys(result).includes("count")) {
			setCount(result.count)
		}
		setStatus({
			server: result.serverStatus,
			database: result.dbStatus
		})
	}

	useEffect(() => {
		fetchData()
		setInterval(fetchData, 3000)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const clickHandler = (name) => {
		return () => {
			const modifier = (name === 'increase' ? 1 : -1)
			setCount(count + modifier)
			setOffset(offset + modifier)
			apiComm.update(name, store)
		}
	}

	return (
		<>
			<h1>
				Store Counter
			</h1>
			<div className="cardContainer">
				<Flipper count={count} />
				<section>{["decrease", "increase"].map(name => {
					return <Button className="btn" name={name} onClick={clickHandler(name)} key={name} />
				})}
				</section>
			</div>
			<section className="status"> <Status serverStatus={status.server} dbStatus={status.database} /></section>
		</>)
}