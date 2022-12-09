import CoinRow from '../CoinRow'
import BrowseCoinRow from '../BrowseCoinRow'
import BFHoldingsTable from './BFHoldingsTable'
import { useState } from 'react'

export default function BFTable({ condensedHeaders = false, rows, type, tableStyle = '', onRowClicked = function () {} }) {

	const [showHoldingRow, setShowHoldingRow] = useState(null)

	let headers = [
		'Cryptocurrency',
		'Price',
		'24 %',
		'7d %',
		'Market Cap',
		'Last Updated',
		'Action'
	]

	if (condensedHeaders) {
		headers = ['Cryptocurrency', 'Tickers', 'Price', '24h %', '7d %', 'Market Cap']
	}



	const HeaderColumn = ({ label, sortable }) => (
		<th key={label} scope="col" className="py-3 px-6">
			<div className="flex items-center">
		    <span>{label}</span>
		    {sortable && <button><svg xmlns="http://www.w3.org/2000/svg" className="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></button>}
			</div>
		</th>
	)

	const showHoldings = (index) => {
		if (index === showHoldingRow) {
			setShowHoldingRow(null)
		} else {
			setShowHoldingRow(index)
		}
	}

	console.log(rows)

	return(
		<div className="overflow-x-auto relative sm:rounded-lg">
		    <table className={`w-full text-sm text-left ${tableStyle}`}>
		        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
	            <tr>
            		{headers.map(header => (
            			<HeaderColumn key={header + '-coins'} label={header} sortable={true} />
            		))}
	            </tr>
		        </thead>
		        <tbody>
		        		{rows.map((coin, index) => {
		        			return type === 'top-cryptos' ? (<tr key={coin.id} className="p-4 bg-white dark:bg-gray-800 dark:border-gray-700"><CoinRow key={coin.id} {...coin} /></tr>)
		        				: type === 'browse-cryptos' ? (<>
		        					<tr key={coin.id} onClick={() => onRowClicked(coin.index)} className="shadow bg-white dark:bg-gray-800 dark:border-gray-700">
		        						<BrowseCoinRow key={coin.id} rowIndex={index} {...coin.index} showHoldings={showHoldings} />
		        					</tr>
		        					{showHoldingRow === index && <tr key={coin.id + '-holdings'}>
		        						<td className="bg-white" colspan="8">
		        							<BFHoldingsTable holdings={coin.rawStocks.map(stock => {
														return {
															...stock,
															holdingQuantity: coin.index.holdings[stock.symbol],
															indexPrice: coin.index.value
														}
													})} />
		        						</td>
		        					</tr>}

		        				</>)
		        				: (<tr key={coin.id}>no valid type</tr>)
		        		})}
		        </tbody>
		    </table>

		</div>

	)
}