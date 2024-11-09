function pollSumary({ poll }) {
	return (
		<>
			<tr>
				<td class="pollOption">{poll}.name</td>
				<td class="infoText">{poll}.result</td>
			</tr>
		</>
	);
}

export { pollSumary };
