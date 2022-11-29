import CoinRow from './CoinRow'

export default function HoldingsRow({
	id,
	image,
	name,
	ticker,
	price,
	hourlyPercentageChange,
	weeklyPercentageChange,
	marketCap,
	
}) {
	return(<>
		<CoinRow 
			id={id} 
			image={image} 
			name={name} 
			ticker={ticker} 
			price={price} 
			hourlyPercentageChange={hourlyPercentageChange}
			weeklyPercentageChange={weeklyPercentageChange}
			marketCap={marketCap}
		/>
		<td>% of index</td>
		<td>quantity held</td>
		<td>value of holidng</td>
	</>)
}