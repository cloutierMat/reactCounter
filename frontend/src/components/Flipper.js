import { useState, useEffect } from 'react'
import ReactCardFlip from 'react-card-flip'

function Card(props) {
	const { count, id } = props
	return <div className="card" id={id}>
		{count}
	</div>
}
export default function Flipper(props) {
	const { count } = props

	const [card1, setCard1] = useState(count)
	const [card2, setCard2] = useState(count)
	const [isFlipped, setIsFlipped] = useState(false)
	function handleClick(e) {
		setIsFlipped(!isFlipped)
	}

	useEffect(() => {
		if (isFlipped) {
			setCard1(count)
		} else {
			setCard2(count)
		}
		setIsFlipped(isFlipped => !isFlipped)
	}, [count])

	return (
		<ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
			<Card count={card1} onClick={handleClick} id="card1" />
			<Card count={card2} onClick={handleClick} id="card2" />

		</ReactCardFlip>)

}


