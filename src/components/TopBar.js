import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import BFSearchBar from './small/BFSearchBar'
import BFIcon from './BFIcon'
import bitLogoWhite from '../bitLogoWhite.png'
import SiteLinks from './small/SiteLinks'
import { useSWRConfig } from 'swr'
import { searchForIndex } from '../endpoints/index'

export default function TopBar({ isLoggedIn, showModalType, setShowModalType }) {

	let location = useLocation()
	const { mutate } = useSWRConfig()
	const [pathArray, setPathArray] = useState([])

	const [searchText, setSearchText] = useState('')
	const [timer, setTimer] = useState(null)
	const [foundIndexes, setFoundIndexes]= useState(null)

	const [showMenu, setShowMenu] = useState(false)
	const [username, setUsername] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [picture, setPicture] = useState('')
	const [showMobileMenu, setShowMobileMenu] = useState(false)

	const load = () => {
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
	}

	useEffect(() => {
		load()
	}, [])

	useEffect(() => {
		if (location && location.pathname) {
			if (location.pathname === '/') {
				setPathArray(['Home'])
				return
			}
			if (location.pathname === '/terms-of-services') {
				setPathArray(['Terms of Services'])
				return
			}

			const path = location.pathname.split('/').slice(1)
			setPathArray(path)
		}
	}, [location])

	useEffect(() => {
		load()
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
		localStorage.setItem('accessToken', '')
		localStorage.setItem('userId', '')
		setUsername('')
		setFirstName('')
		setLastName('')
		setPicture('')
		setShowMenu(false)
		mutate(`${process.env.REACT_APP_API_URL}/get-user-indexes`)
		mutate(`${process.env.REACT_APP_API_URL}/get-favorited-indexes`)
	}

	useEffect(() => {
		if (timer) {
			clearTimeout(timer)
		}
		const newTimer = setTimeout(async () => {
			const data = await searchForIndex(searchText)
			setFoundIndexes(data.data)
		}, 750)
		setTimer(newTimer)
	}, [searchText])

	return(<>
		<div className="flex flex-row items-center w-full bg-gradient-to-l from-main-gradientColor2 to-main-gradientColor1 md:bg-white shadow p-2 py-3">
			
			<div className="flex items-center md:hidden w-full">
				<Link to="/"><img src={bitLogoWhite} className="ml-1 w-44" alt="bitformance logo" /></Link>
				<div className="ml-auto mr-6 space-x-4 cursor-pointer">
					{/* <BFIcon iconName="search" color="white" /> */}
					<span onClick={() => setShowMobileMenu(!showMobileMenu)}>
						{!showMobileMenu ? <BFIcon iconName="menu" color="white" /> : <BFIcon iconName="close" color="white" />}
					</span>
				</div>
			</div>
			{showMobileMenu &&
				<div id="dropdown" className="p-4 px-[20px] absolute left-0 top-12 z-10 w-full rounded-b-xl -mt-1 bg-gradient-to-b from-main-gradientColor2 to-main-gradientColor1 divide-y divide-gray-100 shadow">
				    <ul className="space-y-4 py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
				     	<SiteLinks setShowMobileMenu={setShowMobileMenu} setShowModalType={setShowModalType} colorStyle="text-white font-DM_Sans text-[15px] font-normal leading-normal tracking-wide"/>
				    </ul>
				</div>
			}
			{!username && <div className="ml-auto md:hidden relative cursor-pointer">
				<div id="dropdownDefault" data-dropdown-toggle="dropdown" onClick={() => setShowMenu(!showMenu)} className="flex flex-row items-center gap-2">
					<div className="hidden md:block">
						<p className="text-sm">{localStorage.getItem('firstName')} {localStorage.getItem('lastName')}</p>
						<p className="text-xs text-gray-400 text-right">@{username}</p>
					</div>
					<div className="rounded-full bg-white shadow p-1">
						{picture ? <img className="w-6 h-6 rounded-full" src={localStorage.getItem('picture')} /> : <div className="w-6 h-6 flex justify-center items-center rounded-full bg-gray-100 p-2"><BFIcon iconName="no-picture" size="xs" /></div>}
					</div>
				</div>
				{showMenu &&
				<div id="dropdown" className="p-4 absolute right-2 top-12 z-10 w-56 bg-white rounded-lg divide-y divide-gray-100 shadow">
				    <ul className="space-y-2 py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
				      <li className="flex flex-row items-center gap-2">
				      	<button onClick={() => { setShowModalType('SIGN_IN'); setShowMenu(false);}} className="text-sm rounded-lg bg-red-100 text-main-red w-full py-2 text-cente font-DM_Sans font-medium leading-normal tracking-wide whitespace-nowrap">Sign In</button>
				      </li>
				      <li className="flex flex-row items-center gap-2">
				      	<button onClick={() => { setShowModalType('SIGN_UP'); setShowMenu(false); }} className="text-sm text-white w-full py-2 rounded-lg bg-main-buttonBlue text-cente font-DM_Sans font-medium leading-normal tracking-wide shadow-sm shadow-main-buttonBlue whitespace-nowrap">Sign Up</button>
				      </li>
				    </ul>
				</div>
				}
			</div>}

			<div className="ml-2 hidden md:flex flex-row gap-2 items-center text-main-gray text-[16px] text-cente font-DM_Sans font-bold leading-normal tracking-normal">
				{pathArray.map((crumb, index) => {
					let to = `/${pathArray.slice(0, index + 1).join('/')}`
					if (to === '/indexes') {
						to = '/'
					} else if (to === '/settings') {
						crumb = 'Settings & Account'
					}

					if (pathArray.length === 1 || pathArray.length - 1 === index) {
						return <Link to={to} key={crumb}>{capitalizeFirstLetter(crumb) || 'Home'}</Link>
					} else {
						return (<Link to={to} key={crumb}>{capitalizeFirstLetter(crumb) || 'Home'} &nbsp;<FontAwesomeIcon icon={faArrowRight} /></Link>)
					}
				})}
			</div>
			{username && <div className="ml-auto relative cursor-pointer">
				<div id="dropdownDefault" data-dropdown-toggle="dropdown" onClick={() => setShowMenu(!showMenu)} className="flex flex-row items-center gap-2">
					<div className="hidden md:block">
						<p className="text-sm">{firstName} {lastName}</p>
						<p className="text-xs text-gray-400 text-right">@{username}</p>
					</div>
					<div className="rounded-full bg-white shadow p-1">
						{picture ? <img className="w-6 h-6 rounded-full" src={picture} /> : <div className="w-6 h-6 flex justify-center items-center rounded-full bg-gray-100 p-2"><BFIcon iconName="no-picture" size="xs" /></div>}
					</div>
				</div>
				{showMenu &&
				<div id="dropdown" className="p-4 absolute right-2 top-12 z-10 w-56 bg-white rounded-lg divide-y divide-gray-100 shadow">
				    <ul className="space-y-2 py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
				      <li className="flex flex-row items-center gap-2">
				      	<BFIcon iconName="settings" size="lg" color="gray" />
				        <Link to="/settings" onClick={() => setShowMenu(false)} className="block py-2 px-4 text-main-black text-[16px] text-cente font-DM_Sans font-bold leading-normal tracking-normal bg-white whitespace-nowrap">Settings & Account</Link>
				      </li>
				      <li className="flex flex-row items-center gap-2">
				      	<BFIcon iconName="logout" size="lg" color="gray" />
				        <button onClick={() => logout()} className="block py-2 px-4 text-main-black text-[16px] text-cente font-DM_Sans font-bold leading-normal tracking-normal bg-white whitespace-nowrap">Logout</button>
				      </li>
				     
				    </ul>
				</div>
				}
			</div>}
			{!username && 
				<div className="hidden md:flex ml-auto flex-row items-center gap-4">
					{/* <BFSearchBar onChange={setSearchText} placeholder="Search Index..." /> */}
					<button onClick={() => setShowModalType('SIGN_IN')} className="text-[15px] bg-red-100 w-32 py-2 rounded-lg text-main-red text-cente font-DM_Sans font-medium leading-normal tracking-normal whitespace-nowrap">Sign In</button>
					<button onClick={() => setShowModalType('SIGN_UP')} className="text-[15px] w-32 py-2 text-white rounded-lg bg-main-buttonBlue text-cente font-DM_Sans font-medium leading-normal tracking-normal shadow-sm shadow-main-buttonBlue whitespace-nowrap">Sign Up</button>
				</div>
			}
		</div>
	</>)
}