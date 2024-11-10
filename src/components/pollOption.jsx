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
					<p class="imitationButton" onClick={increaseRank({name})}>\
						+\
					</p>\
					<p class="imitationButton" onClick={decreaseRank({name})}>\
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
