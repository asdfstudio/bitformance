import RecentlyAdded from '../components/RecentlyAdded'
import PerformersCard from '../components/PerformersCard'
import MostPopularCard from '../components/MostPopularCard'
import GraphCard from '../components/GraphCard'
import TopMarketCap from '../components/TopMarketCapCryptos'
import { useTopFifty } from '../endpoints/index'
import FooterMobile from '../components/small/FooterMobile'
import FacebookTimelineEmbed from '../components/social/FacebookTimeline'
import TwitterEmbed from '../components/social/TwitterEnbeb'
import InstagramTimeline from '../components/social/InstagramTimeline'

export default function HomePage() {

	return(
		<div className="p-0 bg-main-lightGray space-y-4 relative sm:p-4">
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pt-4">
				<RecentlyAdded />
				<PerformersCard />
				<MostPopularCard />
			</div>
			<GraphCard title="Top 50 Currency Indexes" hook={useTopFifty} />
			<div className="grid grid-cols-3 gap-4 xl:grid-cols-4">
				<div className="bg-main-white col-start-1 col-span-3 border border-main-inputBorder sm:rounded-2xl">
					<TopMarketCap />
				</div>
				<div className="bg-main-white rounded-2xl col-start-1 col-span-3 xl:col-start-4">
					<TwitterEmbed />
					<div className='flex flex-col sm:flex-row xl:flex-col'>
						<FacebookTimelineEmbed />
						<InstagramTimeline />
					</div>
				</div>
			</div>
			<div className='bg-white md:hidden'>
				<FooterMobile />
			</div>
		</div>
	)
}