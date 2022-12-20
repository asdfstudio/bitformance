import CoinRow from '../CoinRow'
import BrowseCoinRow from '../BrowseCoinRow'
import BFHoldingsTable from './BFHoldingsTable'
import React, { useState } from 'react'

export default function BFTable({ handleHeaderClick = function() {}, condensedHeaders = false, rows, type, tableStyle = '', onRowClicked = function () {} }) {

	const [showHoldingRow, setShowHoldingRow] = useState(null)
	const [holdings, setHoldings] = useState()

	let headers = [
		{ label: 'Cryptocurrency', id: 'name', type: 'alphabet' },
		{ label: 'Price', id: 'value' },
		{ label: '24h %', id: 'changepct_24hour' },
		{ label: '7d %', id: 'changepct_7d' },
		{ label: 'Market Cap', id: 'marketcap', type: 'computed' },
		{ label: 'Last Updated', id: '' }, //updated backend check?
		{ label: 'Action', id: '' }, //favorites backend check?
	]

	if (condensedHeaders) {
		headers = [
			{ label: 'Cryptocurrency', id: 'name' },
			{ label: 'Tickers', id: 'symbol' },
			{ label: 'Price', id: 'price' },
			{ label: '24h %', id: 'changepct_24hour' },
			{ label: '7d %', id: 'changepct_7day' },
			{ label: 'Market Cap', id: 'market_cap' }
		]
	}



	const HeaderColumn = ({ item, onClick }) => (
		<th onClick={() => onClick(item.id, item.type)} key={item.label} scope="col" className="py-3 px-6">
			<div className="flex items-center">
		    <span>{item.label}</span>
		    {item.id && <button><svg xmlns="http://www.w3.org/2000/svg" className="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></button>}
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

	return(
		<div className="overflow-x-auto relative sm:rounded-lg">
		    <table className={`w-full text-sm text-left ${tableStyle}`}>
		        <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
	            <tr>
            		{headers.map(header => (
            			<HeaderColumn 
            				key={header.label + '-coins'} 
            				item={header} 
            				onClick={handleHeaderClick}
            			/>
            		))}
	            </tr>
		        </thead>
		        <tbody>
		        		{rows.map((coin, index) => {
		        			return type === 'top-cryptos' ? (<tr key={coin.id} className="p-4 bg-white dark:bg-gray-800 dark:border-gray-700"><CoinRow key={coin.id} {...coin} /></tr>)
		        				: (type === 'browse-cryptos' || type === 'my-indexes') ? (<React.Fragment key={coin.index._id.$oid}>
		        					<tr onClick={() => onRowClicked(coin.index)} className="shadow bg-white dark:bg-gray-800 dark:border-gray-700">
		        						<BrowseCoinRow 
		        							rowIndex={index} 
		        							{...coin.index} 
		        							marketcap={coin.index.marketcap || coin.rawStocks.reduce((sum, a) => a.market_cap + sum ,0)}
		        							showHoldings={showHoldings} 
		        							showDelete={type === 'my-indexes'}
		        						/>
		        					</tr>
		        					{showHoldingRow === index && <tr>
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
		        				</React.Fragment>)
		        				: (<tr key={coin.id}>no valid type</tr>)
		        		})}
		        </tbody>
		    </table>

		</div>

	)
}