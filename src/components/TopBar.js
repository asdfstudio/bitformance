import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import BFSearchBar from './small/BFSearchBar'
import BFIcon from './BFIcon'

export default function TopBar({ isLoggedIn, showModalType, setShowModalType }) {

	let location = useLocation()
	const [pathArray, setPathArray] = useState([])
	const [searchText, setSearchText] = useState('')

	const [showMenu, setShowMenu] = useState(false)
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
	}, [showModalType])

	function capitalizeFirstLetter(string) {
		string = string.replace('-', ' ')
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}

	const logout = () => {
		localStorage.setItem('username', '')
		localStorage.setItem('firstName', '')
		localStorage.setItem('lastName', '')
		localStorage.setItem('picture', '')
		setUsername('')
		setFirstName('')
		setLastName('')
		setPicture('')
		setShowMenu(false)
	}

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
			{username && <div className="ml-auto relative">
				<div id="dropdownDefault" data-dropdown-toggle="dropdown" onClick={() => setShowMenu(!showMenu)} className="flex flex-row items-center gap-2">
					<div>
						<p className="text-sm">{firstName} {lastName}</p>
						<p className="text-xs text-gray-400 text-right">@{username}</p>
					</div>
					<div className="rounded-full bg-white shadow p-1">
						{picture ? <img src={picture} /> : <div className="w-6 h-6 flex justify-center items-center rounded-full bg-gray-100 p-2"><BFIcon iconName="no-picture" size="xs" /></div>}
					</div>
				</div>
				{showMenu &&
				<div id="dropdown" className="p-4 absolute right-2 top-12 z-10 w-56 bg-white rounded-lg divide-y divide-gray-100 shadow dark:bg-gray-700">
				    <ul className="space-y-2 py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
				      <li className="flex flex-row items-center gap-2">
				      	<BFIcon iconName="settings" size="lg" color="gray" />
				        <Link to="" className="font-bold block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings & Account</Link>
				      </li>
				      <li className="flex flex-row items-center gap-2">
				      	<BFIcon iconName="logout" size="lg" color="gray" />
				        <button onClick={() => logout()} className="font-bold block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout</button>
				      </li>
				     
				    </ul>
				</div>
				}

			</div>}
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