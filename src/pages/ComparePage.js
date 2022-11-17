import { useState, useEffect } from 'react'
import BFIcon from '../components/BFIcon'
import BFCryptoSelectorCard from '../components/BFCryptoSelectorCard'
import exampleIcon from '../exampleIcon.png'

export default function ComparePage() {

	const [typeSelected, setTypeSelected] = useState('side-by-side')

	const [selectedCryptoOne, setSelectedCryptoOne] = useState(null)
	const [selectedCryptoTwo, setSelectedCryptoTwo] = useState(null)


	const selectedStyle = 'border shadow rounded-md bg-blue-400 text-white p-2 cursor'
	const notSelectedStyle = 'rounded-md bg-gray-100 hover:bg-gray-200 text-gray-500 p-2 cursor'

	const SelectedButton = ({ label }) => (
		<button onClick={() => setTypeSelected(label.toLowerCase())} className={selectedStyle}>
			<BFIcon iconName="checked-circle" />&nbsp;&nbsp;
			<span>{label}</span>
		</button>
	)

	const NotSelectedButton = ({ label }) => (
		<button onClick={() => setTypeSelected(label.toLowerCase())} className={notSelectedStyle}>
			<BFIcon iconName="open-circle" />&nbsp;&nbsp;
			<span>{label}</span>
		</button>
	)

	const selectCrypto = (text, id) => {
		//TODO: select crypto from text and 
		console.log(text)

		const setCall = id == 1 ? setSelectedCryptoOne : setSelectedCryptoTwo
		setCall({
			id: 109,
			image: exampleIcon,
			name: 'Bitcoin',
			ticker: 'BTC',
			price: 20928.35,
			hourlyPercentageChange: -0.91,
			weeklyPercentageChange: -2.11,
			marketCap: '$380.44B'
		})
	}

	return(
		<div className="p-4 h-5/6">
			<div className="flex flex-row gap-4 rounded-lg border bg-white p-4 shadow items-center">
				<h1 className="text-xl mr-2">Compare Currencies</h1>
				{typeSelected === 'side-by-side' ? <SelectedButton label="Side-by-side" /> : <NotSelectedButton label="Side-by-side" />}
				{typeSelected === 'overlay' ? <SelectedButton label="Overlay" /> : <NotSelectedButton label="Overlay" />}
			</div>

			<div className="grid grid-cols-2 gap-2 p-1 h-4/5 overflow-y-auto">
				<BFCryptoSelectorCard selectedCrypto={selectedCryptoOne} selectCrypto={selectCrypto} id="1" />
				<BFCryptoSelectorCard selectedCrypto={selectedCryptoTwo} selectCrypto={selectCrypto} id="2" />
			</div>
		</div>
	)
}