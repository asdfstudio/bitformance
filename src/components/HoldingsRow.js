import CoinRow from './CoinRow'

export default function HoldingsRow({
	id,
	logo,
	name,
	symbol,
	price,
	changepct_24hour,
	changepct_7day,
	market_cap,
}) {
	return(<>
		<CoinRow 
			id={id} 
			image={logo} 
			name={name} 
			ticker={symbol} 
			price={price} 
			hourlyPercentageChange={changepct_24hour}
			weeklyPercentageChange={changepct_7day}
			marketCap={market_cap}
		/>
		<td>% of index</td>
		<td>quantity held</td>
		<td>value of holidng</td>
	</>)
}