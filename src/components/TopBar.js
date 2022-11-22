import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import BFSearchBar from './small/BFSearchBar'
import BFIcon from './BFIcon'

export default function TopBar({ isLoggedIn, setShowModalType }) {

	let location = useLocation()
	const [pathArray, setPathArray] = useState([])
	const [searchText, setSearchText] = useState('')
	const [username, setUsername] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [picture, setPicture] = useState('')

	useEffect(() => {
		if (location && location.pathname) {
			if (location.pathname === '/') {
				setPathArray(['Home'])
				return
			}
			const path = location.pathname.split('/').slice(1)

			setPathArray(path)
		}
	}, [location])

	useEffect(() => {
		const username = localStorage.getItem('username')
		const firstName = localStorage.getItem('firstName')
		const lastName = localStorage.getItem('lastName')
		const picture = localStorage.getItem('picture')
		if (username) {
			setUsername(username)
			setFirstName(firstName)
			setLastName(lastName)
			setPicture(picture)
		}
	}, [setShowModalType])

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
			{username &&
				<div className="ml-auto flex flex-row items-center gap-2">
					<div>
						<p className="text-sm">{firstName} {lastName}</p>
						<p className="text-xs text-gray-400 text-right">@{username}</p>
					</div>
					<div className="rounded-full bg-white shadow p-1">
						{picture ? <img src={picture} /> : <div className="w-6 h-6 flex justify-center items-center rounded-full bg-gray-100 p-2"><BFIcon iconName="no-picture" size="xs" /></div>}
					</div>
				</div>
			}
			{!username && 
				<div className="ml-auto flex flex-row items-center gap-4">
					<BFSearchBar onChange={setSearchText} placeholder="Search Index..." />
					<button onClick={() => setShowModalType('SIGN_IN')} className="text-sm rounded bg-red-100 font-bold text-red-700 w-32 py-2">Sign In</button>
					<button onClick={() => setShowModalType('SIGN_UP')} className="text-sm rounded bg-blue-500 font-bold text-white w-32 py-2">Sign Up</button>
				</div>
			}
		</div>
	)
}