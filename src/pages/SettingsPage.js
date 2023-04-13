import { useState, useEffect } from 'react'
import BFIcon from '../components/BFIcon'
import BFUploadImage from '../components/small/BFUploadImage'
import { useProfile, updateProfile, uploadImage } from '../endpoints/index'
import BFLoading from '../components/small/BFLoading'
import { Link } from 'react-router-dom'

export default function SettingsPage({ setShowModalType }) {

	const { data, isLoading } = useProfile()
	
	const [tabSelected, setTabSelected] = useState('profile')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmNewPassword, setConfirmNewPassword] = useState('')
	const [profilePic, setProfilePic] = useState(data?.data?.profile_pic)
	const [fileSelected, setFileSelected] = useState(null)

	const [errorMessage, setErrorMessage] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setShowModalType('CONFIRM_PASSWORD')
	}, [])

	useEffect(() => {
		setEmail(data?.data?.email || '')
		setName(`${data?.data?.first_name || ''} ${data?.data?.last_name || ''}`)
	}, [data])

	useEffect(() => {
		if (tabSelected === 'profile') {
			setNewPassword('')
			setConfirmNewPassword('')
		}
	}, [tabSelected])

	const saveProfile = async () => {
		setErrorMessage('')
		setLoading(true)
		const names = name.split(' ')
		const first_name = names[0]
		const last_name = names.slice(-1)[0]
		if (newPassword && confirmNewPassword) {
			const result = await updateProfile({
				new_password: newPassword,
				confirm_password: confirmNewPassword,
				password: sessionStorage.getItem('password')
			})
			if (!result.result) {
				setErrorMessage(result.error)
			}

		} else {
			const result = await updateProfile({
				first_name,
				last_name,
				password: sessionStorage.getItem('password')
			})
			if (!result.result) {
				setErrorMessage(result.error)
			} else {
				localStorage.setItem('firstName', result.user.first_name)
				localStorage.setItem('lastName', result.user.last_name)
				window.location.reload()
			}
		}

		if (fileSelected) {
			const result = await uploadImage(fileSelected, 'image')
			localStorage.setItem('picture', result.url)
			window.location.reload()
		}
		setLoading(false)
	}

	const handleFileSelect = async (e) => {
		const file = e.target?.files[0]
		setFileSelected(file)
	}

	const selected = 'rounded-lg bg-main-gColor bg-opacity-10 w-full py-1 pl-2 cursor-pointer'
	const notSelected = 'rounded-lg w-full py-1.5 pl-2 cursor-pointer'

	return(
		<div className="bg-main-lightGray h-screen p-4">
			<div className="bg-white rounded-lg shadow mx-auto max-w-[740px]">
				<div className="flex flex-col md:flex-row">
					<div className="w-full text-[15px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black md:w-[280px] space-y-4 p-4 md:border-r">
						<p onClick={() => setTabSelected('profile')} className={tabSelected === 'profile' ? selected : notSelected}>
						&nbsp;
							<BFIcon iconName="profile" color="#5390F4" />
							&nbsp;&nbsp;&nbsp;Profile
						</p>
						<p onClick={() => setTabSelected('account')} className={tabSelected === 'account' ? selected: notSelected}>
						&nbsp;
							<BFIcon iconName="account" color="#5390F4" /> 
							&nbsp;&nbsp;&nbsp;Account
						</p>
					</div>
					{ tabSelected === 'profile' && 
							<div className="py-4 px-4 w-full space-y-4">
								{errorMessage && <p className="text-xs text-red-500">*{errorMessage}</p>}
								<div>
									<h1 className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black mb-2">Profile Picture</h1>
									<BFUploadImage handleFileSelect={handleFileSelect} fileSelected={fileSelected} src={profilePic} />
								</div>
								<div>
									<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">User Name</label>
									<input name="username" className="mt-2 text-sm w-full px-2 py-1.5 border rounded-md bg-main-inputBackground" disabled value={data?.data?.username} />
								</div>
								<div>
									<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Your Name</label>
									<input name="full-name" className="mt-2 text-sm w-full px-2 py-1.5 border rounded-md  mb-4" onChange={(e) => setName(e.target?.value)} value={name} />
								</div>
							</div>
					}

					{ tabSelected !== 'profile' && 
					  	<div className="w-full">
					  		{errorMessage && <p className="px-4 pt-2 text-xs text-red-500">*{errorMessage}</p>}
								<h2 className="px-4 pt-4 text-[16px] font-DM_Sans font-normal leading-normal tracking-normal text-main-gray opacity-60">Password</h2>
								<div className="px-4 py-2">
									<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">New Password</label>
									<input onChange={(e) => setNewPassword(e.target?.value)} value={newPassword} name="new-password" className="w-full px-2 py-1.5 mt-2 text-sm border rounded-md bg-main-inputBackground" type="password" />
								</div>
								<div className="px-4 py-2 pb-5">
									<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Confirm New Password</label>
									<input onChange={(e) => setConfirmNewPassword(e.target?.value)} value={confirmNewPassword} name="confirm-new-password" className="w-full px-2 py-1.5 mt-2 text-sm border rounded-md bg-main-inputBackground" type="password" />
								</div>
								<hr />
								<h2 className="px-4 pt-5 text-[16px] font-DM_Sans font-normal leading-normal tracking-normal text-main-gray opacity-60">Email</h2>
								<div className="px-4 py-2 pb-4">
									<label className="text-[16px] font-DM_Sans font-medium leading-normal tracking-normal text-main-black">Login Email</label>
									<input disabled onChange={(e) => setEmail(e.target?.value)} value={email} name="login-email" className="w-full px-2 py-1.5 mt-2 text-sm border rounded-md bg-main-inputBackground" type="text" />
								</div>
							</div>
					} 
				
				</div>
				<div className="p-2 border-t text-right fle flex-col pb-3 pt-3">
				<Link to="/">
				<button className="px-12 mr-4 rounded-lg bg-main-gColor bg-opacity-10 text-[15px] font-DM_Sans font-bold leading-normal tracking-normal text-main-gColor py-1">Cancel</button>
				</Link>					
					<button className="px-12 rounded-lg bg-main-gColor text-[15px] font-DM_Sans font-bold leading-normal tracking-normal text-white py-1 shadow-sm shadow-main-shadowBlue" onClick={() => saveProfile()}>{loading ? <BFLoading isCenter={true} /> : 'Save'}</button>
				</div>
			</div>
		</div>
	)
}