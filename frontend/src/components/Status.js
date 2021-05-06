export function Status(props) {
	const { serverStatus, dbStatus } = props
	return <>
		Server status: {serverStatus}
		<br />
		Database Status: {dbStatus}
	</>
}