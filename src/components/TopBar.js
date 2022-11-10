export default function TopBar({ pathArray, isLoggedIn }) {

	const openCreateAccountModal = () => {

	}

	const openSignInModal = () => {
		
	}

	//TODO: switch state based on login
	return(
		<div className="flex flex-row w-full bg-white shadow p-2">
			<p>/URL path placeholder</p>
			<div className="ml-auto flex flex-row items-center gap-4">
				<p>Search bar</p>
				<button onClick={() => openCreateAccountModal()} className="text-sm rounded bg-red-100 font-bold text-red-700 w-32 py-2">Sign In</button>
				<button onClick={() => openSignInModal()} className="text-sm rounded bg-blue-500 font-bold text-white w-32 py-2">Sign Up</button>
			</div>
		</div>
	)
}