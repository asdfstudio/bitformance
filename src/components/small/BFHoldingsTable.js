import HoldingsRow from '../HoldingsRow'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function BFHoldingsTable({ holdings, handleHeaderClick }) {
	
	const navigate = useNavigate()
	const [orderHoldings, setHoldings] = useState(holdings)
	const [sortField, setSortField] = useState('name')
	const [previousSortOrder, setSortOrder] = useState('desc')

	const headers = [
		{ label: 'Cryptocurrency', id: 'name', type: 'alphabet' },
		{ label: 'Tickers', id: 'symbol', type: 'alphabet' },
		{ label: 'Price', id: '', type: 'computed' },
		{ label: '24h %', id: 'changepct_24hour' },
		{ label: '7d %', id: 'changepct_7day' },
		{ label: 'Market Cap', id: 'market_cap' },
		{ label: '% of Index', id: '', type: 'computed' },
		{ label: 'Quantity Held', id: 'holdingQuantity' },
		{ label: 'Value of Holding', id: 'price' },
	]

	const HeaderColumn = ({ item, sortable }) => (
		<th onClick={() => sortBy(item.id, item.type)} key={item.id} scope="col" className="py-3 px-6">
			<div className="flex items-center">
		    <span>{item.label}</span>
		    {sortable && <button><svg xmlns="http://www.w3.org/2000/svg" className="ml-1 w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/></svg></button>}
			</div>
		</th>
	)

	const sortBy = (id, type) => {
		console.log(holdings)
		console.log(id)
		let sortOrder = 'desc'
		if (sortField === id) {
			sortOrder = previousSortOrder === 'desc' ? 'asc': 'desc'
		}
		setSortOrder(sortOrder)
		setSortField(id)

		let newOrder = []
		if (type === 'alphabet') {
			newOrder = holdings.sort((a, b) => {
				if (sortOrder === 'desc') {
					return a[id] > b[id] ? 1 : -1
				} else {
					return a[id] < b[id] ? 1 : -1
				}
			})
		} else if (type === 'computed') {
			newOrder = holdings.sort((a, b) => {
				if (sortOrder === 'desc') {
					return (a['price'] * a['holdingQuantity']) - (b['price'] * b['holdingQuantity'])
				} else {
					return (b['price'] * b['holdingQuantity']) - (a['price'] * a['holdingQuantity'])
				}
			})
		} else {
			newOrder = holdings.sort((a, b) => {
				if (sortOrder === 'desc') {
					return a[id] - b[id]
				} else {
					return b[id] - a[id]
				}
			})
		}
		setHoldings(newOrder)
	}	

	const onCoinRowClicked = (coin) => {
		console.log(coin)
		navigate(`/coins/${coin.symbol}`)
	}

	return(
    <table className={`w-full text-sm text-left`}>
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
          <tr>
        		{headers.map(header => (
        			<HeaderColumn onClick={handleHeaderClick} key={header.label + '-holdings'} item={header} sortable={true} />
        		))}
          </tr>
        </thead>
        <tbody>
        	{orderHoldings.map(coin => (
        		<tr onClick={() => onCoinRowClicked(coin)} key={coin.symbol + '-holdings-table'} className="shadow bg-white">
        			<HoldingsRow {...coin} />
        		</tr>
        	))}
        </tbody>
    </table>
	)
}