import RecentlyAdded from '../components/RecentlyAdded'
import GraphCard from '../components/GraphCard'
import TopMarketCap from '../components/TopMarketCapCryptos'
import { useTopFifty } from '../endpoints/index'

export default function HomePage() {

	return(
		<div className="p-4 bg-gray-100 space-y-4">
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
				<RecentlyAdded />
				<RecentlyAdded />
				<RecentlyAdded />
			</div>
			<GraphCard title="Top 50 Currency Indexes" hook={useTopFifty} />
			<div className="grid grid-cols-3 xl:grid-cols-4">
				<div className="bg-white col-span-3">
					<TopMarketCap />
				</div>
			</div>
		</div>
	)
}