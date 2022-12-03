import { useState } from 'react'
import { Link } from 'react-router-dom'
import BitLogoWhite from '../bitLogoWhite.png'
import BFIcon from './BFIcon'
import SocialIconsRow from './small/SocialIconsRow'
import SiteLinks from './small/SiteLinks'

const secondaryColor = '#40C8B8'

export default function SidePanel({ setShowModalType }) {

	const [indexesExpanded, setIndexesExpanded] = useState(false)

	return (
		<div className="flex flex-col text-white bg-blue-800 p-4 w-64 h-screen hidden md:flex">
			<div className="space-y-4">
				<img src={BitLogoWhite} alt="bitformance logo" />
				<SiteLinks setShowModalType={setShowModalType} />
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