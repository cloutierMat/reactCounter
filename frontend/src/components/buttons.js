export function Button(props) {
	const { name, onClick } = props
	return <button onClick={onClick}>{name}</button>
}