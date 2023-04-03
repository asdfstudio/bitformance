import { useState } from 'react'
import { Link } from 'react-router-dom'
import BFIcon from '../BFIcon'
import { useMyIndexes, useFavoriteIndexes } from '../../endpoints/index'

const secondaryColor = '#40C8B8'
const whiteColor = '#ffffff'

export default function SiteLinks({ setShowModalType, setShowMobileMenu = function(){} , colorStyle = '' }) {

	const { data, isLoading } = useMyIndexes()
	const { data: favorites, isLoading: favoritesLoading } = useFavoriteIndexes()


	const [indexesExpanded, setIndexesExpanded] = useState(false)

	return(<>
		<Link to="/" onClick={() => setShowMobileMenu(false)} className={`flex flex-row items-center gap-2 cursor-pointer h-[40px] ml-[10px]`}>
			<BFIcon iconName="home" color={secondaryColor} />
			<span className={colorStyle}>Home</span>
		</Link>
		<Link to="/coins" onClick={() => setShowMobileMenu(false)} className={`flex flex-row items-center gap-2 cursor-pointer h-[40px] ml-[10px]`}>
			<BFIcon iconName="coins" color={secondaryColor} />
			<span className={colorStyle}>Coins</span>
		</Link>
		<div className="flex flex-row items-center gap-2 cursor-pointer h-[40px] ml-[10px]" onClick={() => setIndexesExpanded(!indexesExpanded)}>
			<BFIcon iconName="indexes" color={secondaryColor} />
			<span className={colorStyle}>Indexes</span>
			<BFIcon iconName="arrowUP" color={whiteColor} size={7}/>
		</div>
		{indexesExpanded && <>
			<div className="ml-6 cursor-pointer h-[30px]">
				<Link onClick={() => setShowMobileMenu(false)}  to="/indexes/browse">
					<BFIcon iconName="browse" color="white" />
					<span className={`ml-2 ${colorStyle}`}>Browse</span>
				</Link>
			</div>
			<Link to="/indexes/my-indexes" onClick={() => setShowMobileMenu(false)} className="ml-6 flex flex-row gap-2 items-center cursor-pointer h-[40px]">
				<BFIcon iconName="my-indexes" color="white" />
				<span className={colorStyle}>My Indexes</span>
				<span className="ml-auto w-4 h-4 rounded bg-main-deepBlue text-sm flex items-center justify-center">{data ? data.length : ''}</span>
			</Link>
			<Link to="/indexes/my-favorites" onClick={() => setShowMobileMenu(false)} className="ml-6 flex flex-row items-center gap-2 cursor-pointer h-[40px]">
				<BFIcon iconName="favorite" color="white" />
				<span className={colorStyle}>My Favorites</span>
				<span className="ml-auto w-4 h-4 rounded bg-main-deepBlue text-sm flex items-center justify-center">{favorites ? favorites.length: ''}</span>
			</Link>
		</>}
		<Link onClick={() => setShowMobileMenu(false)}  to="/compare" className="flex flex-row items-center gap-2 cursor-pointer h-[40px] ml-[10px]">
			<BFIcon iconName="compare" color={secondaryColor} />
			<span className={colorStyle}>Compare</span>
		</Link>
		<button onClick={() => {
			if (setShowMobileMenu) {
				setShowMobileMenu(false)
			}
			setShowModalType('CONTACT_US')
		}} className="flex flex-row items-center gap-2 h-[40px] ml-[10px]">
			<BFIcon iconName="contact-us" color={secondaryColor} />
			<span className={colorStyle}>Contact Us</span>
		</button>
		<a href="http://13.57.66.34" target="_blank" className="flex flex-row items-center gap-2 cursor-pointer h-[40px] ml-[10px]">
			<BFIcon iconName="knowledge-base" color={secondaryColor} />
			<span className={colorStyle}>Knowledge Base</span>
		</a>
		<br />
		<div onClick={() => setShowMobileMenu(false)}  className="rounded-lg bg-main-buttonBlue text-center px-4 py-2 w-full drop-shadow-md">
			<Link to="/indexes/create-index" className={colorStyle}>+ Create Index</Link>
		</div>
	</>)
}