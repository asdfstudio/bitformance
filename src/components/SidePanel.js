import { Link } from 'react-router-dom'
import BitLogoWhite from '../bitLogoWhite.png'
import BFIcon from './BFIcon'
const secondaryColor = '#40C8B8'

export default function SidePanel({ setShowModalType }) {

	const expandIndexesSection = () => {
		//TODO:
	}

	return (
		<div className="flex flex-col text-white bg-blue-800 p-4 w-64 h-screen">
			<div className="space-y-4">
				<img src={BitLogoWhite} alt="bitformance logo" />

				<Link className="flex flex-row items-center gap-2">
					<BFIcon iconName="home" color={secondaryColor} />
					<span>Home</span>
				</Link>
				<div className="flex flex-row items-center gap-2" onClick={() => expandIndexesSection()}>
					<BFIcon iconName="indexes" color={secondaryColor} />
					<span>Indexes</span>
				</div>
				<Link className="flex flex-row items-center gap-2">
					<BFIcon iconName="compare" color={secondaryColor} />

					<span>Compare</span>
				</Link>
				<button onClick={() => setShowModalType('CONTACT_US')} className="flex flex-row items-center gap-2">
					<BFIcon iconName="contact-us" color={secondaryColor} />
					<span>Contact Us</span>
				</button>
				<Link className="flex flex-row items-center gap-2">
					<BFIcon iconName="knowledge-base" color={secondaryColor} />
					<span>Knowledge Base</span>
				</Link>
				<br />
				<div className="rounded bg-blue-500 text-center px-4 py-2 w-full">
					<Link className="">+ Create Index</Link>
				</div>
			</div>

			<div className="mt-auto space-y-4">
				<div className="flex flex-row justify-between	">
					<BFIcon iconName="facebook" size="lg" />
					<BFIcon iconName="twitter" size="lg" />
					<BFIcon iconName="telegram" size="lg" />
					<BFIcon iconName="discord" size="lg" />
				</div>

				<div className="border-b border-gray-300 opacity-10" />
	

				<p className="text-gray-300 text-xs">© 2022 Bitformance Ltd. Trademarks and brands are the property of their respective owners</p>
				<p className="text-sm">
					<Link>Privacy Policy</Link>
					<span>	•  </span>
					<Link>Terms of Services</Link>
				</p>
			</div>

		</div>
	)
}