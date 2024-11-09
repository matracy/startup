function pollOption({ name, rank, increaseRank, decreaseRank }) {
	return (
		<>
			<div class="pollOption">
				<span>
					{name}: {rank}
					<p class="imitationButton" onClick={increaseRank}>
						+
					</p>
					<p class="imitationButton" onClick={decreaseRank}>
						-
					</p>
				</span>
			</div>
		</>
	);
}

export { pollOption };
