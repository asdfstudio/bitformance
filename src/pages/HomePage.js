import RecentlyAdded from '../components/RecentlyAdded'
import PerformersCard from '../components/PerformersCard'
import MostPopularCard from '../components/MostPopularCard'
import GraphCard from '../components/GraphCard'
import TopMarketCap from '../components/TopMarketCapCryptos'
import TwitterEnbeb from '../components/TwitterEnbeb'
import { useTopFifty } from '../endpoints/index'

export default function HomePage() {

	return(
		<div className="p-0 bg-main-lightGray space-y-4 relative sm:p-4">
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pt-2">
				<RecentlyAdded />
				<PerformersCard />
				<MostPopularCard />
			</div>
			<GraphCard title="Top 50 Currency Indexes" hook={useTopFifty} />
			<div className="grid grid-cols-3 gap-4 xl:grid-cols-4">
				<div className="bg-main-white col-start-1 col-span-3 rounded-2xl border border-main-inputBorder">
					<TopMarketCap />
				</div>
				<div className="bg-main-white rounded-2xl col-start-1 col-span-3 xl:col-start-4">
					<TwitterEnbeb />
				</div>
			</div>
		</div>
	)
}