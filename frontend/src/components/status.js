export function Status(props) {
	const { serverStatus } = props
	return <>
		Server status: {serverStatus}
	</>
}