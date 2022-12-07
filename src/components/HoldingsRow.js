import CoinRow from './CoinRow'
import { formatMoney } from '../helpers/index'

export default function HoldingsRow({
	id,
	logo,
	name,
	symbol,
	price,
	changepct_24hour,
	changepct_7day,
	market_cap,
	supply,
	holdingQuantity,
	indexPrice,
}) {
	//TODO: finish price, % of index, supply, value
	return(<>
		<CoinRow 
			id={id} 
			image={logo} 
			name={name} 
			ticker={symbol} 
			price={price * holdingQuantity} //TODO 
			hourlyPercentageChange={changepct_24hour}
			weeklyPercentageChange={changepct_7day}
			marketCap={market_cap}
		/>
		<td>{Math.abs((price * holdingQuantity) / indexPrice * 100).toFixed(2)}%</td>
		<td>{Math.abs(holdingQuantity).toFixed(3)}</td>
		<td>{formatMoney(price)}</td>
	</>)
}