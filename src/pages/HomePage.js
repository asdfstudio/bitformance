import RecentlyAdded from '../components/RecentlyAdded'
import TopFive from '../components/TopFiveCryptos'
import TopMarketCap from '../components/TopMarketCapCryptos'

export default function HomePage() {
	return(
		<div className="p-4 bg-gray-100 space-y-4">
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
				<RecentlyAdded />
				<RecentlyAdded />
				<RecentlyAdded />
			</div>
			<TopFive />
			<div className="grid grid-cols-2 xl:grid-cols-3">
				<div className="bg-white col-span-2">
					<TopMarketCap />
				</div>
			</div>
		</div>
	)
}