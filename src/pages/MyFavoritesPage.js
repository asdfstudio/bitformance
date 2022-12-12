import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BFTable from '../components/small/BFTable'
import { useFavoriteIndexes } from '../endpoints/index'

export default function MyFavoritesPage() {

	const navigate = useNavigate()
	const { data, isLoading } = useFavoriteIndexes()


	const sortBy = () => {
		//TODO: 
	}

	const [sortOrder, setSortOrder] = useState('ASC')


	const rowClicked = (coin) => {
		navigate(`/indexes/my-indexes/${coin._id.$oid}`)
	}

	useEffect(() => {
		if (!localStorage.getItem('username')) {
			navigate('/?sessionExpired=true')
		}
	}, [])

	return (
		<div className="p-4 bg-gray-50">
			<BFTable 
				rows={data || []} 
				type="browse-cryptos" 
				tableStyle="border-separate border-spacing-y-5" 
				onRowClicked={rowClicked}
			/>
		</div>
	)
}