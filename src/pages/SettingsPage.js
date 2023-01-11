import { useState, useEffect } from 'react'
import BFIcon from '../components/BFIcon'
import BFUploadImage from '../components/small/BFUploadImage'
import { useProfile, updateProfile } from '../endpoints/index'

export default function SettingsPage() {

	const { data, isLoading } = useProfile()
	
	const [tabSelected, setTabSelected] = useState('profile')
	const [name, setName] = useState('')
	const [profilePic, setProfilePic] = useState(data?.data?.profile_pic)
	const [fileSelected, setFileSelected] = useState(null)

	useEffect(() => {
		setName(`${data?.data?.first_name || ''} ${data?.data?.last_name || ''}`)
	}, [data])

	const saveProfile = async () => {
		const result = await updateProfile({
			...data.data,
			first_name: 'Test',
			last_name: 'New',
			profile_pic: ''
		})
		console.log(result)
	}

	const handleFileSelect = async (e) => {
		const file = e.target?.files[0]
		setFileSelected(file)
	}

	console.log(data)


	const selected = 'rounded-lg bg-blue-100 w-full py-2 pl-2 cursor-pointer'
	const notSelected = 'rounded-lg hover:bg-blue-100 w-full py-2 pl-2 cursor-pointer'

	return(
		<div className="bg-gray-100 h-screen p-4">
			<div className="bg-white rounded-md shadow mx-auto max-w-[740px]">
				<div className="flex flex-col md:flex-row">
					<div className="w-full md:w-56 space-y-4 p-4 border-b md:border-r">
						<p onClick={() => setTabSelected('profile')} className={tabSelected === 'profile' ? selected : notSelected}>
							<BFIcon iconName="profile" color="#5390F4" />
							&nbsp;&nbsp;Profile
						</p>
						<p onClick={() => setTabSelected('account')} className={tabSelected === 'account' ? selected: notSelected}>
							<BFIcon iconName="account" color="#5390F4" /> 
							&nbsp;&nbsp;Account
						</p>
					</div>
					{ tabSelected === 'profile' && 
							<div className="py-4 px-4 w-full space-y-4">
								<div>
									<h1 className="font-bold mb-2">Profile Picture</h1>
									<BFUploadImage handleFileSelect={handleFileSelect} fileSelected={fileSelected} src={profilePic} />
								</div>
								<div>
									<label className="text-sm font-bold ">User Name</label>
									<input name="username" className="mt-1 text-sm w-full px-2 py-1.5 border rounded" disabled value={data?.data?.username} />
								</div>
								<div>
									<label className="text-sm font-bold">Your Name</label>
									<input name="full-name" className="mt-1 text-sm w-full px-2 py-1.5 border rounded" onChange={(e) => setName(e.target?.value)} value={name} />
								</div>
							</div>
					}

					{ tabSelected !== 'profile' && 
					  	<div className="w-full">
								<h2 className="px-4 pt-4 text-sm text-gray-400">Password</h2>
								<div className="px-4 py-2">
									<label className="font-bold text-sm">Current Password</label>
									<input name="current-password" className="w-full py-1 border rounded" type="password" />
								</div>
								<div className="px-4 py-2">
									<label className="font-bold text-sm">New Password</label>
									<input name="new-password" className="w-full py-1 border rounded" type="password" />
								</div>
								<div className="px-4 py-2 pb-4">
									<label className="font-bold text-sm">Confirm New Password</label>
									<input name="confirm-new-password" className="w-full py-1 border rounded" type="password" />
								</div>
								<hr />
								<h2 className="px-4 pt-4 text-sm text-gray-400">Email</h2>
								<div className="px-4 py-2 pb-4">
									<label className="font-bold text-sm">Login Email</label>
									<input name="login-email" className="w-full py-1 border rounded" type="text" />
								</div>
							</div>
					} 
				
				</div>
				<div className="p-2 border-t text-right">
{/*					<button className="w-full text-sm rounded bg-blue-50 hover:bg-blue-200 font-bold text-blue-500 py-2" onClick={() => setShowModalType('SIGN_UP')}>Cancel</button>
*/}					<button className="px-8 text-sm rounded bg-blue-50 hover:bg-blue-200 font-bold text-blue-500 py-2" onClick={() => saveProfile()}>Save</button>

				</div>
			</div>
		</div>
	)
}