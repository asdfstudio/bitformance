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
	const IndexBox = () => (<td className="w-32">
			<div className="flex flex-row py-1 rounded-lg justify-center items-center gap-1 bg-main-lightGray">
				<p className="text-sm text-main-gray font-DM_Sans font-medium leading-normal tracking-wide">{Math.abs((price * holdingQuantity) / indexPrice * 100).toFixed(2)}%</p>
			</div>
		</td>
	)
	return(<>
		<CoinRow 
			id={id} 
			logo={logo} 
			name={name} 
			symbol={symbol} 
			price={price * holdingQuantity}
			changepct_24hour={changepct_24hour}
			changepct_7day={changepct_7day}
			market_cap={market_cap}
		/>
		<IndexBox />
		<td className='text-main-black font-DM_Sans font-medium leading-normal tracking-normal text-base w-32'>{Math.abs(holdingQuantity).toFixed(3)}</td>
		<td className='text-main-black font-DM_Sans font-medium leading-normal tracking-normal text-base w-32'>{formatMoney(price)}</td>
	</>)
}