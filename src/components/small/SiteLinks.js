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
	const [siteSelected, setSiteSelected] = useState('')

	return(<>
		<Link to="/" onClick={() => setShowMobileMenu(false) & setSiteSelected('home')} 
			className={ siteSelected === 'home' ? 
			`flex flex-row items-center gap-2 cursor-pointer h-[40px] bg-main-buttonBlue rounded-lg px-[10px] bg-opacity-50`
			 : 
			`flex flex-row items-center gap-2 cursor-pointer h-[40px] ml-[10px]`
			}
		>
			<BFIcon iconName="home" color={secondaryColor} />
			<span className={colorStyle}>Home</span>
		</Link>
		<Link to="/coins" onClick={() => setShowMobileMenu(false) & setSiteSelected('coins')} 
		className={ siteSelected === 'coins' ? 
			`flex flex-row items-center gap-2 cursor-pointer h-[40px] bg-main-buttonBlue rounded-lg px-[10px] bg-opacity-50`
			 : 
			`flex flex-row items-center gap-2 cursor-pointer h-[40px] ml-[10px]`
			}
		>
			<BFIcon iconName="coins" color={secondaryColor} />
			<span className={colorStyle}>Coins</span>
		</Link>
		<div className="flex flex-row items-center justify-between gap-2 cursor-pointer h-[40px] ml-[10px]" onClick={() => setIndexesExpanded(!indexesExpanded)}>
			<div className='flex flex-row items-start'>
				<div className='pr-2'>
					<BFIcon iconName="indexes" color={secondaryColor} />
				</div>
				<span className={colorStyle}>Indexes</span>
			</div>
			<div className='text-[7px]'>
				{
					indexesExpanded == true ? <BFIcon iconName="arrowUP" color={whiteColor}/> : <BFIcon iconName="arrowDown" color={whiteColor}/>
				}
			</div>
		</div>
		{indexesExpanded && <>
			<div className="cursor-pointer h-[40px]">
				<Link onClick={() => setShowMobileMenu(false) & setSiteSelected('browse')}  to="/indexes/browse"
				className={ siteSelected === 'browse' ? 
				`flex flex-row items-center gap-2 cursor-pointer h-[40px] bg-main-buttonBlue rounded-lg px-6 bg-opacity-50`
				 : 
				`ml-6 flex flex-row items-center gap-2 cursor-pointer h-[40px]`
				}
				>
					<BFIcon iconName="browse" color="white" />
					<span className={`ml-2 ${colorStyle}`}>Browse</span>
				</Link>
			</div>
			<Link to="/indexes/my-indexes" onClick={() => setShowMobileMenu(false) & setSiteSelected('my-indexes')} 
			className={ siteSelected === 'my-indexes' ? 
			`flex flex-row gap-2 items-center cursor-pointer h-[40px] bg-main-buttonBlue rounded-lg pl-6 bg-opacity-50`
			 : 
			`ml-6 flex flex-row gap-2 items-center cursor-pointer h-[40px]`
			}
			>
				<BFIcon iconName="my-indexes" color="white" />
				<span className={colorStyle}>My Indexes</span>
				<span className="ml-auto w-[16px] h-[22px] rounded bg-main-buttonBlue text-sm flex items-center justify-center mr-2 font-DM_Sans font-medium leading-normal tracking-normal">{data ? data.length : ''}</span>
			</Link>
			<Link to="/indexes/my-favorites" onClick={() => setShowMobileMenu(false) & setSiteSelected('my-favorites')} 
			className={ siteSelected === 'my-favorites' ? 
			`flex flex-row items-center gap-2 cursor-pointer h-[40px] bg-main-buttonBlue rounded-lg pl-6 bg-opacity-50`
			 : 
			`ml-6 flex flex-row items-center gap-2 cursor-pointer h-[40px]`
			}
			>
				<BFIcon iconName="favorite" color="white" />
				<span className={colorStyle}>My Favorites</span>
				<span className="ml-auto w-[16px] h-[22px] rounded bg-main-buttonBlue text-sm flex items-center justify-center mr-2 font-DM_Sans font-medium leading-normal tracking-normal">{favorites ? favorites.length: ''}</span>
			</Link>
		</>}
		<Link onClick={() => setShowMobileMenu(false) & setSiteSelected('compare')}  to="/compare" 
		className={ siteSelected === 'compare' ? 
			`flex flex-row items-center gap-2 cursor-pointer h-[40px] bg-main-buttonBlue rounded-lg px-[10px] bg-opacity-50`
			 : 
			`flex flex-row items-center gap-2 cursor-pointer h-[40px] ml-[10px]`
			}
		>
			<BFIcon iconName="compare" color={secondaryColor} />
			<span className={colorStyle}>Compare</span>
		</Link>
		<button onClick={() => {
			if (setShowMobileMenu) {
				setShowMobileMenu(false)
			}
			setShowModalType('CONTACT_US')
		}} 
		className={`flex flex-row items-center gap-2 cursor-pointer h-[40px] ml-[10px]`}
		>
			<BFIcon iconName="contact-us" color={secondaryColor} />
			<span className={colorStyle}>Contact Us</span>
		</button>
		<a href="http://13.57.66.34" target="_blank" className="flex flex-row items-center gap-2 cursor-pointer h-[40px] ml-[10px]">
			<BFIcon iconName="knowledge-base" color={secondaryColor} />
			<span className={colorStyle}>Knowledge Base</span>
		</a>
		<br />
		<div onClick={() => setShowMobileMenu(false)}  className="rounded-lg bg-main-buttonBlue text-center px-4 py-2 w-full shadow-sm shadow-main-shadowBlue">
			<Link to="/indexes/create-index" className={colorStyle}>+ Create Index</Link>
		</div>
	</>)
}