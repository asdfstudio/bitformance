import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function TopBar({ isLoggedIn }) {

	let location = useLocation()
	const [pathArray, setPathArray] = useState([])

	useEffect(() => {
		console.log(location)
		if (location && location.pathname) {
			if (location.pathname === '/') {
				setPathArray(['Home'])
				return
			}
			const path = location.pathname.split('/')
			setPathArray(path)
		}
	}, [location])


	const openCreateAccountModal = () => {

	}

	const openSignInModal = () => {

	}

	//TODO: switch state based on login
	return(
		<div className="flex flex-row items-center w-full bg-white shadow p-2">
			<div className="ml-2">
				{pathArray.map((crumb, index) => {
					if (pathArray.length === 1 || pathArray.length === index) {
						return <Link key={crumb}>{crumb || 'Home'}</Link>
					} else {
						return (<><Link key={crumb}>{crumb || 'Home'}</Link> <FontAwesomeIcon icon={faArrowRight} /></>)
					}
				})}
			</div>
			<div className="ml-auto flex flex-row items-center gap-4">
				<p>Search bar</p>
				<button onClick={() => openCreateAccountModal()} className="text-sm rounded bg-red-100 font-bold text-red-700 w-32 py-2">Sign In</button>
				<button onClick={() => openSignInModal()} className="text-sm rounded bg-blue-500 font-bold text-white w-32 py-2">Sign Up</button>
			</div>
		</div>
	)
}