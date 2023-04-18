import { useState } from 'react'
import BFTable from './small/BFTable'
import { COINS } from '../data/fakeData'
// import { useCryptosByMarketCap } from '../endpoints/index'
import { useCryptosByVolume } from '../endpoints/index'
import BFLoading from './small/BFLoading'
import { Link } from 'react-router-dom'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

export default function TwitterEnbeb() {
	const [isLoading, setLoading] = useState(false)

	const onLoad = () => {
		setLoading(true)
		{isLoading &&
			<div className="h-96 bg-white">
				<BFLoading heightAdjust="h-[45vh]" />
			</div>
		}
		setLoading(false)
	}
	return(
		<div>
			 <TwitterTimelineEmbed
				sourceType="profile"
				screenName="elonmusk"
				tweetLimit= '4'
				noScrollbar
				options={{height: 986}}
				onLoad={onLoad}
			/>
			
	    </div>
	)
}
