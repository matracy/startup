function pollOption({ name, rank, increaseRank, decreaseRank }) {
	return (
		<>
			<div class="pollOption">
				<span>
					{name}
					{{ rank } != null
						? ": " +
							{ rank } +
							'\
					<p class="imitationButton" onClick={increaseRank}>\
						+\
					</p>\
					<p class="imitationButton" onClick={decreaseRank}>\
						-\
					</p>\
					'
						: null}
				</span>
			</div>
		</>
	);
}

export { pollOption };
