import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import BFSearchBar from './small/BFSearchBar'

export default function TopBar({ isLoggedIn, setShowModalType }) {

	let location = useLocation()
	const [pathArray, setPathArray] = useState([])
	const [searchText, setSearchText] = useState('')

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
		string = string.replace('-', ' ')
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}

	//TODO: switch state based on login
	return(
		<div className="flex flex-row items-center w-full bg-white shadow p-2">
			<div className="ml-2 flex flex-row gap-2 items-center text-sm text-gray-500">
				{pathArray.map((crumb, index) => {
					let to = `/${pathArray.slice(0, index + 1).join('/')}`
					if (to === '/indexes') {
						to = '/'
					}

					if (pathArray.length === 1 || pathArray.length - 1 === index) {
						return <Link to={to} key={crumb}>{capitalizeFirstLetter(crumb) || 'Home'}</Link>
					} else {
						return (<Link to={to} key={crumb}>{capitalizeFirstLetter(crumb) || 'Home'} &nbsp;<FontAwesomeIcon icon={faArrowRight} /></Link>)
					}
				})}
			</div>
			<div className="ml-auto flex flex-row items-center gap-4">
				<BFSearchBar onChange={setSearchText} placeholder="Search Index..." />
				<button onClick={() => setShowModalType('SIGN_IN')} className="text-sm rounded bg-red-100 font-bold text-red-700 w-32 py-2">Sign In</button>
				<button onClick={() => setShowModalType('SIGN_UP')} className="text-sm rounded bg-blue-500 font-bold text-white w-32 py-2">Sign Up</button>
			</div>
		</div>
	)
}