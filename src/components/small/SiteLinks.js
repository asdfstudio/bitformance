import { useState } from 'react'
import { Link } from 'react-router-dom'
import BFIcon from '../BFIcon'
import { useMyIndexes, useFavoriteIndexes } from '../../endpoints/index'

const secondaryColor = '#40C8B8'

export default function SiteLinks({ setShowModalType, setShowMobileMenu = function(){} , colorStyle = '' }) {

	const { data, isLoading } = useMyIndexes()
	const { data: favorites, isLoading: favoritesLoading } = useFavoriteIndexes()


	const [indexesExpanded, setIndexesExpanded] = useState(false)

	return(<>
		<Link to="/" onClick={() => setShowMobileMenu(false)} className={`flex flex-row items-center gap-2 cursor-pointer`}>
			<BFIcon iconName="home" color={secondaryColor} />
			<span className={colorStyle}>Home</span>
		</Link>
		<div className="flex flex-row items-center gap-2 cursor-pointer" onClick={() => setIndexesExpanded(!indexesExpanded)}>
			<BFIcon iconName="indexes" color={secondaryColor} />
			<span className={colorStyle}>Indexes</span>
		</div>
		{indexesExpanded && <>
			<div className="ml-2 cursor-pointer">
				<Link onClick={() => setShowMobileMenu(false)}  to="/indexes/browse">
					<BFIcon iconName="browse" color="white" />
					<span className={`ml-2 ${colorStyle}`}>Browse</span>
				</Link>
			</div>
			<Link to="/indexes/my-indexes" onClick={() => setShowMobileMenu(false)} className="ml-2 flex flex-row gap-2 items-center cursor-pointer">
				<BFIcon iconName="my-indexes" color="white" />
				<span className={colorStyle}>My Indexes</span>
				<span className="ml-auto w-6 h-6 rounded-full bg-blue-900 text-sm flex items-center justify-center">{data ? data.length : ''}</span>
			</Link>
			<Link to="/indexes/my-favorites" onClick={() => setShowMobileMenu(false)} className="ml-2 flex flex-row items-center gap-2 cursor-pointer">
				<BFIcon iconName="favorite" color="white" />
				<span className={colorStyle}>My Favorites</span>
				<span className="ml-auto w-6 h-6 rounded-full bg-blue-900 text-sm flex items-center justify-center">{favorites ? favorites.length: ''}</span>
			</Link>
		</>}
		<Link onClick={() => setShowMobileMenu(false)}  to="/compare" className="flex flex-row items-center gap-2 cursor-pointer">
			<BFIcon iconName="compare" color={secondaryColor} />
			<span className={colorStyle}>Compare</span>
		</Link>
		<button onClick={() => {
			if (setShowMobileMenu) {
				setShowMobileMenu(false)
			}
			setShowModalType('CONTACT_US')
		}} className="flex flex-row items-center gap-2">
			<BFIcon iconName="contact-us" color={secondaryColor} />
			<span className={colorStyle}>Contact Us</span>
		</button>
		<Link className="flex flex-row items-center gap-2 cursor-pointer">
			<BFIcon iconName="knowledge-base" color={secondaryColor} />
			<span className={colorStyle}>Knowledge Base</span>
		</Link>
		<br />
		<div onClick={() => setShowMobileMenu(false)}  className="rounded bg-blue-500 text-center px-4 py-2 w-full">
			<Link to="/indexes/create-index" className={colorStyle}>+ Create Index</Link>
		</div>
	</>)
}