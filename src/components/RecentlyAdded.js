export default function RecentlyAdded() {
	
	//TODO: get real data	
	const coins = [
		{
			image: '',
			name: 'Bluechip',
			hourlyPercentageChange: -0.91,
			marketCap: '$380.44B'
		},
		{
			image: '',
			name: 'Alient Coin',
			hourlyPercentageChange: 12.01,
			marketCap: '$120.44B'
		},
		{
			image: '',
			name: 'Meme only',
			hourlyPercentageChange: 5.12,
			marketCap: '$12.24M'
		},
		{
			image: '',
			name: 'YOLO',
			hourlyPercentageChange: -1.10,
			marketCap: '$50.29B'
		},
		{
			image: '',
			name: 'What the Coin',
			hourlyPercentageChange: -41.56,
			marketCap: '$23.12B'
		}
	]

	return(
		<div>
			<h1>Recently Added</h1>
			<div>
				{coins.map(coin => (
					<div key={coin.name + '-recently-added'} className="flex flex-row justify-between">
						<div className="flex flex-row gap-2">
							<span>image</span>
							<p>{coin.name}</p>
						</div>
						<div className="">
							<p>24h %</p>
							<div>	
								<span>up/down icon</span>
								<p>{Math.abs(coin.hourlyPercentageChange).toFixed(2)}%</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}