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
		// <div className="bg-gradient-to-r from-main-gColor to-main-gColor">
          <div className="bg-gradient-to-b from-main-deepBlue to-main-deepestBlue flex-col text-white p-4 w-64 h-screen hidden md:flex">
			<div className="space-y-4">
				<img src={BitLogoWhite} alt="bitformance logo" />
				<SiteLinks setShowModalType={setShowModalType} colorStyle="text-white font-DM_Sans text-[15px] font-normal leading-normal tracking-wide pl-2"/>
			</div>

			<div className="mt-auto space-y-4">
				<div className="flex flex-row justify-between cursor-pointer">
					<SocialIconsRow showCopyLink={false} />
				</div>
				<div className="border-b border-gray-300 opacity-10" />
				<p className="text-white opacity-40 font-DM_Sans font-normal text-[13px] leading-normal tracking-wide">© 2022 Bitformance Ltd. Trademarks and brands are the property of their respective owners.</p>
				<p className="text-sm text-[14px] font-DM_Sans font-normal">
					<Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
					<span>	•  </span>
					<Link to="/terms-of-services" className="hover:text-white">Terms of Services</Link>
				</p>
			</div>
			</div>
		// </div>
	)
}