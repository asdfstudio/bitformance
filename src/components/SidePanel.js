import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
	faHouse, 
	faCodeCompare, 
	faEnvelope, 
	faBook,
	faChartLine,
} from '@fortawesome/free-solid-svg-icons'

import {
	faFacebook,
	faTwitter,
	faTelegram,
	faDiscord,
} from '@fortawesome/free-brands-svg-icons'

const secondaryColor = '#40C8B8'

export default function SidePanel() {

	const expandIndexesSection = () => {
		//TODO:
	}

	return (
		<div className="flex flex-col text-white bg-blue-800 p-4 w-64 h-screen">
			<div className="space-y-4">
				<span>TODO: get bitformance icon</span>
			
				<Link className="flex flex-row items-center gap-2">
					<FontAwesomeIcon icon={faHouse} color={secondaryColor} />
					<span>Home</span>
				</Link>
				<div className="flex flex-row items-center gap-2" onClick={() => expandIndexesSection()}>
					<FontAwesomeIcon icon={faChartLine} color={secondaryColor} />
					<span>Indexes</span>
				</div>
				<Link className="flex flex-row items-center gap-2">
					<FontAwesomeIcon icon={faCodeCompare} color={secondaryColor} />
					<span>Compare</span>
				</Link>
				<Link className="flex flex-row items-center gap-2">
					<FontAwesomeIcon icon={faEnvelope} color={secondaryColor} />
					<span>Contact Us</span>
				</Link>
				<Link className="flex flex-row items-center gap-2">
					<FontAwesomeIcon icon={faBook} color={secondaryColor} />
					<span>Knowledge Base</span>
				</Link>
				<br />
				<div className="rounded bg-blue-500 text-center px-4 py-2 w-full">
					<Link className="">+ Create Index</Link>
				</div>
			</div>

			<div className="mt-auto space-y-4">
				<div className="flex flex-row justify-between	">
					<FontAwesomeIcon icon={faFacebook} size="lg" />
					<FontAwesomeIcon icon={faTwitter} size="lg" />
					<FontAwesomeIcon icon={faTelegram} size="lg" />
					<FontAwesomeIcon icon={faDiscord} size="lg" />
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