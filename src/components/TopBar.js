import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function TopBar({ isLoggedIn, setShowModalType }) {

	let location = useLocation()
	const [pathArray, setPathArray] = useState([])

	useEffect(() => {
		console.log(location)
		if (location && location.pathname) {
			if (location.pathname === '/') {
				setPathArray(['Home'])
				return
			}
			const path = location.pathname.split('/').slice(1)

			setPathArray(path)
		}
	}, [location])

	function capitalizeFirstLetter(string) {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}

	//TODO: switch state based on login
	return(
		<div className="flex flex-row items-center w-full bg-white shadow p-2">
			<div className="ml-2 flex flex-row gap-2 items-center text-sm text-gray-500">
				{pathArray.map((crumb, index) => {
					if (pathArray.length === 1 || pathArray.length - 1 === index) {
						return <Link key={crumb}>{capitalizeFirstLetter(crumb) || 'Home'}</Link>
					} else {
						return (<><Link key={crumb}>{capitalizeFirstLetter(crumb) || 'Home'}</Link> <FontAwesomeIcon icon={faArrowRight} /></>)
					}
				})}
			</div>
			<div className="ml-auto flex flex-row items-center gap-4">
				<p>Search bar</p>
				<button onClick={() => setShowModalType('SIGN_IN')} className="text-sm rounded bg-red-100 font-bold text-red-700 w-32 py-2">Sign In</button>
				<button onClick={() => setShowModalType('SIGN_UP')} className="text-sm rounded bg-blue-500 font-bold text-white w-32 py-2">Sign Up</button>
			</div>
		</div>
	)
}