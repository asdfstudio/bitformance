import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BFTable from '../components/small/BFTable'
import { useMyIndexes } from '../endpoints/index'
import BFLoading from '../components/small/BFLoading'

export default function MyIndexesPages() {
  const navigate = useNavigate()
  const { data } = useMyIndexes()

  const [order, setOrder] = useState(data)
  const [sortField, setSortField] = useState('')
  const [previousSortOrder, setSortOrder] = useState('desc')
  const [loading, setLoading] = useState(true)

useEffect(() => {
    if (data && order.length !== data.length) {
      setOrder(data);
    }
	setLoading(false);
  }, [data, order.length]);

  const sortBy = (id, type) => {
    let sortOrder = 'desc'
    if (sortField === id) {
      sortOrder = previousSortOrder === 'desc' ? 'asc' : 'desc'
    }
    setSortOrder(sortOrder)
    setSortField(id)

    let newOrder = []
    if (type === 'alphabet') {
      newOrder = data.sort((a, b) => {
        if (sortOrder === 'desc') {
          return a.index[id] > b.index[id] ? 1 : -1
        } else {
          return a.index[id] < b.index[id] ? 1 : -1
        }
      })
    } else if (type === 'computed') {
      newOrder = data.sort((a, b) => {
        if (sortOrder === 'desc') {
          return a.rawStocks.reduce((sum, stock) => stock.market_cap + sum, 0) - b.rawStocks.reduce((sum, stock) => stock.market_cap + sum, 0)
        } else {
          return b.rawStocks.reduce((sum, stock) => stock.market_cap + sum, 0) - a.rawStocks.reduce((sum, stock) => stock.market_cap + sum, 0)
        }
      })
    } else {
      newOrder = data.sort((a, b) => {
        if (sortOrder === 'desc') {
          return a.index[id] - b.index[id]
        } else {
          return b.index[id] - a.index[id]
        }
      })
    }
    setOrder(newOrder)
  }

  const rowClicked = (coin) => {
    navigate(`/indexes/my-indexes/${coin._id.$oid}`)
  }

  useEffect(() => {
    if (!localStorage.getItem('username')) {
      navigate('/?sessionExpired=true')
    }
  }, [])

  return (
    <div className="bg-gray-50 sm:p-4">
      {loading ? (
        <BFLoading />
      ) : (
        <BFTable
          rows={order || []}
          type="my-indexes"
          tableStyle="border-separate"
          onRowClicked={rowClicked}
          handleHeaderClick={sortBy}
        />
      )}
    </div>
  )
}
