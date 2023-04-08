import RecentlyAdded from '../components/RecentlyAdded'
import PerformersCard from '../components/PerformersCard'
import MostPopularCard from '../components/MostPopularCard'
import GraphCard from '../components/GraphCard'
import TopMarketCap from '../components/TopMarketCapCryptos'
import { useTopFifty } from '../endpoints/index'

export default function HomePage() {

	return(
		<div className="p-0 bg-gray-100 space-y-4 relative sm:p-4">
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
				<RecentlyAdded />
				<PerformersCard />
				<MostPopularCard />
			</div>
			<GraphCard title="Top 50 Currency Indexes" hook={useTopFifty} />
			<div className="grid grid-cols-3 xl:grid-cols-4">
				<div className="bg-white col-span-3 rounded-2xl">
					<TopMarketCap />
				</div>
			</div>
		</div>
	)
}