import SidePanel from '../components/SidePanel'

export default function HomePage() {
	return(
		<div className="flex flex-row">
			<SidePanel />
			<div>
				main view
			</div>
		</div>
	)
}