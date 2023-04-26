import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BFTable from '../components/small/BFTable'
import { useBrowsableIndexes } from '../endpoints/index'
import BFLoading from '../components/small/BFLoading'

export default function BrowsePage() {
	const navigate = useNavigate()
	const { data, isLoading } = useBrowsableIndexes()

	const [sortField, setSortField] = useState('market_cap')
	const [sortOrder, setSortOrder] = useState('desc') //'asc'

	const sortBy = (label) => {
		if (!label) {
			return
		}
		if (label === sortField) {
			setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
			return
		}
		setSortField(label)
		setSortOrder('desc')
	}

	const rowClicked = (coin) => {
		navigate(`/indexes/browse/${coin._id.$oid}`)
	}

	const SortedTable = ({ sortField, sortOrder }) => {
		const { data, isLoading } = useBrowsableIndexes(sortField, sortOrder)
		return (<>
			<BFTable 
				rows={data || []} 
				type="browse-cryptos" 
				tableStyle="border-separate border-spacing-y-0" 
				handleHeaderClick={sortBy}
				onRowClicked={rowClicked}
			/>
			{isLoading &&
				<div className="h-96 bg-white">
					<BFLoading heightAdjust="h-[45vh]" />
				</div>
			}
		</>)
	}

	if (isLoading) return <BFLoading />

	return (
		<div className="bg-main-lightGray sm:p-4">
			<SortedTable sortField={sortField} sortOrder={sortOrder} />
		</div>
	)
}