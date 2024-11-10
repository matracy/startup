function pollSumary({ poll }) {
	return (
		<>
			<tr>
				<td className="pollOption">{poll}.name</td>
				<td className="infoText">{poll}.result</td>
			</tr>
		</>
	);
}

export { pollSumary };
