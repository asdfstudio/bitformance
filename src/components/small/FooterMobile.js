import { Link } from 'react-router-dom'
import SocialIconsRows from './SocialIconsRow'

export default function FooterMobile() {

	return(
			<div className="mt-auto space-y-4 p-7">
				<div className="flex flex-row justify-around cursor-pointer">
					<SocialIconsRows showCopyLink={false} />
				</div>
				<div className='border'/>
				<p className="text-black text-center opacity-40 font-DM_Sans font-normal text-[13px] leading-normal tracking-wide">© 2022 Bitformance Ltd. Trademarks and brands are the property of their respective owners.</p>
				<p className="text-center text-black text-[14px] font-DM_Sans font-normal leading-normal tracking-wide">
					<Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
					<span>	•  </span>
					<Link to="/terms-of-services" className="hover:text-white">Terms of Services</Link>
				</p>
			</div>
	)
}
