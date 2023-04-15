import HoldingsRow from '../HoldingsRow'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BFIcon from '../BFIcon'

export default function BFHoldingsTable({ holdings, handleHeaderClick }) {
	
	const navigate = useNavigate()
	const [orderHoldings, setHoldings] = useState(holdings)
	const [sortField, setSortField] = useState('name')
	const [previousSortOrder, setSortOrder] = useState('desc')

	const headers = [
		{ label: 'Cryptocurrency', id: 'name', type: 'alphabet' },
		{ label: 'Tickers', id: 'symbol', type: 'alphabet' },
		{ label: 'Price', id: 'price1', type: 'computed' },
		{ label: '24h %', id: 'changepct_24hour' },
		{ label: '7d %', id: 'changepct_7day' },
		{ label: 'Market Cap', id: 'market_cap' },
		{ label: '% of Index', id: 'index', type: 'computed' },
		{ label: 'Quantity Held', id: 'holdingQuantity' },
		{ label: 'Value of Holding', id: 'price' },
	]

	const HeaderColumn = ({ item, sortable }) => (
		<th onClick={() => sortBy(item.id, item.type)} key={item.id} scope="col" className="py-2 px-6">
			<div className={`flex flex-row items-center 
				${item.id === "name" && 'w-52'}
				${item.id === "holdingQuantity" && '-mr-12'}
				${item.id === "index" && '-mr-10'} 
			`}>
		    <span className="ml-2 font-DM_Sans font-normal leading-normal tracking-wide">{item.label}</span>
		    {sortable && <div className="ml-1 w-3 h-3 text-[7px] flex justify-center items-center">
			{
					handleHeaderClick == true ? <BFIcon iconName="arrowUp" color={"#111111"}/> : <BFIcon iconName="arrowDown" color={"#111111"}/>
				}
				</div>}
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
        <thead className='text-base cursor-pointer text-main-gray bg-main-lightGray grid rounded-xl'>
		    <tr className='grid grid-flow-col justify-between whitespace-nowrap'>
        		{headers.map(header => (
        			<HeaderColumn onClick={handleHeaderClick} key={header.label + '-holdings'} item={header} sortable={true} />
        		))}
          </tr>
        </thead>
        <tbody>
        	{orderHoldings.map(coin => (
        		<tr onClick={() => onCoinRowClicked(coin)} key={coin.symbol + '-holdings-table'} className="p-4 bg-mian-black grid grid-flow-col justify-between">
        			<HoldingsRow {...coin} />
        		</tr>
        	))}
        </tbody>
    </table>
	)
}