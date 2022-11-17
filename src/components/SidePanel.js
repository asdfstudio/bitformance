import { useState } from 'react'
import { Link } from 'react-router-dom'
import BitLogoWhite from '../bitLogoWhite.png'
import BFIcon from './BFIcon'
import SocialIconsRow from './small/SocialIconsRow'

const secondaryColor = '#40C8B8'

export default function SidePanel({ setShowModalType }) {

	const [indexesExpanded, setIndexesExpanded] = useState(false)

	return (
		<div className="flex flex-col text-white bg-blue-800 p-4 w-64 h-screen">
			<div className="space-y-4">
				<img src={BitLogoWhite} alt="bitformance logo" />

				<Link to="/" className="flex flex-row items-center gap-2 cursor-pointer">
					<BFIcon iconName="home" color={secondaryColor} />
					<span>Home</span>
				</Link>
				<div className="flex flex-row items-center gap-2 cursor-pointer" onClick={() => setIndexesExpanded(!indexesExpanded)}>
					<BFIcon iconName="indexes" color={secondaryColor} />
					<span>Indexes</span>
				</div>
				{indexesExpanded && <>
					<div className="ml-2 cursor-pointer">
						<Link to="/indexes/browse">
							<BFIcon iconName="browse" color="white" />
							<span className="ml-2">Browse</span>
						</Link>
					</div>
					<div className="ml-2 flex flex-row gap-2 items-center cursor-pointer">
						<BFIcon iconName="my-indexes" color="white" />
						<span>My Indexes</span>
						<span className="ml-auto w-6 h-6 rounded-full bg-blue-900 text-sm flex items-center justify-center">18</span>
					</div>
					<div className="ml-2 flex flex-row items-center gap-2 cursor-pointer">
						<BFIcon iconName="favorite" color="white" />
						<span>My Favorites</span>
						<span className="ml-auto w-6 h-6 rounded-full bg-blue-900 text-sm flex items-center justify-center">2</span>
					</div>
				</>}
				<Link to="/compare" className="flex flex-row items-center gap-2 cursor-pointer">
					<BFIcon iconName="compare" color={secondaryColor} />
					<span>Compare</span>
				</Link>
				<button onClick={() => setShowModalType('CONTACT_US')} className="flex flex-row items-center gap-2">
					<BFIcon iconName="contact-us" color={secondaryColor} />
					<span>Contact Us</span>
				</button>
				<Link className="flex flex-row items-center gap-2 cursor-pointer">
					<BFIcon iconName="knowledge-base" color={secondaryColor} />
					<span>Knowledge Base</span>
				</Link>
				<br />
				<div className="rounded bg-blue-500 text-center px-4 py-2 w-full">
					<Link className="">+ Create Index</Link>
				</div>
			</div>

			<div className="mt-auto space-y-4">
				<div className="flex flex-row justify-between cursor-pointer">
					<SocialIconsRow showCopyLink={false} />
				</div>
				<div className="border-b border-gray-300 opacity-10" />
	

				<p className="text-gray-300 text-xs">© 2022 Bitformance Ltd. Trademarks and brands are the property of their respective owners</p>
				<p className="text-sm">
					<Link className="hover:text-gray-200">Privacy Policy</Link>
					<span>	•  </span>
					<Link className="hover:text-gray-200">Terms of Services</Link>
				</p>
			</div>

		</div>
	)
}